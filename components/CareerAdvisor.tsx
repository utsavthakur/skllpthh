import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { askCareerQuestion, Message } from '../services/nvidiaApi';
import { CareerPath } from '../types';

interface CareerAdvisorProps {
    career?: CareerPath;
    userName: string;
}

export const CareerAdvisor: React.FC<CareerAdvisorProps> = ({ career, userName }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: `Hi ${userName}! 👋 I'm your AI Career Advisor. I can help you with questions about ${career?.title || 'your career path'}, skills needed, job market trends, and more. What would you like to know?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        // Filter out the initial assistant greeting for the API call
        // The API requires the sequence: System -> User -> Assistant -> User...
        const apiMessages = updatedMessages.filter((msg, index) =>
            !(index === 0 && msg.role === 'assistant')
        );

        // Add context about the user's career
        const contextMessages: Message[] = career
            ? [
                {
                    role: 'system',
                    content: `You are a helpful career advisor. The user is exploring the career path: "${career.title}". Their required skills are: ${career.skills.map(s => s.name).join(', ')}. Provide concise, actionable advice.`
                },
                ...apiMessages
            ]
            : apiMessages;

        try {
            let assistantResponse = '';
            const assistantMessageIndex = messages.length + 1;

            // Add placeholder for streaming response
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            await askCareerQuestion(contextMessages, (chunk) => {
                assistantResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[assistantMessageIndex] = { role: 'assistant', content: assistantResponse };
                    return newMessages;
                });
            });
        } catch (error) {
            console.error('Career Advisor Error:', error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-6">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-xl">
                        <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">AI Career Advisor</h2>

                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-brand-600" />
                            </div>
                        )}
                        <div
                            className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                ? 'bg-brand-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                            <Loader2 className="h-5 w-5 text-brand-600 animate-spin" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                            <p className="text-sm text-gray-500">Thinking...</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about your career..."
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
