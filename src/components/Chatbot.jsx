import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Welcome to DrugForge! How can I assist you today?', sender: 'bot', timestamp: new Date() }
    ]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    
    // Use ref to access latest messages
    const messagesEndRef = useRef(null);
    const apiKeyRef = useRef(import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT);
    
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
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKeyRef.current}`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: message }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                },
            });

            // Add bot response after API call completes
            setMessages(prevMessages => [
                ...prevMessages,
                { 
                    text: response.data.candidates[0].content.parts[0].text || "No response generated", 
                    sender: 'bot', 
                    timestamp: new Date() 
                }
            ]);
        } catch (error) {
            console.error("Chatbot API error:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                { 
                    text: "Sorry - Something went wrong. Please try again!", 
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
                <div className="w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
                <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
                    <h3 className="text-white font-medium">Chat with DrugForge AI</h3>
                    <button 
                        className="text-white hover:bg-blue-700 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none" 
                        onClick={closeChat} 
                        aria-label="Close chat"
                    >
                        ✖
                    </button>
                </div>
                <div className="flex-grow overflow-auto bg-gray-50 p-4">
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => (
                            <div 
                                key={`msg-${index}-${msg.timestamp}`} 
                                className={`rounded-lg max-w-[85%] ${msg.sender === 'bot' 
                                    ? 'bg-white border border-gray-200 self-start' 
                                    : 'bg-blue-500 text-white self-end'
                                }`}
                            >
                                <div className="px-3 py-1 border-b border-gray-100 flex justify-between items-center">
                                    <span className="text-xs font-medium">{msg.sender === 'bot' ? 'DrugForge' : 'You'}</span>
                                    <span className="text-xs opacity-75">
                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                                <div className="px-3 py-2">
                                    <ReactMarkdown className="prose prose-sm">{msg.text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="bg-gray-100 p-3 border-t border-gray-200 flex">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={generatingAnswer}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        aria-label="Chat message input"
                    />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={generatingAnswer || message.trim() === ''} 
                        className={`px-4 py-2 rounded-r-md ${
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
                <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105" onClick={toggleChat}>
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