import React, { useState, useEffect } from 'react';
import './CubeComponent.css';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import IsometricFace from './IsometricFace';
import TopFace from './TopFace';
import Header from '../common/Header';

const CubeComponent: React.FC = () => {
  const [currentFace, setCurrentFace] = useState('qualities');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [axisLabels, setAxisLabels] = useState({
    xLabels: ['Pe', 'PA', 'FV', 'Va', 'B', 'G', 'Vi'],
    yLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xGroupLabels: ['Intimacy', 'Purpose'],
    showGroupLabels: false,
    xAxisTitle: '',
    yAxisTitle: ''
  });
  
  // Preset rotations for each view
  const faceRotations = {
    qualities: { x: 0, y: 0 },      // Front face (Equalizer)
    purpose: { x: -90, y: 0 },      // Top face
    time: { x: 0, y: -90 }          // Right face (IsometricFace)
  };
  
  const [rotation, setRotation] = useState(faceRotations.qualities);

  // Update axis labels when face changes
  useEffect(() => {
    setIsTransitioning(true);
    
    // Set appropriate rotation
    setRotation(faceRotations[currentFace]);
    
    // Update axis labels based on selected face
    if (currentFace === 'qualities') {
      setAxisLabels({
        xLabels: ['Pe', 'PA', 'FV', 'Va', 'B', 'G', 'Vi'],
        yLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
        xAxisTitle: '',
        yAxisTitle: ''
      });
    } else if (currentFace === 'purpose') {
      setAxisLabels({
        xLabels: ['Pe', 'PA', 'FV', 'Va', 'B', 'G', 'Vi'],
        yLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: ['Intimacy', 'Purpose'],
        showGroupLabels: true,
        xAxisTitle: '',
        yAxisTitle: ''
      });
    } else if (currentFace === 'time') {
      setAxisLabels({
        xLabels: ['0', '20', '40', '60', '80', '100'],
        yLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
        xAxisTitle: 'Years',
        yAxisTitle: ''
      });
    }
    
    // Transition timer
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match transition duration
  }, [currentFace]);

  const navigateTo = (face: string) => {
    if (isTransitioning) return;
    setCurrentFace(face);
  };

  return (
    <div className="cube-wrapper">
      <Header />
      <div className="cube-container">
        <div className="graph-plane">
          {/* Additional Axes */}
          <div className="x-axis-top">
            <div className="axis-line"></div>
          </div>
          <div className="y-axis-right">
            <div className="axis-line"></div>
          </div>

          {/* Y Axis */}
          <div className="y-axis">
            <div className="axis-title">{axisLabels.yAxisTitle}</div>
            <div className="axis-labels">
              {axisLabels.yLabels.map((label, index) => (
                <div 
                  key={`y-${index}`} 
                  className="axis-label"
                  style={{ bottom: `${(index / (axisLabels.yLabels.length - 1)) * 100}%` }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="axis-line"></div>
          </div>
          
          {/* X Axis */}
          <div className="x-axis">
            <div className="axis-line"></div>
            <div className="axis-title">{axisLabels.xAxisTitle}</div>
            <div className="axis-labels">
              {axisLabels.xLabels.map((label, index) => (
                <div 
                  key={`x-${index}`} 
                  className="axis-label"
                  style={{ 
                    left: `${(index / (axisLabels.xLabels.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
            
            {/* Group labels for purpose view */}
            {axisLabels.showGroupLabels && (
              <div className="group-labels">
                <div 
                  className="group-label"
                  style={{ 
                    left: '21.5%', 
                    width: '43%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {axisLabels.xGroupLabels[0]}
                </div>
                <div 
                  className="group-label"
                  style={{ 
                    left: '71.5%', 
                    width: '57%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {axisLabels.xGroupLabels[1]}
                </div>
              </div>
            )}
          </div>

          {/* 3D Cube */}
          <div className="scene">
            <div 
              className="cube" 
              style={{
                transform: `translateZ(-230px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              <div className={`cube-face front ${currentFace !== 'qualities' ? 'inactive' : ''}`}>
                <EqualizerFace />
              </div>
              <div className={`cube-face right ${currentFace !== 'time' ? 'inactive' : ''}`}>
                <IsometricFace />
              </div>
              <div className={`cube-face back ${currentFace !== 'back' ? 'inactive' : ''}`}>
                <GraphFace />
              </div>
              <div className={`cube-face left ${currentFace !== 'left' ? 'inactive' : ''}`}>
                <div className="placeholder-face">Future Face</div>
              </div>
              <div className={`cube-face top ${currentFace !== 'purpose' ? 'inactive' : ''}`}>
                <TopFace />
              </div>
              <div className={`cube-face bottom ${currentFace !== 'bottom' ? 'inactive' : ''}`}>
                <div className="placeholder-face">Future Face</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons below the cube */}
        <div className="cube-navigation">
          <button 
            onClick={() => navigateTo('qualities')} 
            className={currentFace === 'qualities' ? 'active' : ''}
          >
            Qualities
          </button>
          <button 
            onClick={() => navigateTo('purpose')} 
            className={currentFace === 'purpose' ? 'active' : ''}
          >
            Purpose
          </button>
          <button 
            onClick={() => navigateTo('time')} 
            className={currentFace === 'time' ? 'active' : ''}
          >
            Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default CubeComponent;