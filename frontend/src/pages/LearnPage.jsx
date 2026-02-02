import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { ALL_ENERGY_SOURCES } from '../data/energyData';

const LearnPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category');

    const renewable = ALL_ENERGY_SOURCES.filter(s => s.type === 'Renewable').slice(0, 6);
    const nonRenewable = ALL_ENERGY_SOURCES.filter(s => s.type === 'Non-Renewable').slice(0, 6);

    const showRenewable = !categoryQuery || categoryQuery === 'renewable';
    const showNonRenewable = !categoryQuery || categoryQuery === 'non-renewable';

    const EnergyCard = ({ source, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
            <div className="h-48 overflow-hidden">
                <img
                    src={source.image}
                    alt={source.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#279d63] mb-3">{source.title}</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed px-2">
                    {source.desc}
                </p>
                <button
                    onClick={() => navigate(`/learn/detail/${source.id}`)}
                    className="px-6 py-2.5 bg-[#279d63] text-white text-sm font-semibold rounded-full hover:bg-[#208552] transition-all shadow-md"
                >
                    View Details →
                </button>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Renewable Energy Section */}
            {showRenewable && (
                <>
                    {/* Green Header Section */}
                    <div className="bg-gradient-to-b from-[#5cbf74] to-[#4aae66] py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center justify-center mb-6"
                            >
                                <Leaf className="w-12 h-12 text-white" />
                            </motion.div>
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                                Renewable Energy Sources
                            </h1>
                            <p className="text-white/90 text-base">
                                Clean • Sustainable • Future-Focused Energy Solutions
                            </p>
                            <div className="mt-6 w-32 h-1 bg-white/50 rounded-full mx-auto"></div>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {renewable.map((source, idx) => (
                                <EnergyCard key={source.id} source={source} delay={idx * 0.1} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-16">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#279d63] hover:text-[#279d63] transition-all"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Non-Renewable Energy Section */}
            {showNonRenewable && (
                <>
                    {/* Orange Header Section (only if showing non-renewable separately) */}
                    {categoryQuery === 'non-renewable' && (
                        <div className="bg-gradient-to-b from-orange-500 to-orange-600 py-20">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                                    Non-Renewable Energy Sources
                                </h1>
                                <p className="text-white/90 text-base">
                                    Traditional • Finite • Industrial Power
                                </p>
                                <div className="mt-6 w-32 h-1 bg-white/50 rounded-full mx-auto"></div>
                            </div>
                        </div>
                    )}

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {nonRenewable.map((source, idx) => (
                                <EnergyCard key={source.id} source={source} delay={idx * 0.1} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-16">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#279d63] hover:text-[#279d63] transition-all"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LearnPage;
