import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import CubeComponent from './components/cube'; // Updated import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cube" element={<CubeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
