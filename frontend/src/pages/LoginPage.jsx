import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, Github, ArrowRight, AlertCircle, Loader2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (err) {
            setError('Failed to log in with Google.');
            console.error(err);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setResetLoading(true);
        setError('');
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetSuccess(true);
        } catch (err) {
            setError('Failed to send password reset email. Please check your email address.');
            console.error(err);
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
            {/* Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] shadow-2xl p-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-gray-400 font-medium">Log in to manage your solar diagnostics</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-xs font-bold text-primary-400 hover:text-primary-300"
                            >
                                Forgot?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary-600 hover:bg-primary-500 disabled:opacity-70 text-white font-black rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 w-5 h-5" /></>}
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700/50"></div></div>
                    <span className="relative px-4 bg-slate-800/0 text-xs font-bold text-gray-500 uppercase tracking-widest backdrop-blur-sm">Or continue with</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 py-4 bg-white hover:bg-gray-100 text-slate-900 font-bold rounded-2xl transition-all active:scale-95"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-2xl border border-slate-700 transition-all active:scale-95">
                        <Github className="w-5 h-5" />
                        GitHub
                    </button>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500 font-medium">
                    Don't have an account? <Link to="/signup" className="text-primary-400 font-bold hover:text-primary-300">Create one for free</Link>
                </p>
            </motion.div>

            {/* Forgot Password Modal */}
            <AnimatePresence>
                {showForgotPassword && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl max-w-md w-full p-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-white">Reset Password</h2>
                                <button
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setResetSuccess(false);
                                        setResetEmail('');
                                        setError('');
                                    }}
                                    className="p-2 hover:bg-slate-700 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {resetSuccess ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-8 h-8 text-green-400" />
                                    </div>
                                    <p className="text-white font-semibold mb-2">Check Your Email</p>
                                    <p className="text-gray-400 text-sm mb-6">
                                        We've sent password reset instructions to <span className="text-primary-400">{resetEmail}</span>
                                    </p>
                                    <button
                                        onClick={() => {
                                            setShowForgotPassword(false);
                                            setResetSuccess(false);
                                            setResetEmail('');
                                        }}
                                        className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all"
                                    >
                                        Got it
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotPassword} className="space-y-6">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-4">
                                            Enter your email address and we'll send you instructions to reset your password.
                                        </p>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                            <input
                                                type="email"
                                                required
                                                value={resetEmail}
                                                onChange={(e) => setResetEmail(e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={resetLoading}
                                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-70 text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center"
                                    >
                                        {resetLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
