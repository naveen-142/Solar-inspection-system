import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, Zap, Wind, Sun, Mountain, Database, Atom, Pickaxe } from 'lucide-react'; // Pickaxe/Hammer for minerals
import { Link } from 'react-router-dom';

// Import Assets
import heroImage from '../assets/Energy1-Bz6aWuW_.jpg';
import solarImg from '../assets/solarpower.jpg';
import windImg from '../assets/wind.jpg';
import hydroImg from '../assets/hydro electric.jpg';
import coalImg from '../assets/coal.jpg';
import oilImg from '../assets/Oil.jpg';
import gasImg from '../assets/natural-gas.jpg';
import geothermalImg from '../assets/geothermal-plant.jpg';
import nuclearImg from '../assets/Nuclear_Energy.jpg';
import renewableHero from '../assets/Renewable energy.jpg';
import nonRenewableHero from '../assets/Oil.jpg'; // Using Oil as placeholder for Non-Renewable hero if specific one not found

// Energy Types Data
const ENERGY_LABELS = [
    { label: 'Uranium', icon: Atom, color: 'text-yellow-600' },
    { label: 'Minerals', icon: Pickaxe, color: 'text-gray-500' },
    { label: 'Natural Gas', icon: Flame, color: 'text-orange-500' },
    { label: 'Geothermal', icon: Mountain, color: 'text-red-500' },
    { label: 'Ocean Energy', icon: Droplets, color: 'text-blue-500' },
    { label: 'Oil', icon: Database, color: 'text-gray-700' },
    { label: 'Solar Energy', icon: Sun, color: 'text-yellow-500' },
    { label: 'Wind Energy', icon: Wind, color: 'text-cyan-500' }
];

const ENERGY_IMAGES = [
    { name: 'Nuclear', img: nuclearImg },
    { name: 'Minerals', img: coalImg }, // Using Cole/Minerals generic
    { name: 'Gas', img: gasImg },
    { name: 'Geothermal', img: geothermalImg },
    { name: 'Ocean', img: hydroImg }, // Using Hydro as Ocean proxy
    { name: 'Oil', img: oilImg },
    { name: 'Solar', img: solarImg },
    { name: 'Wind', img: windImg }
];

const LandingPage = () => {
    return (
        <div className="min-h-screen font-sans bg-[#fdfbf6] text-gray-800 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-[#fdfbf6] to-[#ecfccb]/20">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-5 py-2 bg-white border border-green-100 rounded-full shadow-sm mb-8"
                        >
                            <span className="text-green-700 font-bold text-xs tracking-[0.15em] uppercase">
                                Intelligent Energy Futures
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-[#1a2e35] leading-[1.1] mb-8"
                        >
                            Empowering Industries With <span className="text-green-700">Smart, Sustainable</span> & Data-Driven Energy Systems
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl"
                        >
                            We provide AI-powered insights, predictive analytics, and intelligent
                            control systems that help industries optimize energy usage, reduce
                            carbon emissions, improve equipment reliability, and accelerate their
                            transition toward clean and efficient operations.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link
                                to="/inspection/start"
                                className="inline-flex px-8 py-4 bg-[#1a2e35] hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Image - Circular */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-[500px] h-[500px] mx-auto">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 bg-green-200/50 rounded-full blur-3xl scale-90" />

                            {/* Main Image Container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-[8px] border-white shadow-2xl">
                                <img
                                    src={heroImage}
                                    alt="Sustainable Future"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent mix-blend-overlay" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Types of Energy Section */}
            <section className="py-24 bg-[#fdfbf6]">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <h2 className="text-4xl font-black text-[#134e4a] mb-4">Types of Energy</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Understand the mix of energy sources fueling industry today so you can
                        prioritize investments that move the emissions needle fastest.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4">

                    {/* 1. Text Marquee (Scrolls Left -> Right) */}
                    <div className="flex overflow-hidden mb-12 relative max-w-full">
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fdfbf6] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fdfbf6] to-transparent z-10" />
                        <motion.div
                            className="flex gap-16 items-center whitespace-nowrap min-w-full"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                        >
                            {[...ENERGY_LABELS, ...ENERGY_LABELS, ...ENERGY_LABELS, ...ENERGY_LABELS].map((item, i) => (
                                <div key={i} className="flex flex-col items-center justify-center gap-2 min-w-[100px]">
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">{item.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* 2. Image Marquee (Scrolls Right -> Left) with Pulse */}
                    <div className="flex overflow-hidden relative max-w-full">
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fdfbf6] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fdfbf6] to-transparent z-10" />
                        <motion.div
                            className="flex gap-8 whitespace-nowrap min-w-full"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                        >
                            {[...ENERGY_IMAGES, ...ENERGY_IMAGES, ...ENERGY_IMAGES, ...ENERGY_IMAGES].map((item, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                    className="w-56 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Flash Overlay */}
                                    <motion.div
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 1 }}
                                        className="absolute inset-0 bg-white blend-mode-overlay"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Renewable Energy Feature */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <span className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-[#279d63] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg">Renewable</span>
                        <img
                            src={renewableHero}
                            alt="Renewable Island"
                            className="w-full rounded-[2.5rem] shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-green-700 mb-4">Renewable Energy</h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                            Energy drawn from sources that naturally replenish, such as sunlight, wind,
                            water, and biomass. These options minimize greenhouse gases and prepare
                            grids for a resilient future.
                        </p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Examples: Solar · Wind · Hydropower · Biomass</p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { label: 'Projected Mix', value: '72%', sub: 'by 2040' },
                                { label: 'Storage Growth', value: '4x', sub: 'capacity' },
                                { label: 'Emissions', value: '0', sub: 'on-site' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <p className="text-xl font-black text-green-700">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Link to="/learn?category=renewable" className="px-8 py-3 bg-[#279d63] hover:bg-[#208552] text-white font-bold rounded-lg shadow-lg shadow-green-900/20 transition-all">
                                Explore Renewables
                            </Link>
                            <Link to="/contact" className="px-8 py-3 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-lg border border-green-200 transition-all">
                                Talk to experts
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Non-Renewable Energy Feature */}
            <section className="py-16 px-4 max-w-7xl mx-auto mb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                    <div className="lg:order-2 relative">
                        <span className="absolute top-6 right-6 z-20 px-4 py-1.5 bg-orange-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg">Legacy</span>
                        <img
                            src={nonRenewableHero}
                            alt="Non-Renewable Industrial"
                            className="w-full rounded-[2.5rem] shadow-2xl -skew-y-1 transform transition-transform hover:skew-y-0 duration-700"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h2 className="text-3xl font-black text-red-600 mb-4">Non-Renewable Energy</h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                            Fossil-based sources like coal, oil, and natural gas formed over millions of
                            years. They are energy-dense yet finite, and transitioning away from them
                            reduces climate risk.
                        </p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Examples: Coal · Oil · Natural Gas · Nuclear</p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { label: 'Carbon Intensity', value: '2.1x', sub: 'higher' },
                                { label: 'Net Zero', value: '2050', sub: 'milestone' },
                                { label: 'Demand', value: '-35%', sub: 'targeted' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                                    <p className="text-xl font-black text-red-600">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {/* NOTE: Linking to learn page as requested */}
                            <Link to="/learn?category=non-renewable" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-900/20 transition-all">
                                Explore Non-Renewables
                            </Link>
                            <Link to="/contact" className="px-8 py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold rounded-lg border border-orange-200 transition-all">
                                Talk to experts
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
