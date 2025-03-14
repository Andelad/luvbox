import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

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
  parentTitle = '',  // Default to empty string instead of 'Mapping Love'
  className = ''
}) => {
  return (
    <header className={`app-header ${className}`}>
      <div className="page-title-container">
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