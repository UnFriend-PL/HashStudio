export const validateEnvVariables = () => {
    const requiredVars = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'ALLOWED_ORIGIN'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

export const validateOrigin = (req) => {
    const origin = req.headers.get('origin')?.replace(/\/$/, '');
    const allowedOrigin = process.env.ALLOWED_ORIGIN?.replace(/\/$/, '');
    
    console.log('Request origin:', origin);
    console.log('Allowed origin:', allowedOrigin);
    
    if (!origin || origin !== allowedOrigin) {
        throw new Error('Unauthorized origin');
    }
};

export const validateInput = (data) => {
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