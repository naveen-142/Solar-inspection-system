import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, ArrowRight, Play, Camera, Cpu, X } from 'lucide-react';
import solarHeroImage from '../assets/Solar Image.jpg';
import tutorialVideo from '../assets/videos/tutorial.mp4';

const InspectionIntro = () => {
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);

    const steps = [
        {
            icon: Camera,
            title: "Upload imagery",
            desc: "Provide infrared or high-res RGB photos of your solar array."
        },
        {
            icon: Cpu,
            title: "AI Analysis",
            desc: "Our vision engine identifies faults and maps them to specific panels."
        },
        {
            icon: BarChart3,
            title: "Actionable Report",
            desc: "Get energy loss estimates and maintenance priorities in seconds."
        }
    ];

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Visual Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-[2rem] overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-900 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {/* Product Illustration Placeholder */}
                        <img
                            src={solarHeroImage}
                            alt="SolarAI Image"
                            className="w-full h-auto opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold text-sm">Visual Diagnostic Engine</p>
                                <p className="text-gray-400 text-xs mt-1">v4.2.0 Stable Build</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                            </div>
                        </div>
                    </div>
                    {/* Background Blobs */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/20 blur-[80px] rounded-full -z-10" />
                    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/20 blur-[100px] rounded-full -z-10" />
                </motion.div>

                {/* Content Side */}
                <div className="space-y-10">
                    <header>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            Industrial Diagnostics
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6"
                        >
                            ASSESS YOUR PLANT <br />
                            <span className="text-primary-400">IN THREE STEPS</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg leading-relaxed max-w-xl"
                        >
                            Our platform provides sub-panel level anomaly detection, enabling proactive maintenance that saves thousands in potential energy loss.
                        </motion.p>
                    </header>

                    <div className="space-y-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="flex gap-6 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                                    <step.icon className="w-6 h-6 text-primary-400 group-hover:text-white transition-colors" />
                                </div>
                                <div className="pt-1">
                                    <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                        <button
                            onClick={() => navigate('/inspection/start')}
                            className="px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white font-black rounded-2xl shadow-xl shadow-primary-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
                        >
                            Start New Session <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-all" />
                        </button>
                        <button
                            onClick={() => setShowVideo(true)}
                            className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all flex items-center justify-center"
                        >
                            <Play className="w-4 h-4 mr-3 text-primary-400" /> Tutorial
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Features Bar */}
            <section className="mt-32 pt-12 border-t border-slate-800/50">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <ShieldCheck className="w-10 h-10 text-green-400" />
                        <div>
                            <h5 className="text-white font-bold">Data Privacy</h5>
                            <p className="text-xs text-gray-500 mt-1 italic">AES-256 Encrypted Processing</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Zap className="w-10 h-10 text-primary-400" />
                        <div>
                            <h5 className="text-white font-bold">Low Latency</h5>
                            <p className="text-xs text-gray-500 mt-1 italic">Inference in &lt; 2 seconds</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Cpu className="w-10 h-10 text-blue-400" />
                        <div>
                            <h5 className="text-white font-bold">Edge Optimized</h5>
                            <p className="text-xs text-gray-500 mt-1 italic">ONNX Runtime Accelerated</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVideo(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-6 right-6 p-3 bg-slate-800/80 hover:bg-primary-600 text-white rounded-full z-10 transition-colors shadow-xl"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <video
                                src={tutorialVideo}
                                className="w-full h-full object-cover"
                                autoPlay
                                controls
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InspectionIntro;
