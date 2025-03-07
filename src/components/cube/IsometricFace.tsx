import React from 'react';
import './CubeFaces.css';

const IsometricFace: React.FC = () => {
  // Generate a 5x5 grid of isometric cubes
  const renderIsometricGrid = () => {
    const grid = [];
    const size = 5;
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Calculate position for isometric effect
        const posX = 50 + (x - y) * 15;
        const posY = 30 + (x + y) * 7.5;
        
        // Height varies based on position (for visual effect)
        const height = Math.floor(Math.sin((x/size) * Math.PI) * Math.cos((y/size) * Math.PI) * 30) + 30;
        
        grid.push(
          <div 
            key={`${x}-${y}`}
            className="iso-cube"
            style={{
              left: `${posX}px`,
              top: `${posY}px`,
              height: `${height}px`,
              zIndex: x + y
            }}
          >
            <div className="iso-face iso-top"></div>
            <div className="iso-face iso-left"></div>
            <div className="iso-face iso-right"></div>
          </div>
        );
      }
    }
    
    return grid;
  };
  
  return (
    <div className="isometric-face">
      <h2>Relationship Structure</h2>
      <div className="isometric-container">
        {renderIsometricGrid()}
      </div>
      <p>Building meaningful connections</p>
    </div>
  );
};

export default IsometricFace;
