import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInspection } from '../context/InspectionContext';
import { Upload, ArrowLeft, Calendar, MapPin, Zap, Sun } from 'lucide-react';
import axios from 'axios';
import tutorialVideo from '../assets/videos/tutorial.mp4';

const BACKEND_URL = "https://solar-inspection-system-backend-2.onrender.com";

const InspectionForm = () => {
    const navigate = useNavigate();
    const { saveResults, saveFormData } = useInspection();

    // ---------------- FORM STATE ----------------
    const [location, setLocation] = useState('Residential');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [capacity, setCapacity] = useState('5');
    const [sunHours, setSunHours] = useState('5.5');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // ⭐ FIX: CITY STATE WAS MISSING
    const [city, setCity] = useState('Hyderabad');
    const [suggestions, setSuggestions] = useState([]);

    // ---------------- AUTO CAPACITY ----------------
    useEffect(() => {
        switch (location) {
            case 'Residential': setCapacity('5'); break;
            case 'Commercial': setCapacity('50'); break;
            case 'Industrial': setCapacity('100'); break;
            default: setCapacity('5');
        }
    }, [location]);

    // ---------------- CITY AUTO-SUGGEST ----------------
    useEffect(() => {
        if (city.length < 2) return;
        const fetchCities = async () => {
            try {
                const res = await axios.get(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`
                );
                setSuggestions(res.data.results || []);
            } catch (err) {
                console.error(err);
            }
        };
        const timeout = setTimeout(fetchCities, 400);
        return () => clearTimeout(timeout);
    }, [city]);

    // ---------------- SUNLIGHT HOURS ----------------
    useEffect(() => {
        const fetchSunHours = async () => {
            if (!suggestions[0]) return;
            try {
                const { latitude, longitude } = suggestions[0];
                const res = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=sunshine_duration&timezone=auto`
                );
                const hours = (res.data.daily.sunshine_duration[0] / 3600).toFixed(2);
                setSunHours(hours);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSunHours();
    }, [suggestions, date]);



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage) return;
        setLoading(true);
        setApiError(null);

        try {
            const formData = new FormData();
            formData.append('greyImage', selectedImage); // Backend expects 'greyImage', sticking to contract
            formData.append('location', city);
            formData.append('capacity', capacity);
            formData.append('sunHours', sunHours);

            const res = await axios.post(`${BACKEND_URL}/analyze`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            saveResults(res.data);
            saveFormData({ location: city, type: location, date, capacity, sunHours });
            navigate('/inspection/results');
        } catch (err) {
            console.error(err);
            setApiError('Analysis failed. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center p-4 pt-24 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-[2rem] p-6 max-w-4xl w-full border border-white/20 shadow-2xl relative overflow-hidden"
            >
                {/* Step Bubbles */}
                <div className="flex justify-center gap-4 mb-6">
                    {['1', '2', '3'].map((step, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${i === 1 ? 'bg-white text-blue-600 border-white' : 'bg-transparent text-white border-white/40'
                            }`}>
                            {step}
                        </div>
                    ))}
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                        <span className="text-orange-400 text-3xl">✨</span> Solar Panel Input
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-4">

                        {/* Installation Type */}
                        <div>
                            <label className="flex items-center text-white font-bold mb-1 text-sm">
                                <MapPin className="w-3.5 h-3.5 mr-2 text-pink-400" /> Installation Type
                            </label>
                            <div className="relative">
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full h-10 rounded-lg px-3 bg-white text-gray-800 font-medium text-sm focus:ring-2 focus:ring-blue-300 outline-none appearance-none"
                                >
                                    <option value="Residential">Residential (Home)</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </div>
                        </div>

                        {/* City Location */}
                        <div>
                            <label className="flex items-center text-white font-bold mb-1 text-sm justify-between">
                                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2 text-green-400" /> City / Region</span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (navigator.geolocation) {
                                            navigator.geolocation.getCurrentPosition(async (position) => {
                                                try {
                                                    const { latitude, longitude } = position.coords;
                                                    // Free reverse geocoding for demo
                                                    const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                                                    if (res.data.city || res.data.locality) {
                                                        setCity(res.data.city || res.data.locality);
                                                    }
                                                } catch (err) {
                                                    console.error("Geo Error", err);
                                                    setCity("Hyderabad"); // Fallback
                                                }
                                            });
                                        }
                                    }}
                                    className="text-[10px] bg-blue-500 hover:bg-blue-400 text-white px-2 py-0.5 rounded uppercase tracking-wider font-bold transition-colors"
                                >
                                    Auto-Detect
                                </button>
                            </label>
                            <input
                                type="text"
                                list="city-suggestions"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="e.g. Hyderabad"
                                className="w-full h-10 rounded-lg px-3 bg-white text-gray-800 font-medium text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                            />
                            <datalist id="city-suggestions">
                                <option value="Hyderabad" />
                                <option value="Bangalore" />
                                <option value="Mumbai" />
                                <option value="Delhi" />
                                <option value="Chennai" />
                                <option value="Kolkata" />
                                <option value="Pune" />
                                <option value="Jaipur" />
                                <option value="Ahmedabad" />
                            </datalist>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="flex items-center text-white font-bold mb-1 text-sm">
                                <Calendar className="w-3.5 h-3.5 mr-2 text-yellow-300" /> Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-10 rounded-lg px-3 bg-white text-gray-800 font-medium text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                            />
                        </div>

                        {/* System Capacity */}
                        <div>
                            <label className="flex items-center text-white font-bold mb-1 text-sm">
                                <Zap className="w-3.5 h-3.5 mr-2 text-orange-400" /> System Capacity (kW)
                            </label>
                            <input
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="w-full h-10 rounded-lg px-3 bg-white text-gray-800 font-medium text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                            />
                        </div>

                        {/* Sun Hours */}
                        <div>
                            <label className="flex items-center text-white font-bold mb-1 text-sm">
                                <Sun className="w-3.5 h-3.5 mr-2 text-yellow-400" /> Sun Hours (Auto-Generated)
                            </label>
                            <input
                                type="number"
                                value={sunHours}
                                readOnly
                                className="w-full h-10 rounded-lg px-3 bg-blue-100 text-blue-800 font-bold text-sm focus:ring-2 focus:ring-blue-300 outline-none cursor-default"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="flex items-center text-white font-bold mb-1 text-sm">
                                <div className="w-3.5 h-3.5 mr-2 bg-green-400 rounded-sm" /> Upload Image
                            </label>
                            <div className="flex items-center gap-0 bg-white/20 rounded-lg border border-white/30 overflow-hidden h-10">
                                <label className="h-full px-4 bg-white text-black font-bold flex items-center cursor-pointer hover:bg-gray-100 transition-colors text-xs whitespace-nowrap">
                                    Choose File
                                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                </label>
                                <span className="px-3 text-white/80 text-xs truncate">
                                    {selectedImage ? selectedImage.name : 'No file chosen'}
                                </span>
                            </div>
                        </div>
                        {apiError && <p className="text-red-200 text-xs font-bold">{apiError}</p>}
                    </div>

                    {/* Right Column: Split View */}
                    <div className="space-y-4">
                        {/* Tutorial Video Section */}
                        <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 group relative">
                            <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                                How it works
                            </div>
                            <video
                                src={tutorialVideo}
                                className="w-full h-48 object-cover"
                                controls
                                controlsList="nodownload"
                            />
                        </div>

                        {/* Preview Section */}
                        <div className="bg-white/5 rounded-xl border border-white/10 h-48 flex items-center justify-center p-2 relative overflow-hidden">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                                    <div className="absolute top-2 left-2 bg-blue-500/80 px-2 py-1 rounded text-[10px] font-bold text-white shadow-sm">
                                        Scan Preview
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <p className="text-white/40 text-xs font-bold mb-2">No Image Selected</p>
                                    <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white/20 border-dashed rounded-sm" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded-lg border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!selectedImage || loading}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${selectedImage && !loading
                            ? 'bg-white text-blue-600 hover:scale-105 shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Analyzing...' : 'Analyze →'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
export default InspectionForm;
