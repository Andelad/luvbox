import React, { useState, useEffect } from 'react';
import './CubeComponent.css';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import IsometricFace from './IsometricFace';
import TopFace from './TopFace';
import Header from '../common/Header';

const CubeComponent: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentFace, setCurrentFace] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [manualRotation, setManualRotation] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Preset rotations for each face
  const faceRotations = [
    { x: 0, y: 0 },      // Front (Equalizer)
    { x: 0, y: -90 },    // Right (Graph)
    { x: 0, y: -180 },   // Back (Isometric)
    { x: 0, y: -270 },   // Left (placeholder for future)
    { x: -90, y: 0 },    // Top
    { x: 90, y: 0 }      // Bottom (placeholder for future)
  ];

  // Auto-rotation effect
  useEffect(() => {
    let autoRotateInterval: NodeJS.Timeout;
    
    if (isAutoRotating) {
      autoRotateInterval = setInterval(() => {
        setManualRotation(prev => ({
          x: prev.x,
          y: prev.y - 0.2 // Slowly rotate around Y axis
        }));
      }, 50);
    }
    
    return () => {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
      }
    };
  }, [isAutoRotating]);

  // Stop auto-rotation when a face is selected
  useEffect(() => {
    if (currentFace !== null) {
      setIsAutoRotating(false);
    }
  }, [currentFace]);

  const navigateTo = (faceIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentFace(faceIndex);
    setRotation(faceRotations[faceIndex]);
    setManualRotation({ x: 0, y: 0 }); // Reset manual rotation
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with the CSS transition duration
  };

  const handleRotateControl = (direction: string) => {
    setIsAutoRotating(false);
    
    switch (direction) {
      case 'up':
        setManualRotation(prev => ({ ...prev, x: prev.x + 15 }));
        break;
      case 'right':
        setManualRotation(prev => ({ ...prev, y: prev.y - 15 }));
        break;
      case 'down':
        setManualRotation(prev => ({ ...prev, x: prev.x - 15 }));
        break;
      case 'left':
        setManualRotation(prev => ({ ...prev, y: prev.y + 15 }));
        break;
      case 'reset':
        setManualRotation({ x: 0, y: 0 });
        setCurrentFace(0);
        setRotation(faceRotations[0]);
        break;
      case 'auto':
        setIsAutoRotating(prev => !prev);
        if (!isAutoRotating) {
          setCurrentFace(null); // Set to null when auto-rotating
        }
        break;
    }
  };

  // Combine preset rotations with manual adjustments
  const finalRotation = {
    x: rotation.x + manualRotation.x,
    y: rotation.y + manualRotation.y
  };

  return (
    <div className="cube-wrapper">
      <Header />
      <div className="cube-container">
        <div className="cube-navigation">
          <button onClick={() => navigateTo(0)} className={currentFace === 0 ? 'active' : ''}>
            Emotional Intelligence
          </button>
          <button onClick={() => navigateTo(1)} className={currentFace === 1 ? 'active' : ''}>
            Relationship Patterns
          </button>
          <button onClick={() => navigateTo(2)} className={currentFace === 2 ? 'active' : ''}>
            Relationship Structure
          </button>
          <button onClick={() => navigateTo(4)} className={currentFace === 4 ? 'active' : ''}>
            Love Languages
          </button>
        </div>

        <div className="scene">
          <div 
            className="cube" 
            style={{
              transform: `translateZ(-200px) rotateX(${finalRotation.x}deg) rotateY(${finalRotation.y}deg)`
            }}
          >
            <div className={`cube-face front ${currentFace !== 0 && !isAutoRotating ? 'inactive' : ''}`}>
              <EqualizerFace />
            </div>
            <div className={`cube-face right ${currentFace !== 1 && !isAutoRotating ? 'inactive' : ''}`}>
              <GraphFace />
            </div>
            <div className={`cube-face back ${currentFace !== 2 && !isAutoRotating ? 'inactive' : ''}`}>
              <IsometricFace />
            </div>
            <div className={`cube-face left ${currentFace !== 3 && !isAutoRotating ? 'inactive' : ''}`}>
              <div className="placeholder-face">Future Face</div>
            </div>
            <div className={`cube-face top ${currentFace !== 4 && !isAutoRotating ? 'inactive' : ''}`}>
              <TopFace />
            </div>
            <div className={`cube-face bottom ${currentFace !== 5 && !isAutoRotating ? 'inactive' : ''}`}>
              <div className="placeholder-face">Future Face</div>
            </div>
          </div>
          <div className="cube-shadow"></div>
        </div>

        <div className="cube-rotation-controls">
          <div className="rotation-control" onClick={() => handleRotateControl('up')} title="Rotate Up">
            ↑
          </div>
          <div className="rotation-control" onClick={() => handleRotateControl('left')} title="Rotate Left">
            ←
          </div>
          <div className="rotation-control" onClick={() => handleRotateControl('reset')} title="Reset View">
            ⟳
          </div>
          <div className="rotation-control" onClick={() => handleRotateControl('right')} title="Rotate Right">
            →
          </div>
          <div className="rotation-control" onClick={() => handleRotateControl('down')} title="Rotate Down">
            ↓
          </div>
          <div 
            className="rotation-control" 
            onClick={() => handleRotateControl('auto')} 
            title={isAutoRotating ? "Stop Auto-Rotation" : "Start Auto-Rotation"}
            style={{ backgroundColor: isAutoRotating ? '#d7967b' : '#eee', color: isAutoRotating ? 'white' : 'black' }}
          >
            ⥁
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeComponent;