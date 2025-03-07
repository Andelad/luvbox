import React from 'react';
import './CubeFaces.css';

const TopFace: React.FC = () => {
  // Sample love language data for the radar chart
  const categories = [
    { name: 'Words of Affirmation', value: 0.8 },
    { name: 'Quality Time', value: 0.9 },
    { name: 'Receiving Gifts', value: 0.6 },
    { name: 'Acts of Service', value: 0.7 },
    { name: 'Physical Touch', value: 0.85 }
  ];
  
  // Calculate points for the radar chart
  const calculateRadarPoints = () => {
    const centerX = 50;
    const centerY = 50;
    const radius = 40;
    
    return categories.map((category, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const x = centerX + radius * category.value * Math.cos(angle);
      const y = centerY + radius * category.value * Math.sin(angle);
      return { x, y };
    });
  };
  
  const radarPoints = calculateRadarPoints();
  const radarPath = radarPoints.map((point, index) => 
    (index === 0 ? 'M' : 'L') + `${point.x},${point.y}`
  ).join(' ') + 'Z';
  
  return (
    <div className="top-face">
      <h2>Love Languages</h2>
      <div className="radar-container">
        <svg viewBox="0 0 100 100">
          {/* Background circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
            <circle 
              key={scale}
              cx="50" 
              cy="50" 
              r={40 * scale} 
              fill="none" 
              stroke="#eee" 
              strokeWidth="0.5"
            />
          ))}
          
          {/* Category lines */}
          {categories.map((_, index) => {
            const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            return (
              <line 
                key={index}
                x1="50" 
                y1="50" 
                x2={x} 
                y2={y} 
                stroke="#ddd" 
                strokeWidth="0.5"
              />
            );
          })}
          
          {/* Radar area */}
          <path 
            d={radarPath} 
            fill="rgba(215, 150, 123, 0.5)" 
            stroke="#d7967b" 
            strokeWidth="2"
          />
          
          {/* Data points */}
          {radarPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#a25a3c"
            />
          ))}
          
          {/* Category labels */}
          {categories.map((category, index) => {
            const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
            const x = 50 + 48 * Math.cos(angle);
            const y = 50 + 48 * Math.sin(angle);
            return (
              <text
                key={index}
                x={x}
                y={y}
                fontSize="4"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#555"
              >
                {category.name}
              </text>
            );
          })}
        </svg>
      </div>
      <p>Understanding what speaks to your heart</p>
    </div>
  );
};

export default TopFace;
