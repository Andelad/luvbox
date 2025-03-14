import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, Header, Footer, ActionPanel, ProductPanel } from '../components/common';
import './MainLayout.css';

// Define route titles and hierarchies
const routeTitles: {[key: string]: {title: string, parent?: string}} = {
  '/map': { title: 'Mapping Love' },
  '/cube': { title: 'My Observations' },
  '/scripts': { title: 'My Scripts', parent: '/map' },
  '/self': { title: 'Myself', parent: '/map' },
  '/community': { title: 'Community' },
  '/settings': { title: 'Settings' },
  '/snapshots': { title: 'My Snapshots' },
  '/test': { title: 'Test Pages' },
  '/luvboxinfo': { title: 'The LuvBox', parent: '/map' }
};

const MainLayout: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const location = useLocation();
  
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
  
  // Determine current page title based on path
  const currentPath = location.pathname;
  const currentRoute = Object.keys(routeTitles).find(path => 
    currentPath === path || 
    (path !== '/' && currentPath.startsWith(path + '/'))
  ) || currentPath;
  
  const pageInfo = routeTitles[currentRoute] || { title: '' };
  // We'll keep parentPath for navigation purposes but won't display parentTitle
  const parentPath = pageInfo.parent || '';
  
  return (
    <div className="main-layout">
      <Header 
        showHomeLink={true} 
        pageTitle={pageInfo.title}
        parentPath={parentPath}
        className={`${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'} reduced-title`}
      />
      
      <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
      
      <div className={`content-with-sidebar ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="content-wrapper">
          <div className="main-content">
            <Outlet />
          </div>
          <div className="side-menu-container">
            <div className="side-menu">
              <h3>Page Navigation</h3>
              <div className="side-menu-content">
                {/* Side menu content will be populated by specific pages */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <ActionPanel />
      <ProductPanel 
        amazonUrl="https://www.amazon.com" 
        pdfUrl="#" 
      />
    </div>
  );
};

export default MainLayout;