/**
 * Chat context manager to store and manage conversation history
 */
class ChatContextManager {
    constructor() {
        this.contexts = new Map();
    }

    /**
     * Get or create a context for a specific client
     * @param {string} clientId - Unique identifier for the client
     * @returns {Object} Chat context for the client
     */
    getContext(clientId) {
        if (!this.contexts.has(clientId)) {
            this.contexts.set(clientId, {
                messages: [],
                lastInteraction: Date.now(),
                selectedServices: []
            });
        }
        return this.contexts.get(clientId);
    }

    /**
     * Add a message to the client's context
     * @param {string} clientId - Client identifier
     * @param {Object} message - Message object with type and content
     */
    addMessage(clientId, message) {
        const context = this.getContext(clientId);
        context.messages.push(message);
        context.lastInteraction = Date.now();
    }

    /**
     * Get all messages for a client
     * @param {string} clientId - Client identifier
     * @returns {Array} Array of messages
     */
    getMessages(clientId) {
        return this.getContext(clientId).messages;
    }

    /**
     * Update selected services in the context
     * @param {string} clientId - Client identifier
     * @param {Array} services - Array of selected services
     */
    updateSelectedServices(clientId, services) {
        const context = this.getContext(clientId);
        context.selectedServices = services;
        context.lastInteraction = Date.now();
    }

    /**
     * Get selected services for a client
     * @param {string} clientId - Client identifier
     * @returns {Array} Array of selected services
     */
    getSelectedServices(clientId) {
        return this.getContext(clientId).selectedServices;
    }

    /**
     * Clear context for a client
     * @param {string} clientId - Client identifier
     */
    clearContext(clientId) {
        this.contexts.delete(clientId);
    }

    /**
     * Clean up old contexts (older than 24 hours)
     */
    cleanupOldContexts() {
        const now = Date.now();
        const oneDay = 2 * 60 * 60 * 1000;

        for (const [clientId, context] of this.contexts.entries()) {
            if (now - context.lastInteraction > oneDay) {
                this.contexts.delete(clientId);
            }
        }
    }
}

// Create a singleton instance
const chatContextManager = new ChatContextManager();

// Run cleanup every hour
setInterval(() => {
    chatContextManager.cleanupOldContexts();
}, 60 * 60 * 1000);

export default chatContextManager; 