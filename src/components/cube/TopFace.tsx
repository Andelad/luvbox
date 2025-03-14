import React from 'react';
import './CubeFaces.css';

const TopFace: React.FC = () => {
  return (
    <div className="top-face" style={{ 
      width: '100%', 
      height: '100%', 
      padding: 0,
      backgroundColor: '#f0e9e2', // Match equalizer face background
      border: '1px solid #666', // Match equalizer face border
      borderRadius: '6px' // Add slight border radius like equalizer face
    }}>
      <div style={{ width: '100%', height: '100%' }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Vertical graph line at 2/6ths point horizontally (33.33% from left) */}
          <line 
            x1="33.33" 
            y1="0" 
            x2="33.33" 
            y2="100" 
            stroke="#e0d9d2"
            strokeWidth="0.6"
            opacity="0.7"
          />
          
          {/* Text and line for smaller space (Intimacy) */}
          {/* First part of horizontal dashed line with left arrow */}
          <line 
            x1="2" 
            y1="50" 
            x2="12" 
            y2="50" 
            stroke="#888"
            strokeWidth="0.8"
            strokeDasharray="2,1"
          />
          <path 
            d="M2,50 L5,48 L5,52 Z" 
            fill="#888" 
          />
          
          {/* Second part of horizontal dashed line with right arrow */}
          <line 
            x1="25" 
            y1="50" 
            x2="31.33" 
            y2="50" 
            stroke="#888"
            strokeWidth="0.8"
            strokeDasharray="2,1"
          />
          <path 
            d="M31.33,50 L28.33,48 L28.33,52 Z" 
            fill="#888" 
          />
          
          {/* Intimacy text - rotated vertically */}
          <text 
            x="16.66" 
            y="50" 
            fill="#555"
            fontFamily="'EB Garamond', serif"
            fontSize="4.5"
            fontWeight="600"
            fontStyle="italic"
            textAnchor="middle"
            transform="rotate(-90, 16.66, 50)"
          >
            Intimacy
          </text>
          
          {/* Text and line for larger space (Fruit) */}
          {/* Vertical dashed line with upward arrow */}
          <line 
            x1="67" 
            y1="70" 
            x2="67" 
            y2="40" 
            stroke="#888"
            strokeWidth="0.8"
            strokeDasharray="2,1"
          />
          <path 
            d="M67,40 L65,43 L69,43 Z" 
            fill="#888" 
          />
          
          {/* Fruit text - horizontal */}
          <text 
            x="67" 
            y="55" 
            fill="#555"
            fontFamily="'EB Garamond', serif"
            fontSize="4.5"
            fontWeight="600"
            fontStyle="italic"
            textAnchor="middle"
          >
            Fruit
          </text>
        </svg>
      </div>
    </div>
  );
};

export default TopFace;
