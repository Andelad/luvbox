import React, { useState, useEffect } from 'react';
import './CubeComponent.css';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import IsometricFace from './IsometricFace';
import TopFace from './TopFace';

const CubeComponent: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentFace, setCurrentFace] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preset rotations for each face
  const faceRotations = [
    { x: 0, y: 0 },      // Front (Equalizer)
    { x: 0, y: -90 },    // Right (Graph)
    { x: 0, y: -180 },   // Back (Isometric)
    { x: 0, y: -270 },   // Left (placeholder for future)
    { x: -90, y: 0 },    // Top
    { x: 90, y: 0 }      // Bottom (placeholder for future)
  ];

  const navigateTo = (faceIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentFace(faceIndex);
    setRotation(faceRotations[faceIndex]);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with the CSS transition duration
  };

  return (
    <div className="cube-container">
      <div className="cube-navigation">
        <button onClick={() => navigateTo(0)} className={currentFace === 0 ? 'active' : ''}>
          Equalizer
        </button>
        <button onClick={() => navigateTo(1)} className={currentFace === 1 ? 'active' : ''}>
          Graph
        </button>
        <button onClick={() => navigateTo(2)} className={currentFace === 2 ? 'active' : ''}>
          Isometric
        </button>
        <button onClick={() => navigateTo(4)} className={currentFace === 4 ? 'active' : ''}>
          Top
        </button>
      </div>

      <div className="scene">
        <div 
          className="cube" 
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          <div className="cube-face front">
            <EqualizerFace />
          </div>
          <div className="cube-face right">
            <GraphFace />
          </div>
          <div className="cube-face back">
            <IsometricFace />
          </div>
          <div className="cube-face left">
            <div className="placeholder-face">Future Face</div>
          </div>
          <div className="cube-face top">
            <TopFace />
          </div>
          <div className="cube-face bottom">
            <div className="placeholder-face">Future Face</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeComponent;

export {};