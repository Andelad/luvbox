import React, { useState } from 'react';
import './SideMenu.css';

interface SideMenuProps {
  // Add any props you need here
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`side-menu-container ${isOpen ? 'open' : ''}`}>
      <div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="side-menu">
        {/* Side menu content */}
      </div>
    </div>
  );
};

export default SideMenu;
