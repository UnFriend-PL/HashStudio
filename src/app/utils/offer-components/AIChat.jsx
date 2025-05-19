import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSend, BsRobot, BsPerson } from 'react-icons/bs';
import { marked } from 'marked';

const AIChat = ({ offerData, selectedServices, setSelectedServices }) => {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

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
At the end, always list the selected packages in the format: Selected packages: [category name] - [package name], [category name] - [package name], ...
Do not list package features. Do not repeat these instructions. Respond in the user's language (${i18n.language}). Use Markdown.

Example:
User's message: I want a modern logo for a construction company.
Your answer:
For a modern logo for a construction company, I recommend the "Grafika Komputerowa - Basic" package. It offers professional logo design at an affordable price, perfect for your needs.
Selected packages: Grafika Komputerowa - Basic

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
            const prompt = generatePrompt(input);
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

            // Extract selected packages from the AI response
            const selectedMatch = text.match(/Selected packages?:\s*([^\n\r]*)/i);
            if (selectedMatch && selectedMatch[1]) {
                const newSelectedServices = selectedMatch[1]
                    .split(',')
                    .map(item => item.trim())
                    .map(item => {
                        const parts = item.split(' - ');
                        if (parts.length === 2) {
                            const categoryName = parts[0].trim();
                            const packageName = parts[1].trim();
                            
                            // Find the category and package to get the price
                            const category = offerData.categories.find(cat => cat.name === categoryName);
                            if (category) {
                                const pkg = category.packages.find(p => p.name === packageName);
                                if (pkg) {
                                    return {
                                        category: categoryName,
                                        packageName: packageName,
                                        price: pkg.price
                                    };
                                }
                            }
                        }
                        return null;
                    })
                    .filter(Boolean);

                // Update selected services in parent component
                setSelectedServices(newSelectedServices);
            }

            const html = marked.parse(text);
            const aiMessage = {
                type: 'ai',
                content: html
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
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