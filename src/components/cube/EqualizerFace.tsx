import React, { useState, useRef, useEffect } from 'react';
import './CubeFaces.css';
import './EqualizerFace.css';

interface EqualizerFaceProps {
  values: number[];
  onValuesChange: (values: number[]) => void;
}

// Define the structure for dealbreaker answers stored in localStorage
interface DealbrakerAnswer {
  questionId: string;
  value: number;
}

// Define structure for user selections to store in localStorage
interface UserSelection {
  values: number[];
}

const EqualizerFace: React.FC<EqualizerFaceProps> = ({ values, onValuesChange }) => {
  // Load dealbreaker values from localStorage
  const [dealbreakerValues, setDealbreakerValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef<boolean>(false);
  
  // Initialize user line values on first mount only
  useEffect(() => {
    if (hasInitializedRef.current) {
      return; // Skip if already initialized
    }
    
    // Check if we have stored user selections
    const userSelections = localStorage.getItem('userLineValues');
    
    if (userSelections) {
      try {
        const parsedSelections: UserSelection = JSON.parse(userSelections);
        if (parsedSelections.values && parsedSelections.values.length === 7) {
          // Use the stored user selections
          onValuesChange(parsedSelections.values);
          hasInitializedRef.current = true;
          return;
        }
      } catch (e) {
        console.error('Error parsing saved user selections:', e);
      }
    }
    
    // If no valid stored selections, start with all values at 5
    onValuesChange([5, 5, 5, 5, 5, 5, 5]);
    hasInitializedRef.current = true;
  }, [onValuesChange]);
  
  // Load dealbreaker values from localStorage and respond to changes
  useEffect(() => {
    const loadDealbreakerValues = () => {
      const savedAnswers = localStorage.getItem('dealbreakers');
      if (savedAnswers) {
        try {
          const parsedAnswers: DealbrakerAnswer[] = JSON.parse(savedAnswers);
          
          // Create a mapping for the order we want to display the values
          const questionOrder = [
            'personality', 'physical', 'family', 'values', 
            'behavior', 'goals', 'viability'
          ];
          
          // Create a new array with values in the correct order
          const orderedValues = questionOrder.map(id => {
            const answer = parsedAnswers.find(a => a.questionId === id);
            return answer ? answer.value : 0; // Default to 0 if not found
          });
          
          setDealbreakerValues(orderedValues);
        } catch (e) {
          console.error('Error parsing saved dealbreaker answers:', e);
        }
      }
    };
    
    // Initial load
    loadDealbreakerValues();
    
    // Listen for changes to dealbreaker values (from settings page)
    window.addEventListener('dealbreakersChanged', loadDealbreakerValues);
    
    return () => {
      window.removeEventListener('dealbreakersChanged', loadDealbreakerValues);
    };
  }, []);
  
  // Creates SVG path data from values
  const createPath = (vals: number[]) => {
    // Generate points
    const points = vals.map((val, index) => ({
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
      
      // Convert to value (0-10)
      // SVG Y is top-down, while our values are bottom-up
      const valuePercent = Math.max(0, Math.min(1, 1 - (svgY / svgHeight)));
      const value = Math.max(0, Math.min(10, valuePercent * 10));
      
      // Update the values and notify parent
      const newValues = [...values];
      newValues[index] = value;
      onValuesChange(newValues);
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
  const isAbove = values.map((val, i) => val >= dealbreakerValues[i]);
  
  return (
    <div className="equalizer-face" style={{ width: '100%', height: '100%', padding: 0 }}>
      <div 
        ref={containerRef}
        className="equalizer-container"
        style={{ position: 'relative', height: '100%', width: '100%', padding: 0 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Vertical grid lines */}
          {values.map((_, index) => (
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
          {values.map((val, index) => {
            if (index === 0) return null; // Skip first point, no segment to draw yet
            
            const prevX = (index-1) * (100/6);
            const prevY = 100 - (values[index-1] * 10);
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
            d={createPath(values)}
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
          {values.map((val, index) => (
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