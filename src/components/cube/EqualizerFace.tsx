import React, { useState, useEffect } from 'react';
import './CubeFaces.css';

const EqualizerFace: React.FC = () => {
  const [bars, setBars] = useState<number[]>([]);
  
  // Generate random heights for equalizer bars
  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from({ length: 20 }, () => 
        Math.floor(Math.random() * 80) + 20
      );
      setBars(newBars);
    };
    
    generateBars();
    const interval = setInterval(generateBars, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="equalizer-face">
      <h2>Emotional Intelligence</h2>
      <div className="equalizer-container">
        {bars.map((height, index) => (
          <div 
            key={index} 
            className="equalizer-bar"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p>Understanding your emotional landscape</p>
    </div>
  );
};

export default EqualizerFace;
