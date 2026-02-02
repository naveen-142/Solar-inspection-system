import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import InspectionIntro from './pages/InspectionIntro';
import InspectionForm from './pages/InspectionForm';
import ResultsDashboard from './pages/ResultsDashboard';
import LearnPage from './pages/LearnPage';
import FAQChatbot from './pages/FAQChatbot';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import EnergyCategoryPage from './pages/EnergyCategoryPage';
import EnergyDetailPage from './pages/EnergyDetailPage';
import AboutPage from './pages/AboutPage';
import ProtectedRoute from './components/ProtectedRoute';
import { InspectionProvider } from './context/InspectionContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <InspectionProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<LandingPage />} />
                            <Route path="learn" element={<LearnPage />} />
                            <Route path="learn/:category" element={<EnergyCategoryPage />} />
                            <Route path="learn/detail/:id" element={<EnergyDetailPage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignupPage />} />

                            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path="admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

                            {/* Protected Routes */}
                            <Route path="inspection" element={<ProtectedRoute><InspectionIntro /></ProtectedRoute>} />
                            <Route path="inspection/start" element={<ProtectedRoute><InspectionForm /></ProtectedRoute>} />
                            <Route path="inspection/results" element={<ProtectedRoute><ResultsDashboard /></ProtectedRoute>} />

                            <Route path="faq" element={<FAQChatbot />} />
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="about" element={<AboutPage />} />
                        </Route>
                    </Routes>
                </Router>
            </InspectionProvider>
        </AuthProvider>
    );
}

export default App;
