import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';

const MainLayout: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // Get stored sidebar state from localStorage or default to true
  useEffect(() => {
    const storedState = localStorage.getItem('sidebarExpanded');
    if (storedState !== null) {
      setSidebarExpanded(storedState === 'true');
    }
    
    // Adjust for mobile on initial load
    if (window.innerWidth < 768) {
      setSidebarExpanded(false);
    }
  }, []);
  
  // Store sidebar state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', String(sidebarExpanded));
  }, [sidebarExpanded]);
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  return (
    <div className="main-layout">
      <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
      <div className={`content-with-sidebar ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;