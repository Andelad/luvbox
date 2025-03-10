import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Import logo
import logo from '../../assets/images/logo.png';

interface HeaderProps {
  showHomeLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showHomeLink = true }) => {
  return (
    <header className="app-header">
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

export default Header;