import React, { useEffect, useState } from 'react';
import './CubeFaces.css';

interface IsoCube {
  x: number;
  y: number;
  height: number;
  color: string;
}

const IsometricFace: React.FC = () => {
  const [isoCubes, setIsoCubes] = useState<IsoCube[]>([]);
  const [hoveredCube, setHoveredCube] = useState<number | null>(null);
  
  // Generate a grid of isometric cubes with varying heights
  useEffect(() => {
    const size = 5; // 5x5 grid
    const cubes: IsoCube[] = [];
    const baseColors = ['#d7967b', '#c27b5d', '#a25a3c'];
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Create a pattern - could be relationship structure metaphor
        // Center is highest, edges are lower
        const distFromCenter = Math.sqrt(
          Math.pow((x - Math.floor(size/2)), 2) + 
          Math.pow((y - Math.floor(size/2)), 2)
        );
        
        const maxHeight = 80;
        const minHeight = 20;
        const height = Math.max(
          minHeight, 
          maxHeight - (distFromCenter * 15)
        );
        
        // Different color intensity based on height
        const colorIndex = Math.min(
          baseColors.length - 1,
          Math.floor((height - minHeight) / ((maxHeight - minHeight) / baseColors.length))
        );
        
        cubes.push({
          x,
          y,
          height,
          color: baseColors[colorIndex]
        });
      }
    }
    
    setIsoCubes(cubes);
  }, []);
  
  // Animation for the cubes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsoCubes(prev => prev.map(cube => {
        // Subtle breathing animation
        const heightVariation = Math.sin(Date.now() / 2000 + cube.x + cube.y) * 5;
        return {
          ...cube,
          height: cube.height + heightVariation
        };
      }));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCubeHover = (index: number) => {
    setHoveredCube(index);
  };
  
  const handleCubeLeave = () => {
    setHoveredCube(null);
  };
  
  return (
    <div className="isometric-face">
      <h2>Relationship Structure</h2>
      <div className="isometric-container">
        {isoCubes.map((cube, index) => {
          // Calculate position for isometric effect
          const posX = 50 + (cube.x - cube.y) * 18;
          const posY = 30 + (cube.x + cube.y) * 10;
          
          const isHovered = hoveredCube === index;
          
          return (
            <div 
              key={index}
              className="iso-cube"
              style={{
                left: `${posX}px`,
                top: `${posY}px`,
                height: `${cube.height}px`,
                zIndex: cube.x + cube.y,
                transition: 'all 0.3s ease',
                transform: isHovered 
                  ? `rotateX(45deg) rotateZ(45deg) translateY(-10px)` 
                  : `rotateX(45deg) rotateZ(45deg)`
              }}
              onMouseEnter={() => handleCubeHover(index)}
              onMouseLeave={handleCubeLeave}
            >
              <div 
                className="iso-face iso-top"
                style={{ backgroundColor: cube.color }}
              ></div>
              <div 
                className="iso-face iso-left"
                style={{ 
                  height: `${cube.height}px`,
                  backgroundColor: adjustColorBrightness(cube.color, -20) 
                }}
              ></div>
              <div 
                className="iso-face iso-right"
                style={{ 
                  height: `${cube.height}px`,
                  backgroundColor: adjustColorBrightness(cube.color, -40) 
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <p>Building meaningful connections</p>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust brightness
  const adjustR = Math.max(0, Math.min(255, r + percent));
  const adjustG = Math.max(0, Math.min(255, g + percent));
  const adjustB = Math.max(0, Math.min(255, b + percent));
  
  // Convert back to hex
  return `#${Math.round(adjustR).toString(16).padStart(2, '0')}${
    Math.round(adjustG).toString(16).padStart(2, '0')}${
    Math.round(adjustB).toString(16).padStart(2, '0')}`;
}

export default IsometricFace;