import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, Zap, TrendingDown, LayoutDashboard, Download, ArrowLeft, Info, Search, ListChecks, Sun } from 'lucide-react';
import { useInspection } from '../context/InspectionContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BACKEND_URL = "https://solar-inspection-system-backend-2.onrender.com";

const ResultsDashboard = () => {
    const { results: contextResults, formData: contextFormData } = useInspection();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const results = location.state?.data || contextResults;
    const formData = location.state?.formData || contextFormData;
    const isHistoryView = !!location.state?.data;
    const isAdminView = location.state?.isAdminView || false;

    // Auto-save inspection to Firebase when results are available (ONLY for new inspections)
    useEffect(() => {
        const saveInspection = async () => {
            // Don't save if we're viewing history or if missing data
            if (isHistoryView) {
                console.log('📜 Viewing history - skipping save');
                return;
            }

            console.log('🔍 Save check:', { hasResults: !!results, hasUser: !!user });
            if (!results || !user) {
                console.log('❌ Cannot save: missing results or user');
                return;
            }

            try {
                console.log('💾 Saving inspection data...');
                const docRef = await addDoc(collection(db, 'inspections'), {
                    userId: user.uid,
                    results: results,
                    metadata: {
                        city: formData?.location || 'Unknown',
                        date: formData?.date || new Date().toISOString().split('T')[0],
                        capacity_kw: formData?.capacity || 0,
                        sunHours: formData?.sunHours || 0,
                        type: formData?.type || 'Residential'
                    },
                    location: formData?.location || 'Unknown',
                    capacity: formData?.capacity || 0,
                    panelCount: results.summary?.total_panels || 0,
                    totalFaults: results.summary?.total_faults || 0,
                    createdAt: serverTimestamp()
                });
                console.log('✅ Inspection saved successfully! Document ID:', docRef.id);
            } catch (error) {
                console.error('❌ Error saving inspection to Firebase:', error);
            }
        };

        saveInspection();
    }, [results, formData, user]);

    // Export PDF Handler
    const handleExportPDF = async () => {
        const element = document.getElementById('report-content');
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#111827', // Ensure dark background
                useCORS: true // Handle cross-origin images
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`SolarAI_Report_${formData?.city || 'Inspection'}.pdf`);
        } catch (err) {
            console.error("PDF Export Failed:", err);
            alert("Failed to export PDF. Please try again.");
        }
    };

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
        if (lp > 10) return { label: 'CRITICAL', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', action: 'Immediate On-site Inspection Recommended' };
        if (lp > 3) return { label: 'WARNING', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', action: 'Schedule cleaning or repair within 7 days' };
        return { label: 'OPTIMAL', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', action: 'Routine maintenance sufficient' };
    };

    const priority = getPriority(summary.total_daily_loss_kwh);

    return (
        <div id="report-content" className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white">
            {/* Header */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <button
                        onClick={() => navigate('/inspection/start')}
                        className="flex items-center text-blue-300 font-bold text-sm mb-4 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> NEW INSPECTION
                    </button>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                        ANALYSIS REPORT
                    </h1>
                    <p className="text-blue-200/60 font-medium text-xs uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        SITE: {formData?.city || 'UNKNOWN'} | {formData?.date || 'N/A'}
                    </p>
                </div>
                <button
                    onClick={handleExportPDF}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center"
                >
                    <Download className="w-4 h-4 mr-3" /> Export PDF
                </button>
            </header>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* KPI Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'System Capacity', value: `${formData?.capacity || 0} kW`, icon: Zap, color: 'text-blue-400' }, ,
                        { label: 'Max Potential', value: `${summary.max_energy} kWh`, icon: Sun, color: 'text-yellow-400' },
                        { label: 'Energy Loss', value: `${summary.total_daily_loss_kwh} kWh`, icon: TrendingDown, color: 'text-red-400' },
                        { label: 'Health Score', value: `${(100 - lossPercentage).toFixed(1)}%`, icon: CheckCircle, color: 'text-green-400' },
                    ].map((kpi, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">{kpi.label}</span>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <p className="text-3xl font-black text-white">{kpi.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Visual Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
                            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                                <Search className="w-5 h-5 mr-3 text-blue-400" /> AI Vision Feed
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10 relative group">
                                        <img src={results.panel_image_url} alt="Panels" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur text-blue-400 text-[10px] font-bold rounded-lg border border-blue-400/30">
                                            PANEL DETECTION
                                        </div>
                                    </div>
                                    <p className="text-center text-[10px] text-blue-200/50 uppercase tracking-widest">
                                        {totalPanels} Modules Identified
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10 relative group">
                                        <img src={results.defect_image_url} alt="Defects" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur text-red-400 text-[10px] font-bold rounded-lg border border-red-400/30">
                                            DEFECT MAP
                                        </div>
                                    </div>
                                    <p className="text-center text-[10px] text-blue-200/50 uppercase tracking-widest">
                                        Heatmap Analysis
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Card */}
                        <div className={`p-8 rounded-[2rem] border backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg ${priority.label === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30' :
                            priority.label === 'WARNING' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                'bg-green-500/10 border-green-500/30'
                            }`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${priority.label === 'CRITICAL' ? 'bg-red-500/20' :
                                    priority.label === 'WARNING' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                                    }`}>
                                    <AlertTriangle className={`w-6 h-6 ${priority.label === 'CRITICAL' ? 'text-red-400' :
                                        priority.label === 'WARNING' ? 'text-yellow-400' : 'text-green-400'
                                        }`} />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-black tracking-wide ${priority.label === 'CRITICAL' ? 'text-red-400' :
                                        priority.label === 'WARNING' ? 'text-yellow-400' : 'text-green-400'
                                        }`}>
                                        PRIORITY: {priority.label}
                                    </h3>
                                    <p className="text-white/80 text-sm font-medium">{priority.action}</p>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                                View Guide
                            </button>
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-xl h-full flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-8 text-white text-center">Loss Profile</h3>
                            <div className="h-48 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            <Cell fill="#10B981" />
                                            <Cell fill="#EF4444" />
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-black text-white">{(100 - lossPercentage).toFixed(0)}%</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Efficiency</span>
                                </div>
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                                    <span className="text-gray-400 flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2" /> Usable</span>
                                    <span className="font-bold text-white">{summary.actual_daily_output} kWh</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2" /> Loss</span>
                                    <span className="font-bold text-white">{summary.total_daily_loss_kwh} kWh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audit Table */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5">
                        <h3 className="text-xl font-bold flex items-center text-white">
                            <ListChecks className="w-5 h-5 mr-3 text-blue-400" /> Module Audit
                        </h3>
                        <div className="flex gap-4 text-xs font-bold bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                            <span className="text-red-400">{faultyPanelsCount} Issues</span>
                            <span className="text-white/20">|</span>
                            <span className="text-green-400">{totalPanels - faultyPanelsCount} Optimal</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-xs text-blue-200 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-4 font-bold">Panel ID</th>
                                    <th className="px-8 py-4 font-bold">Status</th>
                                    <th className="px-8 py-4 font-bold">Anomalies</th>
                                    <th className="px-8 py-4 font-bold">Loss</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                {panels.map((panel) => (
                                    <tr key={panel.panel_number} className="hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-4 font-mono text-blue-300">#{panel.panel_number}</td>
                                        <td className="px-8 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${panel.panel_loss_kwh === 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                {panel.panel_loss_kwh === 0 ? 'Clean' : 'Faulty'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            {panel.faults?.length > 0 ? (
                                                <div className="flex gap-2">
                                                    {panel.faults.map((f, i) => (
                                                        <span key={i} className="px-2 py-1 bg-white/10 rounded-md text-xs border border-white/10 flex items-center">
                                                            {f.fault}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : <span className="text-white/20 italic">None</span>}
                                        </td>
                                        <td className="px-8 py-4 font-bold text-white">
                                            {panel.panel_loss_kwh > 0 ?
                                                <span className="text-red-400">-{panel.panel_loss_kwh} kWh</span> :
                                                <span className="text-green-400">0.00</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ResultsDashboard;
