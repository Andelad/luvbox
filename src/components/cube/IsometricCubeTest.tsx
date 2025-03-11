import React, { useState } from 'react';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import TopFace from './TopFace';
import IsometricFace from './IsometricFace';

// Define types for face rotation
type FaceType = 'qualities' | 'purpose' | 'time';

// Styles for the isometric cube test
const styles = {
  container: {
    width: '100%',
    height: '500px',
    perspective: '1200px',
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
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  face: {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #ddd',
    backfaceVisibility: 'hidden' as const,
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1) inset',
    boxSizing: 'border-box' as const,
  },
  front: {
    transform: 'rotateY(0deg) translateZ(200px)',
  },
  right: {
    transform: 'rotateY(30deg) translateZ(173.2px) translateX(173.2px)',
  },
  top: {
    transform: 'rotateX(-30deg) translateZ(173.2px) translateY(-173.2px)',
  },
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
  
  // Define rotations for the isometric view transitions
  const getTransform = () => {
    switch(currentFace) {
      case 'qualities':
        return 'rotateX(0deg) rotateY(0deg)';
      case 'purpose':
        return 'rotateX(-30deg) rotateY(0deg)';
      case 'time':
        return 'rotateX(0deg) rotateY(30deg)';
      default:
        return 'rotateX(0deg) rotateY(0deg)';
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
      <div 
        style={{
          ...styles.cubeWrapper,
          transform: getTransform(),
        }}
      >
        {/* Front face - Equalizer */}
        <div style={{...styles.face, ...styles.front}}>
          <EqualizerFace 
            values={sliderValues} 
            onValuesChange={handleValuesChange} 
          />
        </div>
        
        {/* Right face - Time */}
        <div style={{...styles.face, ...styles.right}}>
          <IsometricFace />
        </div>
        
        {/* Top face - Purpose */}
        <div style={{...styles.face, ...styles.top}}>
          <TopFace />
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