import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png'; // Correct path to logo image

interface HeaderProps {
  showHomeLink?: boolean;
  pageTitle?: string;
  parentPath?: string;
  parentTitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  showHomeLink = true, 
  pageTitle = '', 
  parentPath = '',
  parentTitle = '',
  className = ''
}) => {
  return (
    <header className={`app-header ${className}`}>
      <div className="page-title-container">
        <div className="header-logo-section">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="header-logo" />
          </Link>
          <div className="logo-divider"></div>
        </div>
        {showHomeLink ? (
          <>
            {pageTitle && (
              <div className="page-title">
                <h1 className="title-text">{pageTitle}</h1>
              </div>
            )}
            {!pageTitle && parentTitle && (
              <h1 className="page-title">
                {parentTitle}
              </h1>
            )}
          </>
        ) : (
          <h1 className="page-title">
            {pageTitle || parentTitle}
          </h1>
        )}
      </div>
    </header>
  );
};

export default Header;