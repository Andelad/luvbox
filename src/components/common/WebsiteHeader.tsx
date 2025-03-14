import React from 'react';
import { Link } from 'react-router-dom';
import './WebsiteHeader.css';
import logo from '../../assets/images/logo.png';

interface WebsiteHeaderProps {
  showHomeLink?: boolean;
}

const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({ 
  showHomeLink = true
}) => {
  return (
    <header className="website-header">
      <div className="logo-container">
        {showHomeLink ? (
          <Link to="/" className="logo-link">
            <img src={logo} alt="LuvBox Logo" className="header-logo" />
            <span className="logo-text">LuvBox 1.0</span>
          </Link>
        ) : (
          <div className="logo">
            <img src={logo} alt="LuvBox Logo" className="header-logo" />
            <span className="logo-text">LuvBox</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default WebsiteHeader;
