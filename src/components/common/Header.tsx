import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="LuvNav Logo" height="40" />
          <span>LuvNav</span>
        </Link>
      </div>
      <nav className="main-nav">
        {/* You can add navigation items here later */}
      </nav>
    </header>
  );
};

export default Header;