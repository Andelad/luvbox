import React from 'react';
import './CubeFaces.css';

const IsometricFace: React.FC = () => {
  return (
    <div className="isometric-face" style={{ 
      width: '100%', 
      height: '100%', 
      padding: 0,
      backgroundColor: '#f0e9e2', // Match equalizer face background
      border: '1px solid #666', // Match equalizer face border
      borderRadius: '6px' // Add slight border radius like equalizer face
    }}>
      <div style={{ width: '100%', height: '100%' }}>
        {/* Empty SVG to maintain the structure */}
        <svg viewBox="0 0 100 100" width="100%" height="100%">
        </svg>
      </div>
    </div>
  );
};

export default IsometricFace;