import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Lightbulb } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = "http://localhost:8000";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        try {
            await axios.post(`${BACKEND_URL}/contact`, { ...formData, subject: "Contact Form Inquiry" });
            setStatus('success');
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
            if (err.response?.status === 400) {
                setErrorMessage('Invalid email address. Please check and try again.');
            } else if (err.response?.status === 500) {
                setErrorMessage('Server error. Please try again later.');
            } else if (err.message === 'Network Error') {
                setErrorMessage('Network error. Please check your connection.');
            } else {
                setErrorMessage('Failed to send message. Please try again.');
            }
        }
    };

    const resetForm = () => {
        setSubmitted(false);
        setStatus('idle');
        setErrorMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Green Header Banner */}
            <div className="bg-[#279d63] pt-32 pb-24 text-center text-white relative">
                <h1 className="text-5xl md:text-6xl font-black mb-4">Contact Us</h1>
                <p className="text-xl md:text-2xl font-medium">Let’s connect and build a cleaner energy future.</p>

                {/* Overlapping Icon */}
                <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
                    <div className="w-32 h-32 bg-white rounded-[2rem] shadow-xl flex items-center justify-center p-2">
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 rounded-[1.5rem] flex items-center justify-center border border-green-200">
                            <Lightbulb className="w-20 h-20 text-[#279d63]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-[#279d63] mb-4">Get In Touch</h2>
                    <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">POWERING A SUSTAINABLE FUTURE FOR INDUSTRIES WORLDWIDE.</p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden grid lg:grid-cols-2">
                    {/* Left Side: Form / Success Message */}
                    <div className="p-12 md:p-16">
                        {!submitted ? (
                            <>
                                <h3 className="text-2xl font-bold text-[#279d63] mb-8">Send us a message</h3>

                                {/* Error Message */}
                                {errorMessage && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-red-700 font-semibold text-sm">{errorMessage}</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2 text-sm">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#279d63] focus:ring-1 focus:ring-[#279d63] transition-all bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2 text-sm">Your Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#279d63] focus:ring-1 focus:ring-[#279d63] transition-all bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2 text-sm">Message</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#279d63] focus:ring-1 focus:ring-[#279d63] transition-all bg-gray-50 resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-[#279d63] hover:bg-[#208552] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-[#279d63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#279d63] mb-3">Message Delivered Successfully!</h3>
                                <p className="text-gray-600 mb-8">Thank you for contacting us. We'll get back to you soon.</p>
                                <button
                                    onClick={resetForm}
                                    className="px-8 py-3 bg-[#279d63] hover:bg-[#208552] text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98]"
                                >
                                    Back to Form
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Info & Map */}
                    <div className="bg-gray-50 p-12 md:p-16 border-l border-gray-100">
                        <h3 className="text-2xl font-bold text-[#279d63] mb-8">Our Office</h3>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4 text-gray-600">
                                <Clock className="w-5 h-5 text-[#279d63] mt-1" />
                                <p className="text-sm leading-relaxed">
                                    <span className="font-bold text-gray-800">Mon–Fri:</span> 9 AM – 6 PM | <span className="font-bold text-gray-800">Sat:</span> 10 AM – 4 PM
                                </p>
                            </div>
                            <div className="flex items-start gap-4 text-gray-600">
                                <Phone className="w-5 h-5 text-[#279d63] mt-1" />
                                <p className="text-sm font-bold text-gray-800">+91-9876543210</p>
                            </div>
                            <div className="flex items-start gap-4 text-gray-600">
                                <Mail className="w-5 h-5 text-[#279d63] mt-1" />
                                <p className="text-sm text-gray-800">support@localbusiness.com</p>
                            </div>
                            <div className="flex items-start gap-4 text-gray-600">
                                <MapPin className="w-6 h-6 text-[#279d63] mt-1" />
                                <p className="text-sm leading-relaxed text-gray-800">
                                    <strong>Social Prachar</strong><br />
                                    satyabama complex, 301, KPHB Main Rd, opposite sai baba temple, Venkat Nagar, Bhagya Nagar Colony, Venkat Nagar Colony, Hyderabad, Telangana 500085
                                </p>
                            </div>
                        </div>

                        {/* Map Area */}
                        <div className="w-full h-64 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md relative group">
                            <iframe
                                title="Office Location - Social Prachar"
                                src="https://maps.google.com/maps?q=Social+Prachar,+satyabama+complex,+301,+KPHB+Main+Rd,+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="mt-6 text-center">
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=Social+Prachar,+satyabama+complex,+301,+KPHB+Main+Rd,+Hyderabad,+Telangana+500085"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-[#279d63] font-bold border border-[#279d63] px-6 py-3 rounded-xl hover:bg-[#279d63] hover:text-white transition-all text-sm"
                            >
                                <MapPin className="w-4 h-4 mr-2" /> Get Directions
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
