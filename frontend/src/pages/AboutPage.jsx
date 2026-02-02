import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Building2, TrendingUp, Shield, Leaf } from 'lucide-react';
import myImage from '../assets/myimage.jpg';

const AboutPage = () => {
    return (
        <div className="min-h-screen font-sans bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#279d63] to-[#1a7a4a] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                            About SolarAI
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Revolutionizing Solar<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-200">
                                Energy Diagnostics
                            </span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            We combine cutting-edge artificial intelligence with deep domain expertise to help industries optimize solar panel performance, reduce downtime, and accelerate their transition to sustainable energy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-20 z-20 px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-12">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        {[
                            { label: 'Detection Accuracy', value: '98.5%', icon: Target, color: 'text-green-600' },
                            { label: 'Panels Analyzed', value: '10,000+', icon: Building2, color: 'text-blue-600' },
                            { label: 'Energy Saved', value: '4.2 GWh', icon: TrendingUp, color: 'text-orange-600' }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-3">
                                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto`} />
                                <p className="text-5xl font-black text-gray-800">{stat.value}</p>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                            <Leaf className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">Our Mission</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Making Clean Energy<br />More Reliable
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Manual solar panel inspection is slow, expensive, and prone to human error. Our AI-powered platform automates fault detection, predicts maintenance needs, and provides actionable insights that help energy providers maximize uptime and ROI.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            By combining computer vision, thermal imaging analysis, and predictive analytics, we're helping accelerate the global transition to renewable energy—one panel at a time.
                        </p>

                        {/* Key Features */}
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: Shield, label: 'Enterprise-Grade Security', color: 'bg-blue-100 text-blue-600' },
                                { icon: TrendingUp, label: 'Real-Time Analytics', color: 'bg-green-100 text-green-600' },
                                { icon: Users, label: 'Expert Support Team', color: 'bg-purple-100 text-purple-600' },
                                { icon: Target, label: '99.9% Uptime SLA', color: 'bg-orange-100 text-orange-600' }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color}`}>
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{feature.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Team Photo */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-blue-500 rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                            <div className="overflow-hidden rounded-2xl">
                                <img
                                    src={myImage}
                                    alt="SolarAI Team"
                                    className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <p className="text-white text-3xl font-black mb-1">Naveen Kumar</p>
                                    <p className="text-green-300 font-bold uppercase tracking-widest text-sm">Lead Engineer & Founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Values */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Why Choose SolarAI?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're not just another software platform—we're your strategic partner in energy optimization.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Industry Expertise',
                                desc: '10+ years of combined experience in renewable energy and AI/ML engineering',
                                icon: Users,
                                gradient: 'from-blue-500 to-blue-600'
                            },
                            {
                                title: 'Proven Results',
                                desc: 'Deployed across 50+ industrial sites with measurable energy savings and ROI',
                                icon: TrendingUp,
                                gradient: 'from-green-500 to-green-600'
                            },
                            {
                                title: 'Future-Ready',
                                desc: 'Built on scalable cloud infrastructure with continuous model improvements',
                                icon: Shield,
                                gradient: 'from-purple-500 to-purple-600'
                            }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6`}>
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-[#279d63] to-[#1a7a4a]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Optimize Your Solar Infrastructure?
                    </h2>
                    <p className="text-xl text-white/90 mb-10">
                        Join leading energy companies already using SolarAI for smarter, more profitable operations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl">
                            Schedule a Demo
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                            View Case Studies
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
