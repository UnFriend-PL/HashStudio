/**
 * Generates a prompt for the AI based on user input and available services
 * @param {string} userInput - The user's message
 * @param {Array} servicesDescription - Array of service categories and packages
 * @param {string} language - The user's language code
 * @param {Array} conversationHistory - Array of previous messages
 * @param {Array} selectedServices - Array of previously selected services
 * @returns {string} The formatted prompt for the AI
 */
export const generatePrompt = (userInput, servicesDescription, language, conversationHistory = [], selectedServices = []) => {
    // Format conversation history
    const formattedHistory = conversationHistory
        .filter(msg => msg.type === 'user' || msg.type === 'ai')
        .map(msg => {
            if (msg.type === 'user') {
                return `User: ${msg.content}`;
            } else {
                // Extract only the explanation part from AI responses (before "Selected packages:")
                const content = msg.content.replace(/<[^>]*>/g, ''); // Remove HTML tags
                const parts = content.split('Selected packages:');
                return `AI: ${parts[0].trim()}`;
            }
        })
        .join('\n');

    // Format previously selected services
    const formattedSelectedServices = selectedServices.length > 0
        ? `Previously selected services:\n${selectedServices.map(service => 
            `- ${service.category} - ${service.packageName}`
        ).join('\n')}`
        : '';

    return `You are an assistant helping users choose the best service packages for their needs.
Based on the user's message, conversation history, and the available categories and packages, recommend the best matching package(s) by name and category.
Always consider the full context of the conversation and previously selected services.
Briefly explain your choice in 2-3 sentences.
At the end, always list ALL selected packages (both previous and new) in the format: Selected packages: [category name] - [package name], [category name] - [package name], ...
Do not list package features. Do not repeat these instructions. Respond in the user's language (${language}). Use Markdown.

Example:
User: I want a modern logo for a construction company.
AI: For a modern logo for a construction company, I recommend the "Grafika Komputerowa - Basic" package. It offers professional logo design at an affordable price, perfect for your needs.
Selected packages: Grafika Komputerowa - Basic

Available services:
${JSON.stringify(servicesDescription, null, 2)}

${formattedSelectedServices ? formattedSelectedServices + '\n\n' : ''}${formattedHistory ? 'Conversation history:\n' + formattedHistory + '\n\n' : ''}User's message: ${userInput}`;
};

/**
 * Extracts selected services from the AI response
 * @param {string} text - The AI's response text
 * @param {Object} offerData - The offer data containing categories and packages
 * @returns {Array} Array of selected services with their details
 */
export const extractSelectedServices = (text, offerData) => {
    const selectedMatch = text.match(/Selected packages?:\s*([^\n\r]*)/i);
    if (!selectedMatch || !selectedMatch[1]) return [];

    return selectedMatch[1]
        .split(',')
        .map(item => item.trim())
        .map(item => {
            const parts = item.split(' - ');
            if (parts.length === 2) {
                const categoryName = parts[0].trim();
                const packageName = parts[1].trim();
                // Compare case-insensitively and trimmed
                const category = offerData.categories.find(cat => 
                    cat.name.trim().toLowerCase() === categoryName.toLowerCase()
                );
                if (category) {
                    const pkg = category.packages.find(p => 
                        p.name.trim().toLowerCase() === packageName.toLowerCase()
                    );
                    if (pkg) {
                        return {
                            category: category.name,
                            packageName: pkg.name,
                            price: pkg.price
                        };
                    }
                }
            }
            return null;
        })
        .filter(Boolean);
};

/**
 * Formats the services description for the AI prompt
 * @param {Object} offerData - The offer data containing categories and packages
 * @returns {Array} Formatted services description
 */
export const formatServicesDescription = (offerData) => {
    return offerData.categories.map(category => ({
        name: category.name,
        packages: category.packages.map(pkg => ({
            name: pkg.name,
            price: pkg.price
        }))
    }));
}; 