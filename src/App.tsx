import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import CubeComponent from './components/cube'; // This imports the default export from index.ts in the cube folder
import DealbreakersForm from './components/forms/dealbreakers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cube" element={<CubeComponent />} />
        <Route path="/form/dealbreakers" element={<DealbreakersForm />} />
      </Routes>
    </Router>
  );
}

export default App;