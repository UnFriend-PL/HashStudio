import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Add environment variable validation
const validateEnvVariables = () => {
    const requiredVars = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'ALLOWED_ORIGIN'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 10; // Maximum requests per hour
const ipRequestCounts = new Map();

// Validate request origin
const validateOrigin = (req) => {
    const origin = req.headers.get('origin');
    const allowedOrigin = process.env.ALLOWED_ORIGIN;
    
    if (!origin || origin !== allowedOrigin) {
        throw new Error('Unauthorized origin');
    }
};

// Rate limiting middleware
const checkRateLimit = (req) => {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    // Clean up old entries
    for (const [key, value] of ipRequestCounts.entries()) {
        if (now - value.timestamp > RATE_LIMIT_WINDOW) {
            ipRequestCounts.delete(key);
        }
    }
    
    // Check rate limit
    const requestData = ipRequestCounts.get(ip) || { count: 0, timestamp: now };
    if (requestData.count >= MAX_REQUESTS_PER_WINDOW) {
        throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    // Update request count
    ipRequestCounts.set(ip, {
        count: requestData.count + 1,
        timestamp: requestData.timestamp
    });
};

// Validate input data
const validateInput = (data) => {
    const { name, email, phone, message, selectedServices } = data;
    
    // Required fields
    if (!name || !email || !selectedServices?.length) {
        throw new Error('Missing required fields');
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    
    // Phone format validation (if provided)
    if (phone) {
        const phoneRegex = /^\+?[\d\s-]{8,}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error('Invalid phone format');
        }
    }
    
    // Message length validation
    if (message && message.length > 1000) {
        throw new Error('Message is too long');
    }
    
    // Services validation
    if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
        throw new Error('Invalid services selection');
    }
    
    // Validate each service
    for (const service of selectedServices) {
        if (!service.category || !service.package || !service.price) {
            throw new Error('Invalid service data');
        }
    }
};

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
    validateEnvVariables();
    
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        },
        debug: true,
    });
};

// Verify transporter configuration
const verifyTransporter = async (transporter) => {
    try {
        await transporter.verify();
        console.log('SMTP connection is ready to take messages');
        return true;
    } catch (error) {
        console.error('SMTP connection error:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        return false;
    }
};

export async function POST(req) {
    try {
        // Validate origin
        validateOrigin(req);
        
        // Check rate limit
        checkRateLimit(req);
        
        // Create and verify transporter
        const transporter = createTransporter();
        const isValid = await verifyTransporter(transporter);
        
        if (!isValid) {
            throw new Error('Failed to establish SMTP connection. Please check your email configuration.');
        }

        const data = await req.json();
        
        // Validate input data
        validateInput(data);
        
        const { name, email, phone, message, selectedServices } = data;

        // Calculate total price
        const totalPrice = selectedServices.reduce((sum, service) => 
            sum + parseInt(service.price), 0
        );

        // Create HTML email content
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #16F4B9; border-bottom: 2px solid #16F4B9; padding-bottom: 10px;">
                    New Service Inquiry
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="margin-top: 0;">Client Information:</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                </div>

                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="margin-top: 0;">Selected Services:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background-color: #16F4B9; color: #111;">
                            <th style="padding: 10px; text-align: left;">Service</th>
                            <th style="padding: 10px; text-align: left;">Package</th>
                            <th style="padding: 10px; text-align: right;">Price</th>
                        </tr>
                        ${selectedServices.map(service => `
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px;">${service.category}</td>
                                <td style="padding: 10px;">${service.package}</td>
                                <td style="padding: 10px; text-align: right;">$${service.price}</td>
                            </tr>
                        `).join('')}
                        <tr style="background-color: #f2f2f2; font-weight: bold;">
                            <td style="padding: 10px;" colspan="2">Total</td>
                            <td style="padding: 10px; text-align: right;">$${totalPrice}</td>
                        </tr>
                    </table>
                </div>

                ${message ? `
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="margin-top: 0;">Additional Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                ` : ''}

                <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
                    <p>This is an automated email from your website's contact form.</p>
                </div>
            </div>
        `;

        // Send email
        const mailOptions = {
            from: `"HashStudio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
            replyTo: email,
            subject: `New Service Inquiry from ${name}`,
            html: htmlContent,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Failed to send email:', {
                message: emailError.message,
                code: emailError.code,
                command: emailError.command,
                response: emailError.response
            });
            throw new Error('Failed to send email. Please try again later.');
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Email sent successfully' 
        });
    } catch (error) {
        console.error('Error in email route:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error.message || 'Failed to send email'
            },
            { status: error.message.includes('Unauthorized') ? 403 : 500 }
        );
    }
} 