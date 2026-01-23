import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Minus, Send, X, Bot, User, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const FAQChatbot = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Solara, your AI energy assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const faqs = [
        {
            question: "How does the AI detection work?",
            answer: "Our system uses YOLO (You Only Look Once) deep learning models trained on thousands of thermal and RGB solar images. It identifies patterns corresponding to specific faults like hotspots, bird drops, and physical cracks with high precision."
        },
        {
            question: "What is the confidence score?",
            answer: "The confidence score (0-100%) represents how certain the AI is about a detection. A score of 95% means the pattern strongly matches a known fault type. We typically highlight detections above 50% for expert review."
        },
        {
            question: "Why were some panels not detected?",
            answer: "To ensure accuracy, we use strict geometric filtering. We calculate the median area and aspect ratio of all detected panels and filter out 'half panels' or partial detections at the edge of the image to provide a clean energy loss estimate."
        },
        {
            question: "How is energy loss calculated?",
            answer: "Loss is calculated using the formula: [System Capacity * Sunlight Hours * Fault Severity * Confidence]. Fault severity is based on industry-standard impact ranges (e.g., Bird-drop: 5-10%, Cracks: 30-50%)."
        },
        {
            question: "Is this a certified measurement?",
            answer: "While highly accurate for pre-screening and maintenance alerts, this is a diagnostic tool based on computer vision. For financial audits, we recommend follow-up on-site IV curve testing for identified faulty panels."
        }
    ];

    const chatResponses = {
        "hello": "Hi there! I can help you with solar inspections, energy types, or explaining your results. What's on your mind?",
        "how it works": "We use ONNX computer vision models to scan your solar panel images for defects and calculate real-time energy loss estimates.",
        "price": "Our basic inspection is free! For large utility-scale plants, we offer a Premium plan with historical tracking and priority analysis.",
        "contact": "You can reach our human support team at hello@solarai.com or visit our Contact page!",
        "accuracy": "Our models have an 89% precision rate on standard defects under clear sunlight conditions.",
        "default": "I'm still learning! You might find the answer in our FAQ section above, or you can send a message to our support team via the Contact page."
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const lowerInput = inputValue.toLowerCase();
            let responseText = chatResponses.default;

            for (let key in chatResponses) {
                if (lowerInput.includes(key)) {
                    responseText = chatResponses[key];
                    break;
                }
            }

            const botMsg = { id: Date.now() + 1, text: responseText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            {/* FAQ Section */}
            <header className="mb-20 text-center">
                <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    Help Center
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                    Frequently Asked <span className="text-primary-400">Questions</span>
                </h1>
                <p className="text-gray-400 text-lg">
                    Everything you need to know about the platform and the science behind our AI.
                </p>
            </header>

            <div className="space-y-4 mb-20">
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden"
                    >
                        <button
                            className="w-full px-6 py-5 flex items-center justify-between text-left group"
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <span className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                                {faq.question}
                            </span>
                            {openIndex === i ? (
                                <Minus className="w-5 h-5 text-primary-400" />
                            ) : (
                                <Plus className="w-5 h-5 text-gray-500 group-hover:text-primary-400" />
                            )}
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6"
                                >
                                    <p className="text-gray-400 leading-relaxed pt-2 border-t border-slate-700/50">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Support Box */}
            <div className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 border border-primary-500/30 p-8 rounded-3xl text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Can&apos;t find what you need?</h3>
                <p className="text-gray-400 mb-6">Our dedicated support team is available 24/7 to help you with technical issues.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/20"
                    >
                        Chat with Solara
                    </button>
                    <a
                        href="/contact"
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all"
                    >
                        Contact Support
                    </a>
                </div>
            </div>

            {/* Chatbot Overlay */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[100] w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                        style={{ height: '600px', maxHeight: '80vh' }}
                    >
                        {/* Chat Header */}
                        <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                                    <Bot className="w-6 h-6 text-primary-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Solara AI</h4>
                                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="p-2 hover:bg-slate-700 rounded-lg text-gray-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={clsx(
                                        "flex items-start gap-2 max-w-[85%]",
                                        msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border",
                                        msg.sender === 'user' ? "bg-slate-800 border-slate-700" : "bg-primary-500/10 border-primary-500/20"
                                    )}>
                                        {msg.sender === 'user' ? <User className="w-4 h-4 text-gray-400" /> : <Bot className="w-4 h-4 text-primary-400" />}
                                    </div>
                                    <div className={clsx(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.sender === 'user' ? "bg-primary-600 text-white rounded-tr-none" : "bg-slate-800 text-gray-200 rounded-tl-none border border-slate-700"
                                    )}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start gap-2 mr-auto">
                                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border bg-primary-500/10 border-primary-500/20">
                                        <Bot className="w-4 h-4 text-primary-400" />
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 rounded-tl-none">
                                        <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900 border-t border-slate-800">
                            <form
                                className="flex gap-2"
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="p-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating FAB */}
            {!isChatOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-500 transition-all shadow-primary-500/30"
                >
                    <MessageSquare className="w-7 h-7" />
                </motion.button>
            )}
        </div>
    );
};

export default FAQChatbot;
