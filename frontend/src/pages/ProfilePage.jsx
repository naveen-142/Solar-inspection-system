import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Clock, TrendingUp, Calendar, ArrowLeft, LogOut, ChevronRight, Settings, Users, Activity, Filter, Search, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, userData, logout, isAdmin } = useAuth();
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [adminUsers, setAdminUsers] = useState([]);
    const [adminStats, setAdminStats] = useState({ totalUsers: 0, totalInspections: 0 });
    const navigate = useNavigate();

    // Fetch Data based on Role
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            // 1. Fetch Personal History (For everyone)
            try {
                console.log('📊 Fetching inspection history for user:', user.uid);
                const q = query(
                    collection(db, 'inspections'),
                    where('userId', '==', user.uid)
                    // Removed orderBy to avoid requiring composite index
                );
                const querySnapshot = await getDocs(q);
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ id: doc.id, ...doc.data() });
                });

                // Sort in memory instead of using Firestore orderBy
                docs.sort((a, b) => {
                    const timeA = a.createdAt?.toMillis?.() || 0;
                    const timeB = b.createdAt?.toMillis?.() || 0;
                    return timeB - timeA; // Descending order (newest first)
                });

                console.log('✅ Found', docs.length, 'inspections');
                setHistory(docs);
            } catch (err) {
                console.error('❌ Error fetching history:', err);
            } finally {
                setLoadingHistory(false);
            }

            // 2. Fetch Admin Data (Only if Admin)
            if (userData?.role === 'admin') {
                try {
                    // Fetch Users
                    const userSnapshot = await getDocs(collection(db, 'users'));
                    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setAdminUsers(userList);

                    // Fetch All Stats
                    const inspectionSnapshot = await getDocs(collection(db, 'inspections'));
                    setAdminStats({
                        totalUsers: userList.length,
                        totalInspections: inspectionSnapshot.size
                    });
                } catch (err) {
                    console.error('Admin Fetch Error:', err);
                }
            }
        };

        fetchData();
    }, [user, userData]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleRoleUpdate = async (userId, currentRole) => {
        if (!window.confirm(`Are you sure you want to change this user's role?`)) return;
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            await updateDoc(doc(db, 'users', userId), { role: newRole });
            // Update local state
            setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            console.error("Failed to update role:", err);
            alert("Failed to update user role.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">MY PROFILE</h1>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em] mt-2">
                        {userData?.role === 'admin' ? 'Administrative Control' : 'Member Settings & Activity'}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-3 bg-red-400/10 text-red-500 hover:bg-red-500/10 rounded-2xl border border-red-500/20 transition-all font-bold text-sm"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* User Info Card (Always Visible) */}
                <div className="lg:col-span-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 p-10 text-center"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary-500/20">
                            {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-2xl font-black text-white mb-1">{userData?.name || 'User Name'}</h3>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest mb-8 ${userData?.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-primary-500/10 text-primary-400 border border-primary-500/20'}`}>
                            {userData?.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            {userData?.role || 'Active Member'}
                        </div>

                        <div className="space-y-4 text-left border-t border-slate-700/50 pt-8">
                            <div className="flex items-center gap-4 text-sm">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-300 truncate">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-300">Member since {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* ADMIN VIEW */}
                    {userData?.role === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Admin Stats */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/40 p-6 rounded-[2rem] border border-slate-700/50 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Total Users</p>
                                        <p className="text-3xl font-black text-white mt-1">{adminStats.totalUsers}</p>
                                    </div>
                                    <div className="p-3 bg-primary-500/10 rounded-xl text-primary-400"><Users className="w-6 h-6" /></div>
                                </div>
                                <div className="bg-slate-800/40 p-6 rounded-[2rem] border border-slate-700/50 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Total Scans</p>
                                        <p className="text-3xl font-black text-white mt-1">{adminStats.totalInspections}</p>
                                    </div>
                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Activity className="w-6 h-6" /></div>
                                </div>
                            </div>

                            {/* User Management Table */}
                            <div className="bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 overflow-hidden">
                                <div className="p-8 border-b border-slate-700/50">
                                    <h3 className="text-xl font-black text-white">Platform Users</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-400">
                                        <thead className="bg-slate-900/50 text-[10px] uppercase tracking-widest">
                                            <tr>
                                                <th className="px-6 py-4">User</th>
                                                <th className="px-6 py-4">Role</th>
                                                <th className="px-6 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {adminUsers.map(u => (
                                                <tr key={u.id} className="hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-white">{u.name} <span className="block text-xs text-gray-500 font-normal">{u.email}</span></td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-gray-400'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={() => handleRoleUpdate(u.id, u.role)}
                                                            className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline"
                                                        >
                                                            {u.role === 'admin' ? 'Demote' : 'Make Admin'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* USER VIEW (Or Shared History for Admin) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 p-10"
                    >
                        <h3 className="text-xl font-black text-white mb-8 flex items-center">
                            <Clock className="w-5 h-5 mr-3 text-primary-400" /> {userData?.role === 'admin' ? 'MY DIAGNOSTICS' : 'RECENT DIAGNOSTICS'}
                        </h3>

                        {loadingHistory ? (
                            <div className="py-20 flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-20 px-4 bg-slate-900/30 rounded-3xl border border-dashed border-slate-700">
                                <p className="text-gray-500 font-bold mb-6">No inspection history found yet.</p>
                                <button
                                    onClick={() => navigate('/inspection')}
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-black rounded-xl transition-all"
                                >
                                    Start Your First Audit
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {history.map((item, i) => (
                                    <div
                                        key={item.id}
                                        className="group p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-primary-500/30 transition-all flex items-center justify-between cursor-pointer"
                                        onClick={() => navigate('/inspection/results', { state: { data: item.results, formData: item.metadata } })}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:bg-primary-500/10 transition-colors">
                                                <TrendingUp className="w-6 h-6 text-gray-500 group-hover:text-primary-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold group-hover:text-primary-400 transition-colors">{item.metadata?.city || 'Project Area'}</h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 font-bold mt-1 uppercase tracking-widest">
                                                    <span>{item.metadata?.date}</span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                    <span>{item.metadata?.capacity_kw} kW System</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-emerald-400 font-black text-lg">{item.results?.summary ? (100 - (item.results.summary.total_daily_loss_kwh / item.results.summary.max_energy * 100).toFixed(0)) : 0}% Health</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">Diagnostics Score</p>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-primary-400 transition-all group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
