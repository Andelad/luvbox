import React, { useState, useEffect } from 'react';
import './CubeComponent.css';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import IsometricFace from './IsometricFace';
import TopFace from './TopFace';

// Define types for face rotation
type FaceType = 'qualities' | 'purpose' | 'time' | 'back' | 'left' | 'bottom';

// Define types for axis labels
interface AxisLabels {
  xLabels: string[];
  yLabels: (number | string)[];  // Allow both numbers and strings
  xGroupLabels: string[];
  showGroupLabels: boolean;
  xAxisTitle: string;
  yAxisTitle: string;
}

// Define the structure for dealbreaker answers stored in localStorage
interface DealbrakerAnswer {
  questionId: string;
  value: number;
}

interface UserLineValues {
  values: number[];
}

const CubeComponent: React.FC = () => {
  const [currentFace, setCurrentFace] = useState<FaceType>('qualities');
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Default values for the sliders (0-10 scale)
  const [sliderValues, setSliderValues] = useState<number[]>([5, 5, 5, 5, 5, 5, 5]);
  const [axisLabels, setAxisLabels] = useState<AxisLabels>({
    xLabels: ['Pe', 'PA', 'FC', 'SV', 'GB', 'G', 'Vi'],
    yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xGroupLabels: ['Intimacy', 'Purpose'],
    showGroupLabels: false,
    xAxisTitle: 'Characteristics',
    yAxisTitle: 'Number'
  });
  
  // Set the initial slider values (default to 5)
  useEffect(() => {
    // Check if we have stored user selections
    const userSelections = localStorage.getItem('userLineValues');
    
    if (userSelections) {
      try {
        const parsedSelections = JSON.parse(userSelections);
        if (parsedSelections.values && parsedSelections.values.length === 7) {
          // Use the stored user selections
          setSliderValues(parsedSelections.values);
        } else {
          // Default to 5 for each value
          setSliderValues([5, 5, 5, 5, 5, 5, 5]);
        }
      } catch (e) {
        console.error('Error parsing saved user selections:', e);
        setSliderValues([5, 5, 5, 5, 5, 5, 5]);
      }
    } else {
      // Default to 5 for each value
      setSliderValues([5, 5, 5, 5, 5, 5, 5]);
    }
    
    // Just update the axis labels
    setAxisLabels(prev => ({
      ...prev,
      xLabels: ['Pe', 'PA', 'FC', 'SV', 'GB', 'G', 'Vi']
    }));
  }, []);

  // Handle slider value changes and save to localStorage
  const handleValuesChange = (newValues: number[]) => {
    setSliderValues(newValues);
    
    // Save to localStorage
    const userSelection: UserLineValues = { values: newValues };
    localStorage.setItem('userLineValues', JSON.stringify(userSelection));
  };
  
  // Preset rotations for each view
  const faceRotations: Record<FaceType, { x: number, y: number }> = {
    qualities: { x: 0, y: 0 },      // Front face (Equalizer)
    purpose: { x: -90, y: 0 },      // Top face
    time: { x: 0, y: -90 },         // Right face (IsometricFace)
    back: { x: 0, y: 180 },         // Back face
    left: { x: 0, y: 90 },          // Left face
    bottom: { x: 90, y: 0 }         // Bottom face
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
        xLabels: ['Pe', 'PA', 'FC', 'SV', 'GB', 'G', 'Vi'],
        yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
        xAxisTitle: 'Characteristics',
        yAxisTitle: 'Rating'
      });
    } else if (currentFace === 'purpose') {
      setAxisLabels({
        xLabels: ['Pe', 'PA', 'FC', 'SV', 'GB', 'G', 'Vi'],
        yLabels: ['0', '20', '40', '60', '80', '100'],
        xGroupLabels: ['Intimacy', 'Purpose'],
        showGroupLabels: true,
        xAxisTitle: 'Characteristics',
        yAxisTitle: 'Years'
      });
    } else if (currentFace === 'time') {
      setAxisLabels({
        xLabels: ['0', '20', '40', '60', '80', '100'],
        yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
        xAxisTitle: 'Years',
        yAxisTitle: 'Rating'
      });
    }
    
    // Transition timer
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match transition duration
  }, [currentFace]);

  const navigateTo = (face: FaceType) => {
    if (isTransitioning) return;
    setCurrentFace(face);
  };

  return (
    <div className="cube-wrapper">
      <div className="cube-container">
        <div className="graph-plane">
          {/* Additional Axes */}
          <div className={`x-axis-top ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="axis-line"></div>
          </div>
          <div className={`y-axis-right ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="axis-line"></div>
          </div>

          {/* Y Axis */}
          <div className={`y-axis ${isTransitioning ? 'transitioning' : ''}`}>
            <div className={`axis-title ${isTransitioning ? 'transitioning' : ''}`}>{axisLabels.yAxisTitle}</div>
            <div className={`axis-labels ${isTransitioning ? 'transitioning' : ''}`}>
              {axisLabels.yLabels.map((label, index) => {
                // Calculate position as a percentage to ensure proper spacing
                // For y-axis we need to invert since 0% is at the top visually
                // and 100% is at the bottom
                const position = 100 - (index / (axisLabels.yLabels.length - 1) * 100);
                
                return (
                  <div 
                    key={`y-${index}`} 
                    className="axis-label"
                    style={{ 
                      top: `${position}%`,
                      transform: 'translateY(-50%)'
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
            <div className="axis-line"></div>
          </div>
          
          {/* X Axis */}
          <div className={`x-axis ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="axis-line"></div>
            <div className={`axis-title ${isTransitioning ? 'transitioning' : ''}`}>{axisLabels.xAxisTitle}</div>
            <div className={`axis-labels ${isTransitioning ? 'transitioning' : ''}`}>
              {axisLabels.xLabels.map((label, index) => {
                // Calculate position as a percentage to ensure proper spacing
                const position = index / (axisLabels.xLabels.length - 1) * 100;
                
                // Get the actual slider value for this position
                const value = sliderValues[index] !== undefined 
                  ? sliderValues[index].toFixed(1) 
                  : '0.0';
                
                return (
                  <div 
                    key={`x-${index}`} 
                    className="axis-label"
                    style={{ 
                      left: `${position}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div>{label}</div>
                    <div style={{ 
                      marginTop: '15px', 
                      fontSize: '0.8rem', 
                      color: '#a25a3c',
                      fontWeight: '600'
                    }}>
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Group labels for purpose view */}
            {axisLabels.showGroupLabels && (
              <div className={`group-labels ${isTransitioning ? 'transitioning' : ''}`}>
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
                <EqualizerFace 
                  values={sliderValues} 
                  onValuesChange={handleValuesChange} 
                />
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