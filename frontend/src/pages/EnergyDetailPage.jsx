import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_ENERGY_SOURCES } from '../data/energyData';
import { ArrowLeft } from 'lucide-react';

const EnergyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const energy = ALL_ENERGY_SOURCES.find(item => item.id === id);

    if (!energy) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Energy Source Not Found</h2>
                    <button onClick={() => navigate('/learn')} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
                        Return
                    </button>
                </div>
            </div>
        );
    }

    const isRenewable = energy.type === 'Renewable';
    const primaryColor = isRenewable ? 'bg-[#007f3f]' : 'bg-orange-600'; // Green for renewable, Orange for non
    const borderColor = isRenewable ? 'border-green-200' : 'border-orange-200';

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* 1. Header Banner */}
            <div className={`w-full ${primaryColor} py-16 text-center text-white relative`}>
                <h1 className="text-4xl font-black mb-2">{energy.title}</h1>
                <p className="text-green-100 text-sm max-w-2xl mx-auto">{energy.desc}</p>
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-20 relative">

                {/* 2. Overlapping Image */}
                <div className="flex justify-center -mt-16 mb-12">
                    <div className="w-64 h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                        <img src={energy.image} alt={energy.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="space-y-8">
                    {/* 3. Energy Rating Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h3 className={`text-lg font-bold ${isRenewable ? 'text-green-600' : 'text-orange-600'} mb-4`}>Energy Rating</h3>
                        <div className="relative pt-2">
                            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-100">
                                <div style={{ width: `${(energy.rating / 5) * 100}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${primaryColor}`}></div>
                            </div>
                            <div className={`text-center font-bold ${isRenewable ? 'text-green-600' : 'text-orange-600'}`}>
                                Rating: {energy.rating} / 5
                            </div>
                            <p className="text-center text-xs text-gray-400 mt-2">This shows how efficient and eco-friendly the energy source is.</p>
                        </div>
                    </div>

                    {/* 4. Energy Comparison (Donut Charts) */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h3 className={`text-lg font-bold ${isRenewable ? 'text-green-600' : 'text-orange-600'} mb-8`}>Energy Comparison</h3>
                        <div className="grid md:grid-cols-2 gap-12 text-center">

                            {/* Power Efficiency */}
                            <div className="flex flex-col items-center">
                                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4"><span className="text-orange-500">⚡</span> Power Efficiency</h4>
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="56" stroke="#eee" strokeWidth="12" fill="transparent" />
                                        <circle cx="64" cy="64" r="56" stroke="#22c55e" strokeWidth="12" fill="transparent" strokeDasharray={`${energy.efficiency * 3.51} 351`} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-black text-gray-700">{energy.efficiency}</span>
                                    </div>
                                </div>
                                <p className="mt-4 font-bold text-green-600">{energy.efficiency}% Efficient</p>
                            </div>

                            {/* Environmental Impact */}
                            <div className="flex flex-col items-center">
                                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4">🌍 Environmental Impact</h4>
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="56" stroke="#eee" strokeWidth="12" fill="transparent" />
                                        <circle cx="64" cy="64" r="56" stroke="#fbbf24" strokeWidth="12" fill="transparent" strokeDasharray={`${energy.impact * 3.51} 351`} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-black text-gray-700">{energy.impact}</span>
                                    </div>
                                </div>
                                <p className="mt-4 font-bold text-amber-500">{energy.impact}/100 Impact Score</p>
                            </div>
                        </div>
                    </div>

                    {/* 5. 3-Col Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Advantages */}
                        <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                            <h4 className="text-green-700 font-bold mb-4">Advantages</h4>
                            <ul className="space-y-2">
                                {energy.pros?.map((p, i) => (
                                    <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-green-500 font-bold">•</span> {p}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Disadvantages */}
                        <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                            <h4 className="text-red-700 font-bold mb-4">Disadvantages</h4>
                            <ul className="space-y-2">
                                {energy.cons?.map((c, i) => (
                                    <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Real-World Examples */}
                        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                            <h4 className="text-blue-700 font-bold mb-4">Real-World Examples</h4>
                            <ul className="space-y-2">
                                {energy.examples?.map((e, i) => (
                                    <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-blue-500 font-bold">•</span> {e}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center mt-12">
                    <button onClick={() => navigate(-1)} className="px-8 py-2 border border-[#279d63] text-[#279d63] rounded-full hover:bg-[#279d63] hover:text-white transition-all text-sm font-bold flex items-center gap-2">
                        ← Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EnergyDetailPage;
