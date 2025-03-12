import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-copyright">
          &copy; {currentYear} All Rights Reserved
        </div>
        <div className="footer-credits">
          Design by Eido
        </div>
      </div>
    </footer>
  );
};

export default Footer;