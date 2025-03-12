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

// SVG Cube Icons for navigation
const CubeIcon = ({ faceColor = 'none', onClick, isActive, label }: { 
  faceColor: 'front' | 'top' | 'right' | 'none', 
  onClick: () => void, 
  isActive: boolean,
  label: string
}) => {
  const strokeColor = "#a25a3c"; // Rust color for lines
  const fillColor = faceColor === 'none' ? '#f8f8f8' : '#f0f0f0';
  
  return (
    <div className={`cube-icon-wrapper ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="cube-icon-content">
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Proper cube proportions matching sidebar icon */}
          <g>
            <path 
              d="M12 2L2 9L12 16L22 9L12 2Z" 
              fill={faceColor === 'top' ? '#d7967b' : fillColor} 
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path 
              d="M2 9V17L12 24V16" 
              fill={faceColor === 'front' ? '#d7967b' : fillColor} 
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path 
              d="M12 16V24L22 17V9" 
              fill={faceColor === 'right' ? '#d7967b' : fillColor} 
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <span className="cube-icon-label">{label}</span>
      </div>
    </div>
  );
};

const CubeComponent: React.FC = () => {
  const [currentFace, setCurrentFace] = useState<FaceType>('qualities');
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Default values for the sliders (0-10 scale)
  const [sliderValues, setSliderValues] = useState<number[]>([5, 5, 5, 5, 5, 5, 5]);
  const [axisLabels, setAxisLabels] = useState<AxisLabels>({
    xLabels: ['Pe', 'PA', 'FV', 'Va', 'G', 'Be', 'Vi'],
    yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xGroupLabels: ['Intimacy', 'Purpose'],
    showGroupLabels: false,
    yAxisTitle: 'Rating'
  });
  
  // State for snapshot name
  const [snapshotName, setSnapshotName] = useState("My snapshot");
  
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
      xLabels: ['Pe', 'PA', 'FV', 'Va', 'G', 'Be', 'Vi']
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
        xLabels: ['Pe', 'PA', 'FV', 'Va', 'G', 'Be', 'Vi'],
        yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
        yAxisTitle: 'Rating'
      });
    } else if (currentFace === 'purpose') {
      setAxisLabels({
        xLabels: ['Pe', 'PA', 'FV', 'Va', 'G', 'Be', 'Vi'],
        yLabels: ['0', '20', '40', '60', '80', '100'],
        xGroupLabels: ['Intimacy', 'Purpose'],
        showGroupLabels: true,
        yAxisTitle: 'Years'
      });
    } else if (currentFace === 'time') {
      setAxisLabels({
        xLabels: ['0', '20', '40', '60', '80', '100'],
        yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
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

  // Take snapshot function
  const handleTakeSnapshot = () => {
    // Save current state to localStorage
    const snapshot = {
      name: snapshotName || 'Unnamed snapshot',
      values: sliderValues,
      timestamp: new Date().toISOString()
    };
    
    // Get existing snapshots or initialize empty array
    const existingSnapshots = JSON.parse(localStorage.getItem('cubeSnapshots') || '[]');
    existingSnapshots.push(snapshot);
    
    // Save updated snapshots
    localStorage.setItem('cubeSnapshots', JSON.stringify(existingSnapshots));
    
    // Provide feedback
    alert(`Snapshot "${snapshotName}" saved!`);
  };

  return (
    <div className="cube-wrapper">
      <div className="cube-container">
        {/* Cube Icons for Navigation */}
        <div className="cube-icons-navigation">
          <CubeIcon 
            faceColor="front" 
            onClick={() => navigateTo('qualities')} 
            isActive={currentFace === 'qualities'}
            label="Qualities"
          />
          <CubeIcon 
            faceColor="top" 
            onClick={() => navigateTo('purpose')} 
            isActive={currentFace === 'purpose'}
            label="Purpose"
          />
          <CubeIcon 
            faceColor="right" 
            onClick={() => navigateTo('time')} 
            isActive={currentFace === 'time'}
            label="Time"
          />
        </div>
        
        <div className="graph-plane">
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
      </div>
      
      {/* Clean interface below the cube */}
      <div className="cube-interface">
        {/* Row of labels */}
        <div className="label-row">
          {axisLabels.xLabels.map((label, index) => (
            <div key={index} className="label-column">
              <div className="axis-label-text">{label}</div>
            </div>
          ))}
        </div>
        
        {/* Category lines with labels */}
        <div className="category-lines">
          <div className="category-section chemistry">
            <div className="category-line"></div>
            <div className="category-label">Chemistry</div>
          </div>
          <div className="category-section compatibility">
            <div className="category-line"></div>
            <div className="category-label">Compatibility</div>
          </div>
          <div className="category-section viability">
            <div className="category-line"></div>
            <div className="category-label">Viability</div>
          </div>
        </div>
        
        {/* Row of input values */}
        <div className="value-row">
          {sliderValues.map((value, index) => (
            <div key={index} className="value-column">
              <input
                type="text" 
                inputMode="decimal"
                pattern="[0-9]+(\.[0-9]{1})?"
                value={value.toFixed(1)}
                onChange={(e) => {
                  const val = e.target.value;
                  // Allow only numbers with optional decimal point and 1 digit after
                  if (/^[0-9]+(\.[0-9]{0,1})?$/.test(val) || val === '') {
                    const numValue = val === '' ? 0 : parseFloat(val);
                    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
                      const newValues = [...sliderValues];
                      newValues[index] = numValue;
                      handleValuesChange(newValues);
                    }
                  }
                }}
                className="value-input"
                aria-label={`Value for ${axisLabels.xLabels[index]}`}
              />
            </div>
          ))}
        </div>
        
        {/* Name input and snapshot button */}
        <div className="controls-row">
          <div className="name-input-container">
            <label htmlFor="snapshot-name" className="name-label">Name:</label>
            <input 
              type="text" 
              id="snapshot-name" 
              className="name-input" 
              placeholder="My snapshot"
              value={snapshotName}
              onChange={(e) => setSnapshotName(e.target.value)}
            />
          </div>
          
          <button className="snapshot-button" onClick={handleTakeSnapshot}>
            Take Snapshot
          </button>
        </div>
      </div>
    </div>
  );
};

export default CubeComponent;