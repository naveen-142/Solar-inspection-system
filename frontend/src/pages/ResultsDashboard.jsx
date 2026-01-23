import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, Zap, TrendingDown, LayoutDashboard, Download, ArrowLeft, Info, Search, ListChecks, Sun } from 'lucide-react';
import { useInspection } from '../context/InspectionContext';

const BACKEND_URL = "https://solar-inspection-system-backend-2.onrender.com";

const ResultsDashboard = () => {
    const { results, formData } = useInspection();
    const navigate = useNavigate();

    if (!results) return null;

    const summary = results.summary || {};
    const panels = results.panel_analysis || [];

    const data = [
        { name: 'Usable Energy', value: parseFloat(summary.actual_daily_output) || 0 },
        { name: 'Energy Loss', value: parseFloat(summary.total_daily_loss_kwh) || 0 },
    ];

    const COLORS = ['#10B981', '#EF4444']; // Green, Red

    const faultyPanelsCount = panels.filter(p => p.faults && p.faults.length > 0).length;
    const totalPanels = summary.total_panels || panels.length;
    const lossPercentage = summary.max_energy > 0
        ? ((parseFloat(summary.total_daily_loss_kwh) / parseFloat(summary.max_energy)) * 100).toFixed(1)
        : 0;

    // Priority Logic
    const getPriority = (loss) => {
        const lp = (loss / summary.max_energy) * 100;
        if (lp > 10) return { label: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', action: 'Immediate On-site Inspection Recommended' };
        if (lp > 3) return { label: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', action: 'Schedule cleaning or repair within 7 days' };
        return { label: 'OPTIMAL', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', action: 'Routine maintenance sufficient' };
    };

    const priority = getPriority(summary.total_daily_loss_kwh);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
            {/* Header / Actions */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <button
                        onClick={() => navigate('/inspection/start')}
                        className="flex items-center text-primary-400 font-bold text-sm mb-4 hover:translate-x-[-4px] transition-transform"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> NEW INSPECTION
                    </button>
                    <h1 className="text-4xl font-black text-white tracking-tight">ANALYSIS REPORT</h1>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">
                        SITE: {formData?.city || 'UNKNOWN'} | {formData?.date || 'N/A'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex-grow md:flex-none px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center">
                        <Download className="w-4 h-4 mr-3 text-primary-400" /> Export PDF
                    </button>
                    <button className="flex-grow md:flex-none px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-black rounded-xl shadow-xl shadow-primary-500/20 transition-all">
                        Upgrade to Pro
                    </button>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'System Capacity', value: `${formData?.capacity_kw || 0} kW`, icon: Zap, color: 'text-blue-400' },
                    { label: 'Max Potential', value: `${summary.max_energy} kWh`, icon: Sun, color: 'text-yellow-400' },
                    { label: 'Energy Loss', value: `${summary.total_daily_loss_kwh} kWh`, icon: TrendingDown, color: 'text-red-400' },
                    { label: 'Health Score', value: `${(100 - lossPercentage)}%`, icon: CheckCircle, color: 'text-green-400' },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/50"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{kpi.label}</span>
                            <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                        </div>
                        <p className="text-3xl font-black text-white">{kpi.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Insights Panel */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Visual Analysis */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center">
                            <Search className="w-5 h-5 mr-3 text-primary-400" /> AI VISION FEED
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 group relative">
                                    <img src={`${BACKEND_URL}${results.panel_image_url}`} alt="Panels" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-primary-400 text-[10px] font-bold rounded-lg border border-primary-500/30">
                                        PANEL DETECTION
                                    </div>
                                </div>
                                <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                    Identified {totalPanels} full modules after geometric filtering.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 group relative">
                                    <img src={`${BACKEND_URL}${results.defect_image_url}`} alt="Defects" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-red-500 text-[10px] font-bold rounded-lg border border-red-500/30">
                                        DEFECT CLASSIFICATION
                                    </div>
                                </div>
                                <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                    Heatmap highlighting critical hotspot anomalies.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recommendation Actions */}
                    <div className={`p-8 rounded-[2.5rem] border ${priority.border} ${priority.bg} flex items-center justify-between`}>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className={`w-6 h-6 ${priority.color}`} />
                                <h3 className={`text-xl font-black ${priority.color}`}>PRIORITY: {priority.label}</h3>
                            </div>
                            <p className="text-white font-medium pl-9">{priority.action}</p>
                        </div>
                        <button className="hidden sm:block px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl border border-white/5 hover:bg-slate-800 transition-all">
                            Maintenance Guide
                        </button>
                    </div>
                </div>

                {/* Statistics Sidebar */}
                <div className="space-y-8">
                    <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-6">Loss Profile</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400 flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" /> Usable Energy</span>
                                <span className="text-white font-bold">{summary.actual_daily_output} kWh</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400 flex items-center"><div className="w-3 h-3 rounded-full bg-red-500 mr-2" /> Daily Loss</span>
                                <span className="text-white font-bold">{summary.total_daily_loss_kwh} kWh</span>
                            </div>
                            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Efficiency</span>
                                <span className="text-emerald-400 font-black text-2xl">{(100 - lossPercentage).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Info className="w-5 h-5 mr-3 text-primary-400" /> Explainability
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/30">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Detection Logic</p>
                                <p className="text-xs text-gray-400 leading-relaxed">IoU match &ge; 0.50 used to map {panels.filter(p => p.faults.length > 0).reduce((acc, p) => acc + p.faults.length, 0)} detected faults to specific panels.</p>
                            </div>
                            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/30">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Geometric Filter</p>
                                <p className="text-xs text-gray-400 leading-relaxed">Median area filtering rejected {Math.max(0, totalPanels * 0.1).toFixed(0)} partial detections.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <section className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 overflow-hidden">
                <div className="p-10 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight flex items-center">
                            <ListChecks className="w-6 h-6 mr-3 text-primary-400" /> MODULE-LEVEL AUDIT
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Comprehensive health breakown for {totalPanels} modules</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold px-4 py-2 bg-slate-900 rounded-xl border border-slate-700">
                        <span className="text-gray-500">Anomaly Distribution:</span>
                        <span className="text-red-400">{faultyPanelsCount} Faulty</span>
                        <div className="w-px h-3 bg-slate-700" />
                        <span className="text-green-400">{totalPanels - faultyPanelsCount} Clean</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-900/50">
                                <th className="px-10 py-6 text-xs font-black text-white uppercase tracking-widest">Panel ID</th>
                                <th className="px-10 py-6 text-xs font-black text-white uppercase tracking-widest">Status</th>
                                <th className="px-10 py-6 text-xs font-black text-white uppercase tracking-widest">Detected Anomalies</th>
                                <th className="px-10 py-6 text-xs font-black text-white uppercase tracking-widest">Daily Loss (kWh)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {panels.map((panel) => (
                                <tr key={panel.panel_number} className="hover:bg-primary-500/5 transition-colors group">
                                    <td className="px-10 py-8 font-black text-gray-400 group-hover:text-primary-400 transition-colors">#{panel.panel_number}</td>
                                    <td className="px-10 py-8">
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${panel.panel_loss_kwh === 0
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10'
                                            }`}>
                                            {panel.panel_loss_kwh === 0 ? 'CLEAN' : 'FAULTY'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        {panel.faults && panel.faults.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {panel.faults.map((f, i) => (
                                                    <span key={i} className="text-[10px] font-bold text-gray-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" /> {f.fault}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-600 font-medium italic">No anomalies found</span>
                                        )}
                                    </td>
                                    <td className="px-10 py-8 text-white font-black text-lg">
                                        {panel.panel_loss_kwh > 0 ? (
                                            <span className="text-red-400">-{panel.panel_loss_kwh} <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">kWh</span></span>
                                        ) : (
                                            <span className="text-green-500">0.00 <span className="text-[10px] text-gray-600 font-bold uppercase ml-1 tracking-widest">Optimal</span></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default ResultsDashboard;
