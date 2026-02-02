import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ENERGY_DATA } from '../data/energyData';

const EnergyCategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    // Normalize category key
    const categoryKey = category.toLowerCase().replace('-', '');
    const sources = ENERGY_DATA[categoryKey] || ENERGY_DATA[category.toLowerCase()] || [];

    const pageTitle = category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
    const isRenewable = category.toLowerCase().includes('renewable') && !category.toLowerCase().includes('non');
    const headerColor = isRenewable ? 'bg-green-600' : 'bg-yellow-600';

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center text-gray-500 hover:text-blue-600 font-bold mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                        </button>
                        <h1 className="text-4xl font-black text-[#003366] tracking-tight">{pageTitle} Energy Sources</h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest mt-2">Explore the technologies powering our world</p>
                    </div>
                </header>

                {sources.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-400">No energy sources found for this category.</h2>
                        <Link to="/" className="text-blue-600 font-bold mt-4 inline-block hover:underline">Return Home</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {sources.map((source) => (
                            <Link
                                to={`/learn/detail/${source.id}`}
                                key={source.id}
                                className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={source.image}
                                        alt={source.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur shadow-sm ${isRenewable ? 'text-green-600' : 'text-orange-500'
                                            }`}>
                                            {source.title}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black text-[#003366] mb-3 group-hover:text-blue-600 transition-colors">{source.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                                        {source.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <span className={`inline-flex items-center text-sm font-black uppercase tracking-wider ${isRenewable ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            View Details <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnergyCategoryPage;
