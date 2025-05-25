import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useDrugForge } from '../context/DrugForgeContext';

const Chatbot = () => {
    const { isDarkMode } = useDrugForge();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Welcome to DrugForge! How can I assist you with drug discovery today?', sender: 'bot', timestamp: new Date() }
    ]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    
    // Use ref to access latest messages
    const messagesEndRef = useRef(null);
    const apiKeyRef = useRef(import.meta.env.VITE_OPENAI_API_KEY);
    
    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current && isOpen) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleSendMessage = useCallback(async () => {
        if (message.trim() === '') return;
        
        const userMessage = { 
            text: message, 
            sender: 'user', 
            timestamp: new Date() 
        };
        
        // Update with user message
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setMessage('');
        setGeneratingAnswer(true);
        
        try {
            const response = await axios({
                url: 'https://api.openai.com/v1/chat/completions',
                method: "post",
                headers: {
                    'Authorization': `Bearer ${apiKeyRef.current}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are DrugForge AI, an expert assistant specializing in drug discovery, pharmaceutical research, and computational chemistry. Provide helpful, accurate information about drug development, molecular properties, toxicity prediction, and related topics. Keep responses concise but informative."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000,
                },
            });

            // Add bot response after API call completes
            const botResponse = response.data.choices[0]?.message?.content || "No response generated";
            setMessages(prevMessages => [
                ...prevMessages,
                { 
                    text: botResponse, 
                    sender: 'bot', 
                    timestamp: new Date() 
                }
            ]);
        } catch (error) {
            console.error("Chatbot API error:", error);
            let errorMessage = "Sorry - Something went wrong. Please try again!";
            
            if (error.response?.status === 401) {
                errorMessage = "⚠️ **API Authentication Error**\n\nThe OpenAI API key is invalid or missing. Please:\n1. Check your API key in the environment configuration\n2. Ensure you have sufficient OpenAI credits\n3. Verify the key has the correct permissions";
            } else if (error.response?.status === 429) {
                errorMessage = "⏰ **Rate Limit Exceeded**\n\nYou've reached the API usage limit. Please:\n1. Wait a few minutes before trying again\n2. Check your OpenAI account usage\n3. Consider upgrading your OpenAI plan for higher limits\n\n*Tip: You can continue using other DrugForge features while waiting.*";
            } else if (error.response?.status === 403) {
                errorMessage = "🚫 **Access Forbidden**\n\nThe API key doesn't have permission to access this service. Please check your OpenAI account settings.";
            } else if (error.response?.status >= 500) {
                errorMessage = "🔧 **Server Error**\n\nOpenAI's servers are experiencing issues. Please try again in a few minutes.";
            } else if (error.code === 'NETWORK_ERROR' || !error.response) {
                errorMessage = "🌐 **Connection Error**\n\nCouldn't connect to OpenAI's servers. Please check your internet connection and try again.";
            }
            
            setMessages(prevMessages => [
                ...prevMessages,
                { 
                    text: errorMessage, 
                    sender: 'bot', 
                    timestamp: new Date() 
                }
            ]);
        } finally {
            setGeneratingAnswer(false);
        }
    }, [message]);

    // Handle Enter key press
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !generatingAnswer) {
            handleSendMessage();
        }
    }, [handleSendMessage, generatingAnswer]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className={`w-80 sm:w-96 h-96 rounded-lg shadow-xl flex flex-col overflow-hidden border transition-colors duration-200 ${
                    isDarkMode 
                        ? 'bg-gray-800 border-gray-600' 
                        : 'bg-white border-gray-200'
                }`}>
                <div className={`px-4 py-3 flex justify-between items-center transition-colors duration-200 ${
                    isDarkMode 
                        ? 'bg-blue-700' 
                        : 'bg-blue-600'
                }`}>
                    <h3 className="text-white font-medium">Chat with DrugForge AI</h3>
                    <button 
                        className={`text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none transition-colors duration-200 ${
                            isDarkMode 
                                ? 'hover:bg-blue-800' 
                                : 'hover:bg-blue-700'
                        }`}
                        onClick={closeChat} 
                        aria-label="Close chat"
                    >
                        ✖
                    </button>
                </div>
                <div className={`flex-grow overflow-auto p-4 transition-colors duration-200 ${
                    isDarkMode 
                        ? 'bg-gray-900' 
                        : 'bg-gray-50'
                }`}>
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => (
                            <div 
                                key={`msg-${index}-${msg.timestamp}`} 
                                className={`rounded-lg max-w-[85%] transition-colors duration-200 ${msg.sender === 'bot' 
                                    ? `border self-start ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-gray-100' 
                                            : 'bg-white border-gray-200 text-gray-800'
                                    }` 
                                    : 'bg-blue-500 text-white self-end'
                                }`}
                            >
                                <div className={`px-3 py-1 border-b flex justify-between items-center ${
                                    msg.sender === 'bot' 
                                        ? (isDarkMode ? 'border-gray-600' : 'border-gray-100')
                                        : 'border-blue-400'
                                }`}>
                                    <span className="text-xs font-medium">{msg.sender === 'bot' ? 'DrugForge' : 'You'}</span>
                                    <span className="text-xs opacity-75">
                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                                <div className="px-3 py-2">
                                    <ReactMarkdown className={`prose prose-sm ${
                                        msg.sender === 'bot' && isDarkMode 
                                            ? 'prose-invert' 
                                            : ''
                                    }`}>{msg.text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {generatingAnswer && (
                            <div className={`rounded-lg max-w-[85%] self-start border transition-colors duration-200 ${
                                isDarkMode 
                                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                                    : 'bg-white border-gray-200 text-gray-800'
                            }`}>
                                <div className={`px-3 py-1 border-b flex justify-between items-center ${
                                    isDarkMode ? 'border-gray-600' : 'border-gray-100'
                                }`}>
                                    <span className="text-xs font-medium">DrugForge</span>
                                    <span className="text-xs opacity-75">Typing...</span>
                                </div>
                                <div className="px-3 py-2">
                                    <div className="flex items-center space-x-1">
                                        <div className="flex space-x-1">
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${
                                                isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                                            }`}></div>
                                            <div className={`w-2 h-2 rounded-full animate-pulse animation-delay-200 ${
                                                isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                                            }`}></div>
                                            <div className={`w-2 h-2 rounded-full animate-pulse animation-delay-400 ${
                                                isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                                            }`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className={`p-3 border-t flex transition-colors duration-200 ${
                    isDarkMode 
                        ? 'bg-gray-800 border-gray-600' 
                        : 'bg-gray-100 border-gray-200'
                }`}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={generatingAnswer}
                        className={`flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                        aria-label="Chat message input"
                    />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={generatingAnswer || message.trim() === ''} 
                        className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                            generatingAnswer || message.trim() === '' 
                                ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {generatingAnswer ? 'Thinking...' : 'Send'}
                    </button>
                </div>
            </div>
            ) : (
                <div className={`hover:bg-blue-700 rounded-full p-3 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode 
                        ? 'bg-blue-700 shadow-gray-900/30' 
                        : 'bg-blue-600 shadow-gray-500/30'
                }`} onClick={toggleChat}>
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-white">
                        <video width="40" height="40" loop autoPlay muted playsInline className="max-w-full max-h-full">
                            <source src="/Images/videos/chatbot-icon.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <span className="ml-2 text-white font-medium">Chat</span>
                </div>
            )}
        </div>
    );
};

export default Chatbot;