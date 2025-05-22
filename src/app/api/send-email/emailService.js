import nodemailer from 'nodemailer';
import { validateEnvVariables } from './validators';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 10; // Maximum requests per hour
const ipRequestCounts = new Map();

export const checkRateLimit = (req) => {
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

export const createTransporter = () => {
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

export const verifyTransporter = async (transporter) => {
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

export const sendEmail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return true;
    } catch (emailError) {
        console.error('Failed to send email:', {
            message: emailError.message,
            code: emailError.code,
            command: emailError.command,
            response: emailError.response
        });
        throw new Error('Failed to send email. Please try again later.');
    }
}; 