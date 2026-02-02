import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, Shield, ArrowLeft, Search, Filter, Mail, Calendar, Trash2, Eye, X, Ban, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalInspections: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userInspections, setUserInspections] = useState([]);
    const [loadingInspections, setLoadingInspections] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Fetch Users
                const userSnapshot = await getDocs(collection(db, 'users'));
                const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(userList);

                // Fetch Stats
                const inspectionSnapshot = await getDocs(collection(db, 'inspections'));
                setStats({
                    totalUsers: userList.length,
                    totalInspections: inspectionSnapshot.size
                });
            } catch (err) {
                console.error('Admin Fetch Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleBlockUser = async (user) => {
        if (!window.confirm(`Are you sure you want to ${user.isBlocked ? 'unblock' : 'block'} ${user.name}?`)) return;

        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                isBlocked: !user.isBlocked
            });

            // Update local state
            setUsers(users.map(u => u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u));
            alert(`User ${user.name} has been ${user.isBlocked ? 'unblocked' : 'blocked'}.`);
        } catch (err) {
            console.error('Error blocking user:', err);
            alert('Failed to update user status.');
        }
    };

    const handleViewUserData = async (user) => {
        setSelectedUser(user);
        setLoadingInspections(true);
        try {
            console.log('📊 Fetching inspections for user:', user.name, user.id);
            const q = query(
                collection(db, 'inspections'),
                where('userId', '==', user.id)
                // Removed orderBy to avoid requiring composite index
            );
            const querySnapshot = await getDocs(q);
            const inspections = [];
            querySnapshot.forEach((doc) => {
                inspections.push({ id: doc.id, ...doc.data() });
            });

            // Sort in memory instead of using Firestore orderBy
            inspections.sort((a, b) => {
                const timeA = a.createdAt?.toMillis?.() || 0;
                const timeB = b.createdAt?.toMillis?.() || 0;
                return timeB - timeA; // Descending order (newest first)
            });

            console.log('✅ Found', inspections.length, 'inspections for', user.name);
            setUserInspections(inspections);
        } catch (err) {
            console.error('❌ Error fetching user inspections:', err);
            setUserInspections([]);
        } finally {
            setLoadingInspections(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">ADMIN CONTROL</h1>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em] mt-2">Platform Governance & User Management</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-2xl border border-slate-700 transition-all font-bold text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to App
                </button>
            </header>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                    { label: 'Platform Users', value: stats.totalUsers, icon: Users, color: 'text-primary-400', bg: 'bg-primary-500/10' },
                    { label: 'Total Analyses', value: stats.totalInspections, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Security Status', value: 'Active', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-700/50"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-4 ${stat.bg} rounded-2xl`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</h4>
                        <p className="text-4xl font-black text-white mt-2">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* User Management Table */}
            <section className="bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 overflow-hidden">
                <div className="p-10 border-b border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <h3 className="text-2xl font-black text-white">Registered Members</h3>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:w-64">
                            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-300 outline-none focus:border-primary-500 transition-colors"
                            />
                        </div>
                        <button className="px-5 bg-slate-900 border border-slate-800 rounded-xl text-gray-500 hover:text-white transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto text-sm text-left">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-900/50 text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                                <th className="px-10 py-6">User / Identity</th>
                                <th className="px-10 py-6">Role</th>
                                <th className="px-10 py-6">Registration Date</th>
                                <th className="px-10 py-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {loading ? (
                                <tr><td colSpan="4" className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest">Loading Member Data...</td></tr>
                            ) : users.map(user => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-primary-500/5 transition-colors cursor-pointer group"
                                    onClick={() => handleViewUserData(user)}
                                >
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black text-primary-400 group-hover:bg-primary-500/10 transition-colors">
                                                {user.name?.charAt(0) || user.email?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold group-hover:text-primary-400 transition-colors">
                                                    {user.name}
                                                </p>
                                                <p className="text-gray-500 text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'bg-slate-700/30 text-gray-400 border border-slate-700'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-gray-400 font-medium">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        {user.isBlocked && <span className="ml-3 px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-bold rounded uppercase border border-red-500/20">Blocked</span>}
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleViewUserData(user); }}
                                                className="p-2 text-gray-600 hover:text-primary-400 transition-colors"
                                                title="View user details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>

                                            {/* Block/Unblock Button */}
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleBlockUser(user); }}
                                                    className={`p-2 transition-colors ${user.isBlocked ? 'text-red-500 hover:text-green-500' : 'text-gray-600 hover:text-red-500'}`}
                                                    title={user.isBlocked ? "Unblock User" : "Block User"}
                                                >
                                                    {user.isBlocked ? <CheckCircle className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* User Data Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-white">{selectedUser.name}'s Records</h2>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-400 mt-1">{selectedUser.email}</p>
                                        <p className="text-[10px] text-gray-600 font-mono mt-0.5">ID: {selectedUser.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="p-2 hover:bg-slate-700 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                {loadingInspections ? (
                                    <p className="text-center text-gray-400 py-10">Loading inspections...</p>
                                ) : userInspections.length === 0 ? (
                                    <p className="text-center text-gray-400 py-10">No inspection records found.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {userInspections.map((inspection, idx) => (
                                            <div
                                                key={inspection.id}
                                                className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700 hover:border-primary-500/50 cursor-pointer transition-all active:scale-[0.99]"
                                                onClick={() => navigate('/inspection/results', {
                                                    state: {
                                                        data: inspection.results,
                                                        formData: inspection.metadata,
                                                        isAdminView: true
                                                    }
                                                })}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <p className="text-white font-bold">Inspection #{idx + 1}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {inspection.createdAt ? new Date(inspection.createdAt).toLocaleString() : 'N/A'}
                                                        </p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold">
                                                        Completed
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500 text-xs mb-1">Location</p>
                                                        <p className="text-white font-semibold">{inspection.metadata?.city || inspection.location || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 text-xs mb-1">Capacity</p>
                                                        <p className="text-white font-semibold">{inspection.metadata?.capacity_kw || inspection.capacity || 'N/A'} kW</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 text-xs mb-1">Panels Detected</p>
                                                        <p className="text-white font-semibold">{inspection.results?.summary?.total_panels || inspection.panelCount || 0}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 text-xs mb-1">Faults Found</p>
                                                        <p className="text-white font-semibold">{inspection.results?.summary?.total_faults || inspection.totalFaults || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
