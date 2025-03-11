import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common';
import Header from '../components/common/Header';
import ActionPanel from '../components/common/ActionPanel';
import ProductPanel from '../components/common/ProductPanel';

const MainLayout: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  // Get stored sidebar state from localStorage or default to collapsed
  useEffect(() => {
    const storedState = localStorage.getItem('sidebarExpanded');
    if (storedState !== null) {
      setSidebarExpanded(storedState === 'true');
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
      <Header showHomeLink={true} />
      
      <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
      
      <div className={`content-with-sidebar ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <Outlet />
      </div>
      
      <ActionPanel />
      <ProductPanel 
        amazonUrl="https://www.amazon.com" 
        pdfUrl="#" 
      />
    </div>
  );
};

export default MainLayout;