import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const InspectionIntro = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500 flex items-center justify-center p-4 pt-24 font-sans">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4">OUR MISSION</p>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                        Powering the<br />
                        <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                            Energy Transition
                        </span>
                    </h1>
                    <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
                        We bridge the gap between complex AI diagnostics and actionable solar insights, enabling a cleaner, more resilient grid.
                    </p>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl p-12 mb-12"
                >
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-black text-slate-800 mb-2">98.5%</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">ACCURACY</div>
                            <div className="text-sm text-gray-600">in fault detection</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-black text-slate-800 mb-2">10k+</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">PANELS ANALYZED</div>
                            <div className="text-sm text-gray-600">across 50+ sites</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-black text-slate-800 mb-2">4.2 GWh</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">ENERGY SAVED</div>
                            <div className="text-sm text-gray-600">annual potential</div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <button
                        onClick={() => navigate('/inspection/start')}
                        className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                    >
                        Start AI Inspection
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-6 text-sm text-slate-300">
                        Upload an image • Get instant diagnostics • Save energy
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default InspectionIntro;
