import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = "https://solar-inspection-system-backend-2.onrender.com";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const response = await axios.post(`${BACKEND_URL}/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMsg(err.response?.data?.detail || 'Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <header className="mb-20 text-center">
                <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    Get in Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                    Connect with our <span className="text-primary-400">Energy Experts</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Have questions about AI inspection or need a custom solution for your solar farm? Our team is ready to assist.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-8">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary-500/20">
                                    <Mail className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Email Us</p>
                                    <p className="text-sm text-gray-400 mt-1">vnaveen83794@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                                    <Phone className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Call Support</p>
                                    <p className="text-sm text-gray-400 mt-1">+91 800-456-7890</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Visit Office</p>
                                    <p className="text-sm text-gray-400 mt-1">Social Prachar, Satyabama Complex, 301, KPHB Hyderabad, 500085</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-4">Connect Socially</h3>
                        <p className="text-sm text-gray-400 mb-6">Stay updated with our latest AI breakthroughs and solar industry news.</p>
                        <div className="flex gap-4">
                            {['Twitter', 'LinkedIn', 'YouTube'].map(social => (
                                <a key={social} href="#" className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:border-primary-400 transition-all">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-800/40 p-8 md:p-12 rounded-3xl border border-slate-700/50">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                                    <CheckCircle className="w-10 h-10 text-green-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                                    Thank you for reaching out. One of our solar experts will get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@company.com"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="Partnership Inquiry / Technical Support"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Message</label>
                                    <textarea
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can we help your solar operations?"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    disabled={status === 'loading'}
                                    type="submit"
                                    className="w-full flex items-center justify-center py-4 px-6 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-70"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-3" /> Sending Inquiry...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-3" /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Google Maps Integration */}
            <div className="mt-20 h-[500px] w-full bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 overflow-hidden shadow-2xl relative">
                <iframe
                    title="Social Prachar Hyderabad"
                    src="https://www.google.com/maps?q=Social%20Prachar,%20satyabama%20complex,%20301,%20KPHB%20Main%20Rd,%20opposite%20sai%20baba%20temple,%20Venkat%20Nagar,%20Bhagya%20Nagar%20Colony,%20Venkat%20Nagar%20Colony,%20Hyderabad,%20Telangana%20500085&output=embed"
                    className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute top-6 left-6 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl pointer-events-none">
                    <p className="text-white font-black text-sm">HEADQUARTERS</p>
                    <p className="text-primary-400 text-[10px] font-bold uppercase tracking-widest mt-1">KPHB, Hyderabad</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
