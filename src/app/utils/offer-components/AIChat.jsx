import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSend, BsRobot, BsPerson } from 'react-icons/bs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChat = ({ offerData }) => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [selectedServices, setSelectedServices] = useState([]);

    // Initialize Gemini with environment variable
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generatePrompt = (userInput) => {
        const servicesDescription = offerData.categories.map(category => ({
            name: category.name,
            description: category.description,
            packages: category.packages.map(pkg => ({
                name: pkg.name,
                price: pkg.price,
                features: pkg.features
            }))
        }));

        return `You are a helpful AI assistant helping users find the right services for their needs. 
        Based on the following available services and the user's needs, suggest the most appropriate packages.
        
        Available services:
        ${JSON.stringify(servicesDescription, null, 2)}
        
        User's needs: ${userInput}
        
        Please analyze the user's needs and:
        1. Suggest specific packages that would best match their requirements
        2. Explain why these packages are recommended
        3. Provide a brief summary of what they would get
        4. Format your response in a clear, structured way
        5. If the user's needs are unclear, ask for more specific information
        6. Consider the user's budget and timeline if mentioned
        
        Respond in the same language as the user's input.`;
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
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = generatePrompt(input);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const aiMessage = {
                type: 'ai',
                content: text
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
                        <div className="MessageContent">
                            {message.content}
                        </div>
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