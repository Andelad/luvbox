import React, { useState, useEffect } from 'react';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import TopFace from './TopFace';
import IsometricFace from './IsometricFace';

// Define types for face rotation
type FaceType = 'qualities' | 'purpose' | 'time';

// Styles for the isometric cube test with the new projection style
const styles = {
  container: {
    width: '100%',
    height: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    margin: '2rem auto',
  },
  cubeWrapper: {
    width: '400px',
    height: '400px',
    position: 'relative' as const,
    transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  face: {
    position: 'absolute' as const,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #ddd',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1) inset',
    boxSizing: 'border-box' as const,
    transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  // Front face is always flat to the viewer when selected
  front: {
    width: '100%',
    height: '100%',
    zIndex: 3,
    transform: 'translateZ(0)',
  },
  // Top face extends at 45 degrees upward, with 50% truncated height
  top: {
    width: '100%',
    height: '50%',
    transformOrigin: 'top',
    transform: 'rotateX(-45deg)',
    zIndex: 2,
  },
  // Right face extends at 45 degrees to the right, with 50% truncated width
  right: {
    width: '50%',
    height: '100%',
    transformOrigin: 'right',
    transform: 'rotateY(-45deg)',
    zIndex: 1,
  },
  // When not selected, faces have reduced opacity and different positions
  notSelected: {
    opacity: 0.7,
  },
  // Navigation buttons
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  button: {
    backgroundColor: '#d7967b',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 600,
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease',
  },
  activeButton: {
    backgroundColor: '#a25a3c',
  }
};

const IsometricCubeTest: React.FC = () => {
  const [currentFace, setCurrentFace] = useState<FaceType>('qualities');
  const [sliderValues, setSliderValues] = useState<number[]>([5, 5, 5, 5, 5, 5, 5]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle slider value changes
  const handleValuesChange = (newValues: number[]) => {
    setSliderValues(newValues);
  };
  
  // Get position styles for each face based on the currently selected face
  const getFaceStyles = (face: FaceType) => {
    const baseStyles = { ...styles.face };

    if (face === currentFace) {
      // Selected face positioning
      switch (face) {
        case 'qualities':
          return { 
            ...baseStyles, 
            ...styles.front,
            top: 0,
            left: 0
          };
        case 'purpose':
          return { 
            ...baseStyles, 
            ...styles.front,
            top: 0,
            left: 0
          };
        case 'time':
          return { 
            ...baseStyles, 
            ...styles.front,
            top: 0,
            left: 0
          };
      }
    } else {
      // Non-selected face positioning depends on which face is currently selected
      switch (face) {
        case 'qualities':
          return { 
            ...baseStyles, 
            ...styles.notSelected,
            // When purpose is selected, qualities goes to bottom
            ...(currentFace === 'purpose' ? {
              ...styles.front,
              top: '150%',
              left: 0,
              zIndex: 1
            } : 
            // When time is selected, qualities goes to left
            {
              ...styles.front,
              top: 0,
              left: '-50%',
              zIndex: 1
            })
          };
        case 'purpose':
          return { 
            ...baseStyles, 
            ...styles.notSelected,
            // When qualities is selected, purpose is on top at 45°
            ...(currentFace === 'qualities' ? {
              ...styles.top,
              top: '-50%',
              left: 0
            } : 
            // When time is selected, purpose goes to top left
            {
              ...styles.front,
              top: '-50%',
              left: '-50%',
              zIndex: 1
            })
          };
        case 'time':
          return { 
            ...baseStyles, 
            ...styles.notSelected,
            // When qualities is selected, time is on right at 45°
            ...(currentFace === 'qualities' ? {
              ...styles.right,
              top: 0,
              left: '100%'
            } : 
            // When purpose is selected, time goes to bottom right
            {
              ...styles.front,
              top: '150%',
              left: '150%',
              zIndex: 1
            })
          };
      }
    }
  };
  
  const navigateTo = (face: FaceType) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentFace(face);
    
    // Set transition timer
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.cubeWrapper}>
        {/* Front face - Equalizer */}
        <div style={getFaceStyles('qualities')}>
          <EqualizerFace 
            values={sliderValues} 
            onValuesChange={handleValuesChange} 
          />
        </div>
        
        {/* Top face - Purpose */}
        <div style={getFaceStyles('purpose')}>
          <TopFace />
        </div>
        
        {/* Right face - Time */}
        <div style={getFaceStyles('time')}>
          <IsometricFace />
        </div>
      </div>
      
      <div style={styles.navigation}>
        <button 
          style={{
            ...styles.button,
            ...(currentFace === 'qualities' ? styles.activeButton : {})
          }}
          onClick={() => navigateTo('qualities')}
        >
          Qualities
        </button>
        <button 
          style={{
            ...styles.button,
            ...(currentFace === 'purpose' ? styles.activeButton : {})
          }}
          onClick={() => navigateTo('purpose')}
        >
          Purpose
        </button>
        <button 
          style={{
            ...styles.button,
            ...(currentFace === 'time' ? styles.activeButton : {})
          }}
          onClick={() => navigateTo('time')}
        >
          Time
        </button>
      </div>
    </div>
  );
};

export default IsometricCubeTest;