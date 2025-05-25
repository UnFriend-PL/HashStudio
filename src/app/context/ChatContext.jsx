'use client';

import React, { createContext, useContext, useState } from 'react';

    const ChatContext = createContext();

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    const [selectedServices, setSelectedServices] = useState([]);

    const value = {
        selectedServices,
        setSelectedServices
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext; 