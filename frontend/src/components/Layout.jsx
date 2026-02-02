import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, Github, LogOut, User, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';
import appLogo from '../assets/icon.png';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const { user, userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'AboutUs', path: '/about' },
        { name: 'OurAi', path: '/inspection' },
        { name: 'ContactUs', path: '/contact' },
    ];

    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-900">
            {/* Navigation - BLACK Background */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-black shadow-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-3">
                                <img src={appLogo} alt="SolarAI Logo" className="w-10 h-10 object-contain" />
                                <span className="text-2xl font-black tracking-tighter text-white">
                                    SolarAI
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={clsx(
                                            'text-sm font-bold uppercase tracking-wider hover:text-blue-600 transition-colors',
                                            location.pathname === link.path
                                                ? 'text-blue-600'
                                                : 'text-gray-600'
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {user ? (
                                    <div className="relative ml-4">
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center space-x-2 text-sm font-bold text-gray-700 hover:text-blue-600"
                                        >
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span>{userData?.name || user.email.split('@')[0]}</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        {isProfileOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">My Profile</Link>
                                                    <button
                                                        onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3 ml-4">
                                        <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600">Log In</Link>
                                        <Link to="/signup" className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg shadow-blue-200">
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-4 py-3 rounded-lg text-base font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100">
                                {user ? (
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-lg">
                                        Sign Out
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <Link to="/login" className="block w-full px-4 py-3 text-center text-gray-700 font-bold border rounded-lg" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                                        <Link to="/signup" className="block w-full px-4 py-3 text-center text-white bg-blue-600 font-bold rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-[#003366]">SOLARAI</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Empowering a sustainable future through advanced AI inspection and clean energy diagnostics.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Navigation</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                                <li><Link to="/inspection" className="hover:text-blue-600">Our AI</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
                        &copy; 2026 SolarAI. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
