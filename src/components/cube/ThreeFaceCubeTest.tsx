import React, { useState, useEffect } from 'react';
import EqualizerFace from './EqualizerFace';
import GraphFace from './GraphFace';
import TopFace from './TopFace';
import IsometricFace from './IsometricFace';

// Define types for face rotation
type FaceType = 'qualities' | 'purpose' | 'time';

interface AxisLabels {
  xLabels: string[];
  yLabels: (number | string)[];
  xGroupLabels: string[];
  showGroupLabels: boolean;
  xAxisTitle: string;
  yAxisTitle: string;
}

const ThreeFaceCubeTest: React.FC = () => {
  const [currentFace, setCurrentFace] = useState<FaceType>('qualities');
  const [sliderValues, setSliderValues] = useState<number[]>([5, 5, 5, 5, 5, 5, 5]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: -15 });
  const [axisLabels, setAxisLabels] = useState<AxisLabels>({
    xLabels: ['Pe', 'PA', 'FC', 'SV', 'GB', 'G', 'Vi'],
    yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xGroupLabels: [],
    showGroupLabels: false,
    xAxisTitle: 'Characteristics',
    yAxisTitle: 'Rating'
  });
  
  // Handle slider value changes
  const handleValuesChange = (newValues: number[]) => {
    setSliderValues(newValues);
  };
  
  // Update axis labels when face changes
  useEffect(() => {
    setIsTransitioning(true);
    
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
      setRotation({ x: 15, y: -15 });
    } else if (currentFace === 'purpose') {
      setAxisLabels({
        xLabels: ['Pe', 'PA', 'FC', 'SV', 'GB', 'G', 'Vi'],
        yLabels: ['0', '20', '40', '60', '80', '100+'],
        xGroupLabels: ['Intimacy', 'Purpose'],
        showGroupLabels: true,
        xAxisTitle: 'Characteristics',
        yAxisTitle: 'My Life (yrs)'
      });
      setRotation({ x: 45, y: -15 });
    } else if (currentFace === 'time') {
      setAxisLabels({
        xLabels: ['0', '20', '40', '60', '80', '100+'],
        yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        xGroupLabels: [],
        showGroupLabels: false,
        xAxisTitle: 'My Life (yrs)',
        yAxisTitle: 'Rating'
      });
      setRotation({ x: 15, y: 45 });
    }
    
    // Transition timer
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [currentFace]);
  
  const navigateTo = (face: FaceType) => {
    if (isTransitioning) return;
    setCurrentFace(face);
  };
  
  return (
    <div className="three-face-cube-container" style={{
      width: '100%',
      height: '600px',
      position: 'relative',
      perspective: '1200px',
      marginTop: '2rem'
    }}>
      {/* Overlay Axes that move with the cube */}
      <div className="axes-container" style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#666'
        }}>
          {axisLabels.xAxisTitle}
        </div>
        <div style={{
          position: 'absolute',
          left: '60px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#666'
        }}>
          {axisLabels.yAxisTitle}
        </div>
      </div>
      
      {/* 3D Cube */}
      <div className="cube" style={{
        width: '400px',
        height: '400px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* Front face - Qualities */}
        <div className="cube-face front" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.92) 100%)',
          border: '1px solid #ddd',
          transform: 'translateZ(200px)',
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1) inset',
          opacity: isTransitioning || currentFace !== 'qualities' ? 0.7 : 1,
          transition: 'opacity 0.5s ease'
        }}>
          <EqualizerFace 
            values={sliderValues} 
            onValuesChange={handleValuesChange} 
          />
        </div>
        
        {/* Top face - Purpose */}
        <div className="cube-face top" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.92) 100%)',
          border: '1px solid #ddd',
          transform: 'rotateX(90deg) translateZ(200px)',
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1) inset',
          opacity: isTransitioning || currentFace !== 'purpose' ? 0.7 : 1,
          transition: 'opacity 0.5s ease'
        }}>
          <TopFace />
        </div>
        
        {/* Right face - Time */}
        <div className="cube-face right" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.92) 100%)',
          border: '1px solid #ddd',
          transform: 'rotateY(90deg) translateZ(200px)',
          opacity: isTransitioning || currentFace !== 'time' ? 0.7 : 1,
          transition: 'opacity 0.5s ease'
        }}>
          <IsometricFace />
        </div>
        
        {/* Left, back, and bottom faces can be added for a complete cube */}
        <div className="cube-face left" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ddd',
          transform: 'rotateY(-90deg) translateZ(200px)',
          backfaceVisibility: 'hidden',
        }}></div>
        <div className="cube-face back" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ddd',
          transform: 'rotateY(180deg) translateZ(200px)',
          backfaceVisibility: 'hidden',
        }}></div>
        <div className="cube-face bottom" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ddd',
          transform: 'rotateX(-90deg) translateZ(200px)',
          backfaceVisibility: 'hidden',
        }}></div>
      </div>
      
      {/* Navigation buttons */}
      <div className="cube-navigation" style={{
        position: 'absolute',
        bottom: '20px',
        left: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem'
      }}>
        <button 
          onClick={() => navigateTo('qualities')} 
          className={currentFace === 'qualities' ? 'active' : ''}
          style={{
            backgroundColor: currentFace === 'qualities' ? '#a25a3c' : '#d7967b',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'background-color 0.3s ease'
          }}
        >
          Qualities
        </button>
        <button 
          onClick={() => navigateTo('purpose')} 
          className={currentFace === 'purpose' ? 'active' : ''}
          style={{
            backgroundColor: currentFace === 'purpose' ? '#a25a3c' : '#d7967b',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'background-color 0.3s ease'
          }}
        >
          Purpose
        </button>
        <button 
          onClick={() => navigateTo('time')} 
          className={currentFace === 'time' ? 'active' : ''}
          style={{
            backgroundColor: currentFace === 'time' ? '#a25a3c' : '#d7967b',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'background-color 0.3s ease'
          }}
        >
          Time
        </button>
      </div>
    </div>
  );
};

export default ThreeFaceCubeTest;