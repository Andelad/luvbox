import React, { useState, useEffect } from 'react';
import './ProductPanel.css';

// Product icons inline SVGs
const productIcons = {
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
  ),
  pdf: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
    </svg>
  ),
  expand: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  ),
  collapse: (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  ),
};

interface ProductPanelProps {
  amazonUrl?: string;
  pdfUrl?: string;
}

const ProductPanel: React.FC<ProductPanelProps> = ({ 
  amazonUrl = "https://www.amazon.com",
  pdfUrl = "#" 
}) => {
  const [expanded, setExpanded] = useState(true);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('productPanelExpanded');
    if (savedState !== null) {
      setExpanded(savedState === 'true');
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('productPanelExpanded', String(expanded));
  }, [expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`product-panel ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="product-panel-toggle" onClick={toggleExpand}>
        {expanded ? productIcons.collapse : productIcons.expand}
      </div>
      
      <div className="product-panel-content">
        <a 
          className="product-button amazon-button" 
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Buy Workbook on Amazon"
        >
          {productIcons.book}
          {expanded && <span>Buy Workbook</span>}
        </a>
        
        <a 
          className="product-button pdf-button" 
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Buy PDF Workbook"
        >
          {productIcons.pdf}
          {expanded && <span>Buy PDF Workbook</span>}
        </a>
      </div>
    </div>
  );
};

export default ProductPanel;