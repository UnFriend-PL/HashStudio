import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiBardFill, GoPerson } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '@/app/context/ChatContext';
import ReactMarkdown from 'react-markdown';
import { generatePrompt, extractSelectedServices } from './chatUtils';
import { offerData } from '@/app/data/offerData';
import ChatMessage from './ChatMessage';

const AIChat = ({ isOpen, onClose, initialCategory }) => {
    const { t } = useTranslation();
    const language = t.i18n?.language || 'pl';
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const { selectedServices, setSelectedServices } = useChatContext();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            let welcomeMessage;
            if (initialCategory) {
                // Find the category name from offerData
                const categoryObj = offerData.categories.find(cat => cat.name === initialCategory || cat.key === initialCategory);
                const categoryName = categoryObj ? t(`offer.categories.${categoryObj.name}`) || categoryObj.name : initialCategory;
                welcomeMessage = t('offer.chat.categoryIntro', { category: categoryName });
            } else {
                welcomeMessage = t('offer.chat.welcome');
            }
            setMessages([{ role: 'assistant', content: welcomeMessage }]);
        }
    }, [isOpen, initialCategory, t]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        setError(null);
        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Build prompt using generatePrompt
            const prompt = generatePrompt(
                input,
                offerData.categories,
                language,
                updatedMessages,
                selectedServices
            );

            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);

            // Extract selected services from AI response
            const extracted = extractSelectedServices(data.content, offerData);
            console.log('AI response:', data.content);
            console.log('Extracted services:', extracted);
            console.log('OfferData categories:', offerData.categories.map(c => c.name));
            if (extracted.length > 0 && setSelectedServices) {
                setSelectedServices(extracted);
            }
        } catch (error) {
            setError(t('offer.chat.error'));
            setMessages(prev => [...prev, { role: 'assistant', content: t('offer.chat.error') }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="AIChatModal">
            <div className="AIChat">
                <div className="ChatHeader">
                    <button className="CloseButton" onClick={onClose}>
                        <IoClose />
                    </button>
                    <h3>{t('offer.chat.title')}</h3>
                    <p>{t('offer.chat.subtitle')}</p>
                </div>
                <div className="MessagesContainer">
                    {messages.map((message, index) => (
                        <ChatMessage 
                            key={index}
                            message={{
                                type: message.role === 'assistant' ? 'ai' : 'user',
                                content: message.role === 'assistant' ? message.content : message.content
                            }}
                        />
                    ))}
                    {isLoading && (
                        <ChatMessage 
                            message={{ type: 'ai', content: '' }}
                            isLoading={true}
                        />
                    )}
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
                    <button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                        ➤
                    </button>
                </div>
                {error && (
                    <div style={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>{error}</div>
                )}
            </div>
        </div>
    );
};

export default AIChat; 