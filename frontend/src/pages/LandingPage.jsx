import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Zap, CheckCircle, Star, Play, Shield, TrendingUp, Globe, BarChart3, Cloud, Droplets, Flame } from 'lucide-react';

// Asset Imports
import heroVideo from '../assets/Shot video.mp4';
import heroPoster from '../assets/Solar Image.jpg';
import solarImg from '../assets/solarpower.jpg';
import windImg from '../assets/wind.jpg';
import hydroImg from '../assets/hydro electric.jpg';
import coalImg from '../assets/coal.jpg';

const LandingPage = () => {
    const tickerItems = [
        "AI-driven inspection",
        "Faster than manual audits",
        "Detect cracks & dust",
        "Save maintenance cost",
        "89% Precision Rate",
        "Real-time energy loss estimation"
    ];

    const whyCards = [
        {
            title: "Advanced Computer Vision",
            desc: "Proprietary YOLO models trained on 100k+ specialized solar thermal images.",
            icon: Globe,
            color: "text-blue-400"
        },
        {
            title: "Economic Impact Analysis",
            desc: "Translate physical defects directly into kWh loss and financial metrics.",
            icon: BarChart3,
            color: "text-primary-400"
        },
        {
            title: "Rapid Deployment",
            desc: "Upload drone footage and get a full plant report in minutes, not days.",
            icon: TrendingUp,
            color: "text-green-400"
        }
    ];

    const testimonials = [
        {
            name: "Rahul Verma",
            role: "Solar Farm Operator",
            text: "SolarAI reduced our manual inspection time by 70%. The localized defect mapping is a game changer.",
            stars: 5
        },
        {
            name: "Sarah Chen",
            role: "Energy Consultant",
            text: "The energy loss estimation is surprisingly accurate. It helps us prioritize maintenance effectively.",
            stars: 5
        }
    ];

    const energySources = [
        {
            category: "Renewable",
            title: "Solar Power",
            image: solarImg,
            icon: Sun,
            desc: "Harvesting the sun's radiation to generate clean, sustainable electricity."
        },
        {
            category: "Renewable",
            title: "Wind Energy",
            image: windImg,
            icon: Cloud,
            desc: "Capturing kinetic energy from the wind via turbines to power our grid."
        },
        {
            category: "Renewable",
            title: "Hydro Electric",
            image: hydroImg,
            icon: Droplets,
            desc: "Utilizing the force of flowing water to drive turbines and produce energy."
        },
        {
            category: "Non-Renewable",
            title: "Coal",
            image: coalImg,
            icon: Flame,
            desc: "Traditional fossil fuel energy source, essential but transitioning to cleaner alternatives."
        }
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0 z-0 bg-slate-950">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-40"
                        poster={heroPoster}
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-bold border border-primary-500/30 mb-8 backdrop-blur-md">
                            <Zap className="w-3 h-3 mr-2" /> Next-Gen Solar Intelligence
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
                            REINVENTING <br />
                            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                                SOLAR AUDITS
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-medium">
                            Harness the power of Computer Vision to detect faults, estimate losses, and maximize your renewable ROI instantly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/inspection/start"
                                className="w-full sm:w-auto px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white text-lg font-black rounded-2xl shadow-2xl shadow-primary-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
                            >
                                Start Free Inspection <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/learn"
                                className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white text-lg font-bold rounded-2xl backdrop-blur-xl border border-white/10 transition-all flex items-center justify-center"
                            >
                                <Play className="w-5 h-5 mr-3 text-primary-400" /> Watch Demo
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* News Ticker */}
            <div className="bg-primary-600 py-4 flex overflow-hidden border-y border-primary-500 shadow-xl relative z-20">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                        <div key={i} className="flex items-center mx-8">
                            <Star className="w-4 h-4 text-white fill-white mr-4" />
                            <span className="text-white font-black uppercase tracking-tighter text-sm italic">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why SolarAI Section */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <header className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">WHY SOLARAI?</h2>
                        <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full" />
                    </header>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {whyCards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-slate-800/20 rounded-[40px] border border-slate-700/50 hover:border-primary-500/30 transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:bg-primary-500 transition-colors`}>
                                    <card.icon className={`w-8 h-8 ${card.color} group-hover:text-white transition-colors`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{card.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    {card.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Energy Sources Section */}
            <section className="py-32 px-4 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <header className="text-center mb-20">
                        <span className="text-primary-400 font-black uppercase tracking-widest text-xs">Sustainability Outlook</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 tracking-tight">GLOBAL ENERGY SOURCES</h2>
                        <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full" />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {energySources.map((source, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-slate-800/40 rounded-[32px] overflow-hidden border border-slate-700/50 hover:border-primary-500/50 transition-all group flex flex-col h-full"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={source.image}
                                        alt={source.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${source.category === 'Renewable'
                                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                            }`}>
                                            {source.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <source.icon className={`w-5 h-5 ${source.category === 'Renewable' ? 'text-primary-400' : 'text-orange-400'}`} />
                                        <h3 className="text-xl font-bold text-white tracking-tight">{source.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                        {source.desc}
                                    </p>
                                    <Link
                                        to="/learn"
                                        className="inline-flex items-center text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors group/link"
                                    >
                                        Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary-400 font-black uppercase tracking-widest text-xs">Testimonials</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8">TRUSTED BY <br />INDUSTRY LEADERS</h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-md">
                                See how our clients are optimizing their solar portfolios using our advanced vision engine.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center p-6 bg-slate-800/40 rounded-3xl border border-slate-700/50">
                                    <h4 className="text-3xl font-black text-white">500+</h4>
                                    <p className="text-xs text-gray-500 font-bold mt-1">SITES SCANNED</p>
                                </div>
                                <div className="text-center p-6 bg-slate-800/40 rounded-3xl border border-slate-700/50">
                                    <h4 className="text-3xl font-black text-white">98%</h4>
                                    <p className="text-xs text-gray-500 font-bold mt-1">UPTIME RECORD</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="p-8 bg-slate-800/40 rounded-3xl border border-slate-700/50 relative"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                                    </div>
                                    <p className="text-xl text-white font-medium italic mb-6">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center font-black text-white">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">{t.name}</h4>
                                            <p className="text-xs text-gray-500 font-bold uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-32 px-4 bg-slate-950">
                <div className="max-w-5xl mx-auto text-center mb-20 px-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">TRANSPARENT PRICING</h2>
                    <p className="text-gray-400">Scale your inspection capabilities as your solar portfolio grows.</p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                    {/* Free Plan */}
                    <div className="p-12 bg-slate-900 rounded-[40px] border border-slate-800 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">STARTER</h3>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-6xl font-black text-white">$0</span>
                                <span className="text-gray-500 font-bold">/MO</span>
                            </div>
                            <ul className="space-y-4 mb-12">
                                {['Single image scane', 'Basic fault detection', 'Email summary', 'Mobile responsive UI'].map(li => (
                                    <li key={li} className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                                        <CheckCircle className="w-5 h-5 text-primary-500" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/inspection/start" className="block w-full text-center py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all">
                                Get Started Free
                            </Link>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-12 bg-gradient-to-br from-primary-600 to-blue-700 rounded-[40px] shadow-2xl shadow-primary-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-white/10">
                            <Zap className="w-48 h-48 rotate-12" />
                        </div>
                        <div className="relative z-10 text-white">
                            <h3 className="text-xl font-bold text-white/70 mb-2 uppercase tracking-widest">Enterprise</h3>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-6xl font-black text-white">$249</span>
                                <span className="text-white/60 font-bold">/MO</span>
                            </div>
                            <ul className="space-y-4 mb-12">
                                {['Batch drone footage scane', 'Historical plant tracking', 'PDF Report Export', 'API Access', '24/7 Expert Support'].map(li => (
                                    <li key={li} className="flex items-center gap-3 text-sm font-bold">
                                        <div className="bg-white/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-white" /></div> {li}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-white text-primary-600 font-black rounded-2xl shadow-xl hover:bg-gray-100 transition-all">
                                Go Enterprise
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
