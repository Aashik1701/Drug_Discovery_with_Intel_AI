import React, { useState, useCallback, useEffect, useRef } from 'react';
import './Chatbot.css'; // Import CSS file for styling
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
        <div className="chatbot-container">
            {isOpen ? (
                <div className="chatbot-window">
                <div className="chatbot-header">
                    <h3>Chat with DrugForge AI</h3>
                    <button className="close-button" onClick={closeChat} aria-label="Close chat">✖</button>
                </div>
                <div className="chatbot-body">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div 
                                key={`msg-${index}-${msg.timestamp}`} 
                                className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}
                            >
                                <div className="message-header">
                                    <span className="message-sender">{msg.sender === 'bot' ? 'DrugForge' : 'You'}</span>
                                    <span className="message-timestamp">
                                        {msg.timestamp.toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="message-content">
                                    <ReactMarkdown className="p-4">{msg.text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="chatbot-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={generatingAnswer}
                        className="input-field"
                        aria-label="Chat message input"
                    />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={generatingAnswer || message.trim() === ''} 
                        className="send-button"
                    >
                        {generatingAnswer ? 'Thinking...' : 'Send'}
                    </button>
                </div>
            </div>
            ) : (
                <div className="chatbot-icon">
                    <video width="50" height="50" loop autoPlay muted playsInline>
                        <source src="/Images/videos/chatbot-icon.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <button onClick={toggleChat} aria-label="Open chat assistant">Chat</button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;