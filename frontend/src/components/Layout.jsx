import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sun, Menu, X, Facebook, Twitter, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';
import clsx from 'clsx';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Learn', path: '/learn' },
        { name: 'Inspect', path: '/inspection' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-gray-100 overflow-x-hidden font-sans">
            {/* Navigation */}
            <nav className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="p-2 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-all">
                                    <Sun className="w-8 h-8 text-primary-400" />
                                </div>
                                <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                                    SOLARAI
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={clsx(
                                            'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative group',
                                            location.pathname === link.path
                                                ? 'text-primary-400 bg-primary-400/5'
                                                : 'text-gray-400 hover:text-white'
                                        )}
                                    >
                                        {link.name}
                                        {location.pathname === link.path && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 rounded-full" />
                                        )}
                                    </Link>
                                ))}
                                <div className="h-6 w-px bg-slate-700 mx-4" />
                                {/* <button className="px-5 py-2.5 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all">
                                    Login
                                </button> */}
                                <Link
                                    to="/inspection/start"
                                    className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 rounded-xl shadow-lg shadow-primary-500/20 hover:scale-105 transition-all active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top-4 duration-300">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={clsx(
                                        "block px-4 py-3 rounded-xl text-base font-bold transition-colors",
                                        location.pathname === link.path
                                            ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                            : "text-gray-400 hover:text-white hover:bg-slate-800"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/inspection/start"
                                className="block w-full text-center px-4 py-4 rounded-xl text-base font-bold bg-primary-600 text-white shadow-xl shadow-primary-500/20"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Start Inspection
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow relative">
                {/* Visual Noise Overlay */}
                <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[-1]"></div>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 relative z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 blur-[130px] rounded-full -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <Link to="/" className="flex items-center space-x-2">
                                <Sun className="w-8 h-8 text-primary-400" />
                                <span className="text-2xl font-black bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                                    SOLARAI
                                </span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                Decentralized AI-powered solar inspection platform for a sustainable future. Empowering homeowners and utilities with vision intelligence.
                            </p>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                                    <a key={i} href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-gray-400 hover:text-primary-400 hover:border-primary-400/50 transition-all">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-bold mb-6">Quick Navigation</h4>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-white font-bold mb-6">Resources</h4>
                            <ul className="space-y-4">
                                {['Documentation', 'API Reference', 'Solar Benefits', 'Case Studies', 'Community'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all"></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 text-sm text-gray-400">
                                    <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                                    <span>Social Prachar, Satyabama Complex, 301, KPHB Main Rd, Opposite Sai Baba Temple, Hyderabad, 500085</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-400">
                                    <Mail className="w-5 h-5 text-primary-400" />
                                    <span>hello@solarai.com</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-400">
                                    <Phone className="w-5 h-5 text-primary-400" />
                                    <span>+91 800-456-7890</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-xs text-center md:text-left leading-relaxed">
                            © 2026 SolarAI Inspection Platform. Built for Advanced Solar Diagnostics.
                        </p>
                        <div className="flex space-x-6 text-xs text-gray-600">
                            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
