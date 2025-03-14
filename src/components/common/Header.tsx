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
  parentTitle = 'Mapping Love',
  className = ''
}) => {
  return (
    <header className={`app-header ${className}`}>
      <div className="page-title-container">
        {showHomeLink ? (
          <>
            {parentTitle && pageTitle && (
              <h1 className="page-breadcrumb">
                <Link to={parentPath || '/map'} className="parent-link">
                  {parentTitle}
                </Link>
                <span className="breadcrumb-separator">/</span>
                <span className="current-page">{pageTitle}</span>
              </h1>
            )}
            {!pageTitle && (
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