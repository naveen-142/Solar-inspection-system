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
import { InspectionProvider } from './context/InspectionContext';

function App() {
    return (
        <InspectionProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LandingPage />} />
                        <Route path="learn" element={<LearnPage />} />
                        <Route path="inspection" element={<InspectionIntro />} />
                        <Route path="inspection/start" element={<InspectionForm />} />
                        <Route path="inspection/results" element={<ResultsDashboard />} />
                        <Route path="faq" element={<FAQChatbot />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>
                </Routes>
            </Router>
        </InspectionProvider>
    );
}

export default App;
