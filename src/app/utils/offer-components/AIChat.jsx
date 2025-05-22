import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSend } from 'react-icons/bs';
import { marked } from 'marked';
import ChatMessage from './ChatMessage';
import { generatePrompt, extractSelectedServices, formatServicesDescription } from './chatUtils';
import chatContextManager from './chatContext';

const AIChat = ({ offerData, selectedServices, setSelectedServices }) => {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const clientIdRef = useRef(null);

    // Initialize client ID and load context on component mount
    useEffect(() => {
        // Generate a unique client ID if not exists
        if (!clientIdRef.current) {
            clientIdRef.current = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }

        // Load existing context
        const context = chatContextManager.getContext(clientIdRef.current);
        setMessages(context.messages);
        if (context.selectedServices.length > 0) {
            setSelectedServices(context.selectedServices);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            type: 'user',
            content: input,
            timestamp: Date.now()
        };

        // Add message to context and state
        chatContextManager.addMessage(clientIdRef.current, userMessage);
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const servicesDescription = formatServicesDescription(offerData);
            const context = chatContextManager.getContext(clientIdRef.current);
            const prompt = generatePrompt(
                input,
                servicesDescription,
                i18n.language,
                context.messages,
                context.selectedServices
            );

            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to get response from API');
            }

            const data = await response.json();
            const text = data.response;

            const newSelectedServices = extractSelectedServices(text, offerData);
            setSelectedServices(newSelectedServices);
            chatContextManager.updateSelectedServices(clientIdRef.current, newSelectedServices);

            const html = marked.parse(text);
            const aiMessage = {
                type: 'ai',
                content: html,
                timestamp: Date.now()
            };

            // Add AI message to context and state
            chatContextManager.addMessage(clientIdRef.current, aiMessage);
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                type: 'ai',
                content: t('offer.chat.error'),
                timestamp: Date.now()
            };
            chatContextManager.addMessage(clientIdRef.current, errorMessage);
            setMessages(prev => [...prev, errorMessage]);
        }

        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="AIChat">
            <div className="ChatHeader">
                <h3>{t('offer.chat.title')}</h3>
                <p>{t('offer.chat.subtitle')}</p>
            </div>

            <div className="MessagesContainer">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
                {isLoading && <ChatMessage isLoading={true} />}
                <div ref={messagesEndRef} />
            </div>

            <div className="InputContainer">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('offer.chat.placeholder')}
                    rows={1}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                >
                    <BsSend />
                </button>
            </div>
        </div>
    );
};

export default AIChat; 