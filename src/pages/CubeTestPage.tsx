import React, { useState } from 'react';
import IsometricCubeTest from '../components/cube/IsometricCubeTest';
import ThreeFaceCubeTest from '../components/cube/ThreeFaceCubeTest';

const CubeTestPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'isometric' | 'three-face'>('isometric');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0e9e2' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ 
          fontFamily: 'EB Garamond, serif', 
          fontSize: '2.5rem', 
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Cube Visualization Tests
        </h1>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button 
              onClick={() => setActiveView('isometric')}
              style={{
                backgroundColor: activeView === 'isometric' ? '#a25a3c' : '#d7967b',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'background-color 0.3s ease'
              }}
            >
              Isometric View
            </button>
            <button 
              onClick={() => setActiveView('three-face')}
              style={{
                backgroundColor: activeView === 'three-face' ? '#a25a3c' : '#d7967b',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'background-color 0.3s ease'
              }}
            >
              Three-Face View
            </button>
          </div>
          
          <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
            <h2 style={{ 
              fontFamily: 'EB Garamond, serif', 
              fontSize: '1.8rem', 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {activeView === 'isometric' ? 'Isometric Cube View' : 'Three-Face Cube View'}
            </h2>
            
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              marginBottom: '2rem',
              textAlign: 'center', 
              color: '#666'
            }}>
              {activeView === 'isometric' 
                ? 'Front face is flat to the user, with right and top faces visible at 30° angles.'
                : 'All three primary faces are visible at once, with the active face highlighted.'}
            </p>
            
            {activeView === 'isometric' ? <IsometricCubeTest /> : <ThreeFaceCubeTest />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeTestPage;