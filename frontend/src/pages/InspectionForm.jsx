import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Calendar, MapPin, Sun, AlertCircle, Loader2, Zap, Play, Info, Sparkles, ArrowRight, X } from 'lucide-react';
import axios from 'axios';
import { useInspection } from '../context/InspectionContext';
import tutorialVideo from '../assets/videos/tutorial.mp4';

const BACKEND_URL = "https://solar-inspection-system-backend-2.onrender.com";

const SUGGESTED_CITIES = [
    "Hyderabad, Telangana", "Bangalore, Karnataka", "Mumbai, Maharashtra",
    "Delhi, NCR", "Chennai, Tamil Nadu", "Pune, Maharashtra",
    "Ahmedabad, Gujarat", "Jaipur, Rajasthan", "Surat, Gujarat",
    "Lucknow, Uttar Pradesh", "Visakhapatnam, Andhra Pradesh", "Indore, Madhya Pradesh",
    "Nagpur, Maharashtra", "Kochi, Kerala", "Patna, Bihar"
];

const InspectionForm = () => {
    const navigate = useNavigate();
    const { saveResults, saveFormData } = useInspection();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [siteType, setSiteType] = useState('Home');
    const [capacity, setCapacity] = useState('');
    const [city, setCity] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [sunlightHours, setSunlightHours] = useState(0);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    // Auto-fill capacity based on Site Type
    useEffect(() => {
        if (siteType === 'Home') setCapacity('5');
        else if (siteType === 'Commercial') setCapacity('50');
        else if (siteType === 'Utility') setCapacity('500');
    }, [siteType]);

    // Handle City Suggestions logic
    useEffect(() => {
        if (city.length >= 2) {
            const matches = SUGGESTED_CITIES.filter(c =>
                c.toLowerCase().includes(city.toLowerCase())
            );
            setCitySuggestions(matches);
            setShowSuggestions(true);
        } else {
            setCitySuggestions([]);
            setShowSuggestions(false);
        }
    }, [city]);

    useEffect(() => {
        const fetchSunlight = async () => {
            if (city && city.length >= 3 && date) {
                try {
                    const response = await axios.get(`${BACKEND_URL}/weather-info`, {
                        params: { location: city, date: date }
                    });
                    setSunlightHours(response.data.sunlight_hours);
                } catch (err) {
                    console.error("Failed to fetch sunlight hours:", err);
                }
            } else if (!city) {
                setSunlightHours(0);
            }
        };

        const timeoutId = setTimeout(fetchSunlight, 800); // Debounce to avoid too many API calls
        return () => clearTimeout(timeoutId);
    }, [city, date]);

    const handleDrag = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (selectedFile) => {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleTrySample = () => {
        setCity("Hyderabad, Telangana");
        setCapacity("15.5");
        setError('');
        // Fill a placeholder preview to show the user what image is being processed
        setPreview("https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
        alert("Demo metadata loaded! You can now see the sample image preview. Click 'RUN DIAGNOSTIC' to see how the analysis report looks.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!siteType || !capacity || !city || !date || (!file && !preview)) {
            setError('Please fill in all fields and upload an image.');
            return;
        }

        setLoading(true);

        const formDataApi = new FormData();
        // Handle case where user might have clicked "Try Demo" but didn't upload a real file
        if (file) {
            formDataApi.append('greyImage', file);
        } else if (preview && preview.startsWith('http')) {
            // For demo, we just simulate a successful response with mock data if no file is uploaded
            // In a real app, you'd fetch the URL and convert to blob
            setTimeout(() => {
                const mockResult = {
                    summary: { total_panels: 6, max_energy: 85.25, actual_daily_output: 78.42, total_daily_loss_kwh: 6.83 },
                    panel_analysis: [
                        { panel_number: 1, panel_loss_kwh: 3.42, faults: [{ fault: "Bird Drop", confidence: 0.92 }] },
                        { panel_number: 2, panel_loss_kwh: 0, faults: [] },
                        { panel_number: 3, panel_loss_kwh: 3.41, faults: [{ fault: "Dust", confidence: 0.88 }] }
                    ],
                    panel_image_url: "/static/demo_panels.jpg",
                    defect_image_url: "/static/demo_defects.jpg"
                };
                saveFormData({ site_type: siteType, capacity_kw: parseFloat(capacity), city, date, sunlight_hours: sunlightHours });
                saveResults(mockResult);
                navigate('/inspection/results');
                setLoading(false);
            }, 1500);
            return;
        }

        formDataApi.append('location', city);
        formDataApi.append('capacity', capacity);
        formDataApi.append('sunHours', sunlightHours);

        saveFormData({
            site_type: siteType,
            capacity_kw: parseFloat(capacity),
            city,
            date,
            sunlight_hours: sunlightHours
        });

        try {
            console.log("Sending analysis request to:", `${BACKEND_URL}/analyze`);
            const response = await axios.post(`${BACKEND_URL}/analyze`, formDataApi, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("Analysis successful:", response.data);
            saveResults(response.data);
            navigate('/inspection/results');
        } catch (err) {
            console.error("API Call failed:", err);
            const detail = err.response?.data?.detail || err.message;
            setError(`Analysis failed: ${detail}. Please ensure the backend server is running on port 8000.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Form Column */}
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
                    >
                        <div className="px-8 py-6 border-b border-slate-700/50 bg-slate-800/20 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">SYSTEM ANALYSIS</h2>
                                <p className="text-gray-400 text-xs mt-1 font-bold uppercase tracking-widest">Inspection Session #AI-{Math.floor(Math.random() * 9000) + 1000}</p>
                            </div>
                            <button
                                onClick={handleTrySample}
                                className="px-4 py-2 bg-primary-500/10 text-primary-400 text-xs font-bold rounded-lg border border-primary-500/20 hover:bg-primary-500/20 transition-all flex items-center"
                            >
                                <Sparkles className="w-3 h-3 mr-2" /> Try Demo Data
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center text-sm"
                                >
                                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" /> {error}
                                </motion.div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Installation Site</label>
                                    <select
                                        value={siteType}
                                        onChange={(e) => setSiteType(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none"
                                    >
                                        <option value="Home">Residential / Home</option>
                                        <option value="Commercial">Commercial / Industrial</option>
                                        <option value="Utility">Utility Scale Plant</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">System Capacity (kW)</label>
                                    <div className="relative">
                                        <Zap className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={capacity}
                                            onChange={(e) => setCapacity(e.target.value)}
                                            placeholder="e.g. 5.0"
                                            className="w-full bg-slate-900 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Project Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Start typing city..."
                                            className="w-full bg-slate-900 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                        {showSuggestions && citySuggestions.length > 0 && (
                                            <div className="absolute z-20 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                                                {citySuggestions.map((suggestion, idx) => (
                                                    <div key={idx} className="px-5 py-3 hover:bg-primary-600/20 cursor-pointer text-gray-300 text-sm transition-colors border-b border-slate-700/50 last:border-0"
                                                        onClick={() => { setCity(suggestion); setShowSuggestions(false); }}>
                                                        {suggestion}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Survey Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30 flex items-center justify-between text-sm">
                                <span className="flex items-center text-gray-400 font-medium">
                                    <Sun className="w-4 h-4 text-yellow-500 mr-2" /> Effective Sunlight Hours
                                </span>
                                <span className="text-white font-bold">{sunlightHours > 0 ? `${sunlightHours} hours` : 'Pending location'}</span>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Thermal / RGB Data Asset</label>
                                <div
                                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-[2rem] p-10 text-center transition-all ${dragActive ? 'border-primary-500 bg-primary-500/10' : preview ? 'border-primary-500 bg-primary-500/5' : 'border-slate-700 hover:border-primary-500 hover:bg-slate-800/50'}`}
                                >
                                    <input type="file" id="image-upload" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    <label htmlFor="image-upload" className="cursor-pointer block">
                                        {preview ? (
                                            <div className="relative inline-block group">
                                                <img src={preview} alt="Input Asset" className="max-h-64 mx-auto rounded-2xl shadow-2xl border border-white/10" />
                                                <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                                    <span className="bg-white text-primary-600 px-4 py-2 rounded-lg font-black text-xs shadow-xl">CHANGE FILE</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-6">
                                                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-700 group-hover:bg-primary-600/10 group-hover:border-primary-500/30 transition-all">
                                                    <Upload className="w-8 h-8 text-gray-600 group-hover:text-primary-400" />
                                                </div>
                                                <p className="text-white font-black text-lg">Drop your inspection image here</p>
                                                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">Standard Formats (Max 25MB)</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center py-5 px-8 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 rounded-2xl text-xl font-black text-white shadow-2xl shadow-primary-500/30 transition-all active:scale-[0.98] disabled:opacity-70 group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
                                        RUNNING VISION ENGINE...
                                    </>
                                ) : (
                                    <>
                                        RUN DIAGNOSTIC <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Tutorial Side Column */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl overflow-hidden relative"
                    >
                        <div className="relative z-10">
                            <h3 className="text-white font-black text-xl mb-4 flex items-center">
                                <Play className="w-5 h-5 mr-3 text-primary-400" /> LEARN HOW IT WORKS
                            </h3>
                            <div
                                onClick={() => setShowVideo(true)}
                                className="aspect-video bg-slate-900 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center p-6 relative group cursor-pointer overflow-hidden block"
                            >
                                {/* Video Thumbnail Placeholder */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-xl">
                                    <Play className="w-6 h-6 text-primary-600 fill-primary-600 ml-1" />
                                </div>
                                <p className="relative z-10 text-white font-bold text-xs mt-4 uppercase tracking-widest opacity-80">Quick Tutorial (1:20)</p>
                            </div>
                            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                                Our AI system uses complex heatmap generation to map thermal anomalies to specific photovoltaic cells.
                            </p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-600/10 blur-3xl rounded-full" />
                    </motion.div>

                    <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 space-y-6">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center">
                            <Info className="w-4 h-4 mr-2 text-primary-400" /> Tips for best results
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Ensure image covers the whole array",
                                "Aerial drone shots yield best precision",
                                "Surface should be unobstructed",
                                "Infrared data provides deeper insights"
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
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

export default InspectionForm;
