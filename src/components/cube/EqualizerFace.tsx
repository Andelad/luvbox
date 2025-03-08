import React from 'react';
import './CubeFaces.css';

const EqualizerFace: React.FC = () => {
  // Sample dealbreaker values (1-10 scale)
  const dealbreakerValues = [7, 6, 5, 8, 4, 4, 9];
  
  // Create a smooth curve using SVG's built-in smooth curve command
  const createSmoothCurve = () => {
    // Generate points
    const points = dealbreakerValues.map((val, index) => ({
      x: index * (100/6),
      y: 100 - (val * 10)
    }));
    
    // Start with the first point
    let path = `M${points[0].x},${points[0].y}`;
    
    // Add the remaining points with smooth curve command
    points.slice(1).forEach(point => {
      path += ` S${point.x},${point.y} ${point.x},${point.y}`;
    });
    
    return path;
  };
  
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Draw the curved line */}
        <path
          d={createSmoothCurve()}
          stroke="#888"
          strokeWidth="1"
          strokeDasharray="2,2"
          fill="none"
        />
        
        {/* Draw the dots */}
        {dealbreakerValues.map((val, index) => (
          <circle
            key={index}
            cx={index * (100/6)}
            cy={100 - (val * 10)}
            r="2"
            fill="#666"
          />
        ))}
      </svg>
    </div>
  );
};

export default EqualizerFace;