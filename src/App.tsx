import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './store/UserContext';
import LandingPage from './pages/landing/LandingPage';
import CubeComponent from './components/cube';
import DealbreakersForm from './components/forms/dealbreakers';
import NarrativeRankingForm from './components/forms/narratives';
import MainLayout from './layouts/MainLayout';
import { ScriptsPage, SelfPage, CommunityPage, SettingsPage } from './pages/placeholder/PlaceholderPages';
import CubeTestPage from './pages/CubeTestPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes outside of main layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/form/dealbreakers" element={<DealbreakersForm />} />
          <Route path="/form/narratives" element={<NarrativeRankingForm />} />
          <Route path="/cube-test" element={<CubeTestPage />} />
          
          {/* Routes with sidebar layout */}
          <Route element={<MainLayout />}>
            <Route path="/cube" element={<CubeComponent />} />
            <Route path="/scripts" element={<ScriptsPage />} />
            <Route path="/self" element={<SelfPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          {/* Redirect any other path to the landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;