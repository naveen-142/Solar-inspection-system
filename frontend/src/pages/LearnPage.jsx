import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Wind, Droplets, Flame, Zap, AlertTriangle, Cloud, Hammer, Info, X } from 'lucide-react';

// Asset Imports
import solarImg from '../assets/solarpower.jpg';
import windImg from '../assets/wind.jpg';
import hydroImg from '../assets/hydro electric.jpg';
import coalImg from '../assets/coal.jpg';

const LearnPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const energySources = [
        {
            id: 'solar',
            type: 'Renewable',
            title: 'Solar Power',
            icon: Sun,
            color: 'text-yellow-400',
            bg: 'bg-yellow-400/10',
            image: solarImg,
            description: 'Sunlight is converted into electricity using photovoltaic (PV) cells or through mirrors that concentrate solar radiation.',
            benefits: ['Infinite resource', 'No carbon emissions', 'Low maintenance'],
            drawbacks: ['Weather dependent', 'High initial cost', 'Space intensive']
        },
        {
            id: 'wind',
            type: 'Renewable',
            title: 'Wind Energy',
            icon: Wind,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            image: windImg,
            description: 'Wind turbines harness the kinetic energy of moving air to rotate blades that drive electric generators.',
            benefits: ['Zero emissions', 'Land can be used for farming', 'Rapidly falling costs'],
            drawbacks: ['Noise pollution', 'Bird strikes', 'Unpredictable supply']
        },
        {
            id: 'hydro',
            type: 'Renewable',
            title: 'Hydro Electric',
            icon: Droplets,
            color: 'text-cyan-400',
            bg: 'bg-cyan-400/10',
            image: hydroImg,
            description: 'Moving water, usually from dams or rivers, turns turbines to produce electricity.',
            benefits: ['Reliable base load', 'Dual use (irrigation)', 'Very efficient'],
            drawbacks: ['Displaces communities', 'Harms fish migrations', 'Heavy drought risk']
        },
        {
            id: 'coal',
            type: 'Non-Renewable',
            title: 'Coal',
            icon: Flame,
            color: 'text-gray-400',
            bg: 'bg-gray-400/10',
            image: coalImg,
            description: 'A solid fossil fuel formed from plant remains. Burned in power plants to produce steam for electricity.',
            benefits: ['Inexpensive energy', 'Well-established tech', 'Stable base power'],
            drawbacks: ['High CO2 emissions', 'Toxic mining runoff', 'Finite resource']
        }
    ];

    const solarFaults = [
        {
            title: 'Bird Droppings',
            icon: AlertTriangle,
            impact: '5-10% Loss',
            desc: 'Causes shading and localized hotspots. Can lead to permanent cell damage (browning) due to uneven heating.',
            action: 'Manual cleaning with soft water and brush.'
        },
        {
            title: 'Dusty Panels',
            icon: Cloud,
            impact: '1-5% Loss',
            desc: 'A thin layer of dust reduces light transmittance. Common in dry or desert regions.',
            action: 'Automated spray cleaning or seasonal wash.'
        },
        {
            title: 'Physical Damage',
            icon: Hammer,
            impact: '30-50% Loss',
            desc: 'Cracks in glass or cells caused by hail, stones, or improper handling. Breaks electrical continuity.',
            action: 'Replacement of the damaged module.'
        },
        {
            title: 'Electrical Issues',
            icon: Zap,
            impact: '50-80% Loss',
            desc: 'Faulty bypass diodes, internal short circuits, or connector corrosion. Often invisible to the naked eye.',
            action: 'Professional repair of junction box or rewiring.'
        }
    ];

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-20 text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                >
                    Knowledge Hub
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-white mb-6"
                >
                    Understanding Energy & <br /><span className="text-primary-400">Solar Diagnostics</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg max-w-2xl mx-auto"
                >
                    Learn about the global energy mix and how AI helps identify factors that prevent your solar system from reaching 100% capacity.
                </motion.p>
            </header>

            {/* Comparison Section */}
            <section className="mb-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-white">Global Energy Sources</h2>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-2 text-xs text-green-400"><div className="w-2 h-2 rounded-full bg-green-400" /> Renewable</span>
                        <span className="flex items-center gap-2 text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-gray-400" /> Non-Renewable</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {energySources.map((source) => (
                        <motion.div
                            key={source.id}
                            whileHover={{ y: -5 }}
                            className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-primary-500/30 transition-all cursor-pointer group"
                            onClick={() => setSelectedItem(source)}
                        >
                            <div className={`w-12 h-12 ${source.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <source.icon className={`w-6 h-6 ${source.color}`} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${source.type === 'Renewable' ? 'text-green-400' : 'text-gray-500'}`}>
                                {source.type}
                            </span>
                            <h3 className="text-xl font-bold text-white mt-1 mb-4">{source.title}</h3>
                            <button className="text-primary-400 text-sm font-bold flex items-center hover:text-primary-300 transition-colors">
                                Learn More <Info className="ml-2 w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Solar Fault Section */}
            <section className="bg-slate-800/20 rounded-3xl p-8 md:p-12 border border-slate-700/50">
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-bold text-white mb-6">Solar Panel Fault Library</h2>
                    <p className="text-gray-400 mb-12 leading-relaxed">
                        Even small anomalies can significantly impact your ROI. Our AI detection system is trained on thousands of specialized infrared images to identify these specific defect classes.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {solarFaults.map((fault, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                                    <fault.icon className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-white font-bold">{fault.title}</h4>
                                        <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full font-bold">{fault.impact}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{fault.desc}</p>
                                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                        <p className="text-xs text-gray-400"><span className="text-primary-400 font-bold">Fix:</span> {fault.action}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setSelectedItem(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 p-2 bg-slate-800 text-gray-400 hover:text-white rounded-full z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="aspect-video bg-slate-800 relative flex items-center justify-center overflow-hidden">
                                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                    <selectedItem.icon className={`w-20 h-20 ${selectedItem.color}`} />
                                    <div className="text-center px-8">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedItem.type} Source</p>
                                        <h2 className="text-4xl font-black text-white">{selectedItem.title}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="text-gray-300 leading-relaxed mb-8">{selectedItem.description}</p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-green-400 font-bold text-sm uppercase">Advantages</h4>
                                        <ul className="space-y-2">
                                            {selectedItem.benefits.map((b, i) => (
                                                <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-green-400" /> {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-red-400 font-bold text-sm uppercase">Challenges</h4>
                                        <ul className="space-y-2">
                                            {selectedItem.drawbacks.map((d, i) => (
                                                <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-red-400" /> {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LearnPage;
