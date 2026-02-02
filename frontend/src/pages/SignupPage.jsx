import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await signup(email, password, name);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to create an account.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
                {/* Left Side: Brand/Info */}
                <div className="md:w-5/12 bg-gradient-to-br from-primary-600 to-blue-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-white/5"><UserPlus className="w-64 h-64 rotate-12" /></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-6 leading-tight">Join the Future of Solar Audits</h2>
                        <ul className="space-y-4">
                            {[
                                'Accurate AI Diagnostics',
                                'Energy Loss Analysis',
                                'Module-Level Tracking',
                                'Priority Maintenance Planning'
                            ].map(item => (
                                <li key={item} className="flex items-center text-sm font-bold gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-white/70" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative z-10 pt-10">
                        <p className="text-xs font-bold text-white/60 tracking-widest uppercase">SolarAI Enterprise</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-7/12 p-10 bg-slate-800/20">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Account</h1>
                        <p className="text-gray-400 font-medium text-sm">Sign up for a free diagnostic account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                    placeholder="Naveen Kumar"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                    placeholder="name@work.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Confirm</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-70 text-white font-black rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center mt-4"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="ml-2 w-5 h-5" /></>}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-500 font-medium">
                        Already have an account? <Link to="/login" className="text-primary-400 font-bold hover:text-primary-300">Sign in instead</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
