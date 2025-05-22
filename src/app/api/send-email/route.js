import { NextResponse } from 'next/server';
import { validateOrigin, validateInput } from './validators';
import { checkRateLimit, createTransporter, verifyTransporter, sendEmail } from './emailService';
import { generateEmailContent } from './emailTemplate';

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
    const origin = req.headers.get('origin')?.replace(/\/$/, '');
    const allowedOrigin = process.env.ALLOWED_ORIGIN?.replace(/\/$/, '');
    
    console.log('Request origin:', origin);
    console.log('Allowed origin:', allowedOrigin);
    
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

        // Generate email content
        const htmlContent = generateEmailContent({ name, email, phone, message, selectedServices });

        // Prepare mail options
        const mailOptions = {
            from: `"HashStudio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
            replyTo: email,
            subject: `New Service Inquiry from ${name}`,
            html: htmlContent,
        };

        // Send email
        await sendEmail(transporter, mailOptions);

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