import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSend, BsRobot, BsPerson } from 'react-icons/bs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';

const AIChat = ({ offerData }) => {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error('Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file');
        return (
            <div className="AIChat">
                <div className="ChatHeader">
                    <h3>{t('offer.chat.title')}</h3>
                    <p>{t('offer.chat.subtitle')}</p>
                </div>
                <div className="MessagesContainer">
                    <div className="Message ai">
                        <div className="MessageIcon">
                            <BsRobot />
                        </div>
                        <div className="MessageContent">
                            {t('offer.chat.configuration_error')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generatePrompt = (userInput) => {
        const servicesDescription = offerData.categories.map(category => ({
            name: category.name,
            packages: category.packages.map(pkg => ({
                name: pkg.name,
                price: pkg.price
            }))
        }));

        return `You are an assistant helping users choose the best service packages for their needs. 
Based on the user's message and the available categories and packages, recommend the best matching package(s) by name and category, and briefly explain your choice in 2-3 sentences. 
At the end, list the selected packages in the format: Selected packages: [category name] - [package name], [category name] - [package name], ...
Do not list package features. Do not repeat these instructions. Respond in the user's language (${i18n.language}). Use Markdown.

Available services:
${JSON.stringify(servicesDescription, null, 2)}

User's message: ${userInput}`;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            type: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (!apiKey) {
                throw new Error('API key is not configured');
            }

            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = generatePrompt(input);
            console.log('Sending prompt to Gemini API...');
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Extract selected packages from the AI response
            let newSelectedServices = [];
            const selectedMatch = text.match(/Selected packages?:\s*([\s\S]*)/i);
            if (selectedMatch && selectedMatch[1]) {
                // Split by comma, then by dash
                newSelectedServices = selectedMatch[1]
                    .split(',')
                    .map(item => item.trim())
                    .map(item => {
                        const parts = item.split(' - ');
                        if (parts.length === 2) {
                            return { category: parts[0].trim(), package: parts[1].trim() };
                        }
                        return null;
                    })
                    .filter(Boolean);
            }
            setSelectedServices(newSelectedServices);

            const html = marked.parse(text);
            const aiMessage = {
                type: 'ai',
                content: html
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.status,
                statusText: error.statusText,
                response: error.response
            });
            const errorMessage = {
                type: 'ai',
                content: t('offer.chat.error')
            };
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
                    <div key={index} className={`Message ${message.type}`}>
                        <div className="MessageIcon">
                            {message.type === 'ai' ? <BsRobot /> : <BsPerson />}
                        </div>
                        {message.type === 'ai' ? (
                            <div className="MessageContent" dangerouslySetInnerHTML={{ __html: message.content }} />
                        ) : (
                            <div className="MessageContent">{message.content}</div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="Message ai">
                        <div className="MessageIcon">
                            <BsRobot />
                        </div>
                        <div className="MessageContent">
                            <div className="LoadingDots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
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