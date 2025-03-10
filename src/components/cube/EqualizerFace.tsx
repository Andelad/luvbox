import React, { useState, useRef } from 'react';
import './CubeFaces.css';
import './EqualizerFace.css';

const EqualizerFace: React.FC = () => {
  // Sample dealbreaker values (1-10 scale)
  const dealbreakerValues = [7, 6, 5, 8, 4, 4, 9];
  const [userValues, setUserValues] = useState<number[]>([...dealbreakerValues]);
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Creates SVG path data from values
  const createPath = (values: number[]) => {
    // Generate points
    const points = values.map((val, index) => ({
      x: index * (100/6),
      y: 100 - (val * 10)
    }));
    
    // Start with the first point
    let path = `M${points[0].x},${points[0].y}`;
    
    // Add the remaining points with smooth curve command
    points.slice(1).forEach(point => {
      path += ` L${point.x},${point.y}`;
    });
    
    return path;
  };

  // Handle dot dragging
  const handleDotMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDot(index);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate position relative to SVG
      const svgY = moveEvent.clientY - rect.top;
      const svgHeight = rect.height;
      
      // Convert to value (1-10)
      // SVG Y is top-down, while our values are bottom-up
      const valuePercent = Math.max(0, Math.min(1, 1 - (svgY / svgHeight)));
      const value = Math.max(1, Math.min(10, 1 + valuePercent * 9));
      
      setUserValues(prev => {
        const newValues = [...prev];
        newValues[index] = value;
        return newValues;
      });
    };
    
    const handleMouseUp = () => {
      setActiveDot(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Determine if user value is above dealbreaker at each point
  const isAbove = userValues.map((val, i) => val >= dealbreakerValues[i]);
  
  return (
    <div className="equalizer-face" style={{ width: '100%', height: '100%', padding: 0 }}>
      <div 
        ref={containerRef}
        className="equalizer-container"
        style={{ position: 'relative', height: '100%', width: '100%', padding: 0 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Vertical grid lines */}
          {userValues.map((_, index) => (
            <line
              key={`grid-line-${index}`}
              x1={index * (100/6)}
              y1="0"
              x2={index * (100/6)}
              y2="100"
              stroke="#e0e0e0"
              strokeWidth="0.5"
              opacity="0.6"
            />
          ))}
          
          {/* Draw segments with color based on comparison */}
          {userValues.map((val, index) => {
            if (index === 0) return null; // Skip first point, no segment to draw yet
            
            const prevX = (index-1) * (100/6);
            const prevY = 100 - (userValues[index-1] * 10);
            const currX = index * (100/6);
            const currY = 100 - (val * 10);
            
            const dbPrevY = 100 - (dealbreakerValues[index-1] * 10);
            const dbCurrY = 100 - (dealbreakerValues[index] * 10);
            
            // Create polygon points - connect exactly at the intersections
            let points = '';
            
            // Determine if lines intersect within this segment
            const userLine = { x1: prevX, y1: prevY, x2: currX, y2: currY };
            const dbLine = { x1: prevX, y1: dbPrevY, x2: currX, y2: dbCurrY };
            
            // Check if lines cross
            const linesCross = (prevY > dbPrevY && currY < dbCurrY) || 
                               (prevY < dbPrevY && currY > dbCurrY);
            
            if (linesCross) {
              // Calculate intersection point
              // Line equation: y = mx + b
              const userM = (currY - prevY) / (currX - prevX);
              const userB = prevY - userM * prevX;
              
              const dbM = (dbCurrY - dbPrevY) / (currX - prevX);
              const dbB = dbPrevY - dbM * prevX;
              
              // Intersection at x: userM*x + userB = dbM*x + dbB
              // x = (dbB - userB) / (userM - dbM)
              const intersectX = (dbB - userB) / (userM - dbM);
              const intersectY = userM * intersectX + userB;
              
              // Determine which parts are above/below
              if (prevY < dbPrevY) {
                // User line starts above dealbreaker, ends below
                points = `${prevX},${prevY} ${intersectX},${intersectY} ${intersectX},${intersectY} ${prevX},${dbPrevY}`;
                
                return (
                  <g key={`segment-${index}`}>
                    <polygon 
                      points={points}
                      fill="rgba(0, 128, 0, 0.2)"
                    />
                    <polygon 
                      points={`${intersectX},${intersectY} ${currX},${currY} ${currX},${dbCurrY} ${intersectX},${intersectY}`}
                      fill="rgba(255, 0, 0, 0.2)"
                    />
                  </g>
                );
              } else {
                // User line starts below dealbreaker, ends above
                return (
                  <g key={`segment-${index}`}>
                    <polygon 
                      points={`${prevX},${prevY} ${intersectX},${intersectY} ${intersectX},${intersectY} ${prevX},${dbPrevY}`}
                      fill="rgba(255, 0, 0, 0.2)"
                    />
                    <polygon 
                      points={`${intersectX},${intersectY} ${currX},${currY} ${currX},${dbCurrY} ${intersectX},${intersectY}`}
                      fill="rgba(0, 128, 0, 0.2)"
                    />
                  </g>
                );
              }
            } else {
              // No intersection, color entire segment
              points = `${prevX},${prevY} ${currX},${currY} ${currX},${dbCurrY} ${prevX},${dbPrevY}`;
              const isSegmentAbove = (prevY <= dbPrevY) && (currY <= dbCurrY);
              
              return (
                <polygon 
                  key={`segment-${index}`}
                  points={points}
                  fill={isSegmentAbove ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'}
                />
              );
            }
          })}
          
          {/* Draw the dealbreaker curved line (behind) */}
          <path
            d={createPath(dealbreakerValues)}
            stroke="#888"
            strokeWidth="1"
            strokeDasharray="2,2"
            fill="none"
            opacity="0.6"
          />
          
          {/* Draw the user's curved line (front) */}
          <path
            d={createPath(userValues)}
            stroke="#d7967b"
            strokeWidth="1.5"
            fill="none"
          />
          
          {/* Draw the dealbreaker dots */}
          {dealbreakerValues.map((val, index) => (
            <circle
              key={`db-${index}`}
              cx={index * (100/6)}
              cy={100 - (val * 10)}
              r="1.5"
              fill="#888"
              opacity="0.6"
            />
          ))}
          
          {/* Draw the draggable user dots */}
          {userValues.map((val, index) => (
            <circle
              key={`user-${index}`}
              cx={index * (100/6)}
              cy={100 - (val * 10)}
              r="3"
              fill="#d7967b"
              stroke="#fff"
              strokeWidth="1"
              style={{ cursor: 'pointer' }}
              onMouseDown={handleDotMouseDown(index)}
              className={activeDot === index ? 'active-dot' : ''}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default EqualizerFace;