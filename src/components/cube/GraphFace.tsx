import React from 'react';
import './CubeFaces.css';

const GraphFace: React.FC = () => {
  // Sample data points for the relationship graph
  const dataPoints = [
    { x: 10, y: 80 },
    { x: 20, y: 50 },
    { x: 30, y: 70 },
    { x: 40, y: 40 },
    { x: 50, y: 60 },
    { x: 60, y: 30 },
    { x: 70, y: 50 },
    { x: 80, y: 20 },
    { x: 90, y: 40 }
  ];
  
  // Calculate the path for the SVG line
  const linePath = dataPoints.map((point, index) => 
    (index === 0 ? 'M' : 'L') + `${point.x} ${point.y}`
  ).join(' ');
  
  return (
    <div className="graph-face">
      <h2>Relationship Patterns</h2>
      <div className="graph-container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* X and Y axes */}
          <line x1="5" y1="95" x2="95" y2="95" stroke="#888" strokeWidth="0.5" />
          <line x1="5" y1="5" x2="5" y2="95" stroke="#888" strokeWidth="0.5" />
          
          {/* Grid lines */}
          {[0, 25, 50, 75].map(pos => (
            <React.Fragment key={pos}>
              <line x1="5" y1={95 - pos} x2="95" y2={95 - pos} stroke="#eee" strokeWidth="0.3" />
              <line x1={pos + 5} y1="5" x2={pos + 5} y2="95" stroke="#eee" strokeWidth="0.3" />
            </React.Fragment>
          ))}
          
          {/* Line graph */}
          <path d={linePath} fill="none" stroke="#d7967b" strokeWidth="1.5" />
          
          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="#a25a3c"
            />
          ))}
        </svg>
      </div>
      <p>Visualizing your connection trends</p>
    </div>
  );
};

export default GraphFace;
