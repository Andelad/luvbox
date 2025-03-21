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
  
  // Function to render segments with proper coloring
  const renderSegments = () => {
    const segments: JSX.Element[] = [];
    
    // For each pair of points
    for (let i = 1; i < values.length; i++) {
      const prevIndex = i - 1;
      const currIndex = i;
      
      // User line coordinates (flipped Y axis since SVG Y is top-down)
      const prevX = prevIndex * (100/6);
      const prevY = 100 - (values[prevIndex] * 10);
      const currX = currIndex * (100/6);
      const currY = 100 - (values[currIndex] * 10);
      
      // Dealbreaker line coordinates
      const dbPrevY = 100 - (dealbreakerValues[prevIndex] * 10);
      const dbCurrY = 100 - (dealbreakerValues[currIndex] * 10);
      
      // Check if both user points are above dealbreaker line
      const prevPointAbove = prevY <= dbPrevY;
      const currPointAbove = currY <= dbCurrY;
      
      // If both points are on same side of dealbreaker line, render a simple polygon
      if ((prevPointAbove && currPointAbove) || (!prevPointAbove && !currPointAbove)) {
        const isAbove = prevPointAbove && currPointAbove;
        segments.push(
          <polygon 
            key={`segment-${i}`}
            points={`${prevX},${prevY} ${currX},${currY} ${currX},${dbCurrY} ${prevX},${dbPrevY}`}
            fill={isAbove ? 'rgba(169, 183, 146, 0.8)' : 'rgba(230, 180, 180, 0.6)'}
            stroke={isAbove ? 'rgba(169, 183, 146, 0.9)' : 'rgba(220, 170, 170, 0.7)'}
            strokeWidth="0.5"
          />
        );
      } 
      // If the line crosses the dealbreaker line
      else {
        // Calculate intersection point
        // Line equation: y = mx + b
        const userM = (currY - prevY) / (currX - prevX);
        const userB = prevY - userM * prevX;
        
        const dbM = (dbCurrY - dbPrevY) / (currX - prevX);
        const dbB = dbPrevY - dbM * prevX;
        
        // Intersection at x: userM*x + userB = dbM*x + dbB
        const intersectX = (dbB - userB) / (userM - dbM);
        const intersectY = userM * intersectX + userB;
        
        // Y-coordinate on dealbreaker line at intersection x
        const dbIntersectY = dbM * (intersectX - prevX) + dbPrevY;
        
        // First segment: from prev point to intersection
        segments.push(
          <polygon 
            key={`segment-${i}-1`}
            points={`${prevX},${prevY} ${intersectX},${intersectY} ${intersectX},${dbIntersectY} ${prevX},${dbPrevY}`}
            fill={prevPointAbove ? 'rgba(169, 183, 146, 0.8)' : 'rgba(230, 180, 180, 0.6)'}
            stroke={prevPointAbove ? 'rgba(169, 183, 146, 0.9)' : 'rgba(220, 170, 170, 0.7)'}
            strokeWidth="0.5"
          />
        );
        
        // Second segment: from intersection to current point
        segments.push(
          <polygon 
            key={`segment-${i}-2`}
            points={`${intersectX},${intersectY} ${currX},${currY} ${currX},${dbCurrY} ${intersectX},${dbIntersectY}`}
            fill={currPointAbove ? 'rgba(169, 183, 146, 0.8)' : 'rgba(230, 180, 180, 0.6)'}
            stroke={currPointAbove ? 'rgba(169, 183, 146, 0.9)' : 'rgba(220, 170, 170, 0.7)'}
            strokeWidth="0.5"
          />
        );
      }
    }
    
    return segments;
  };
  
  return (
    <div className="equalizer-face" style={{ 
      width: '100%', 
      height: '100%', 
      padding: 0,
      backgroundColor: '#f0e9e2', // Set background to match page background
      border: '1px solid #666', // Softer outline
      borderRadius: '6px', // Add slight border radius for softer appearance
      position: 'relative',
      overflow: 'visible' // Let content overflow
    }}>
      <div 
        ref={containerRef}
        className="equalizer-container"
        style={{ 
          position: 'relative', 
          height: '100%', 
          width: '100%', 
          padding: 0, 
          overflow: 'visible' // Let content overflow
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          style={{ overflow: 'visible' }} // Let SVG content overflow
          className="equalizer-svg"
        >
          {/* Define patterns */}
          <defs>
            {/* Refined diagonal hash pattern for caution zones - finer with less space */}
            <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
              <path d="M-1,1 l2,-2
                      M0,4 l4,-4
                      M3,5 l2,-2" 
                    style={{ stroke: '#a25a3c', strokeWidth: 0.5, opacity: 0.25 }} />
            </pattern>
          </defs>
          
          {/* Upper caution zone (9-10) */}
          <rect x="0" y="0" width="100" height="10" fill="url(#diagonalHatch)" />
          
          {/* Lower caution zone (0-2) */}
          <rect x="0" y="80" width="100" height="20" fill="url(#diagonalHatch)" />
          
          {/* Vertical grid lines only - removed horizontal grid */}
          {values.map((_, index) => (
            <line
              key={`grid-line-${index}`}
              x1={index * (100/6)}
              y1="0"
              x2={index * (100/6)}
              y2="100"
              stroke="#e0d9d2"
              strokeWidth="0.6"
              opacity="0.7"
            />
          ))}
          
          {/* Draw all segments with proper coloring */}
          {renderSegments()}
          
          {/* Draw the dealbreaker curved line (behind) - refined style */}
          <path
            d={createPath(dealbreakerValues)}
            stroke="#888"
            strokeWidth="0.7"
            strokeDasharray="1.5,1.5"
            fill="none"
            opacity="0.5"
          />
          
          {/* Draw the user's curved line (front) - refined style - reduced width to about 2/3 */}
          <path
            d={createPath(values)}
            stroke="#a25a3c"
            strokeWidth="1.2" // Reduced from 1.8 to 1.2 (2/3 of original)
            fill="none"
            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
          />
          
          {/* Draw the dealbreaker dots - refined style */}
          {dealbreakerValues.map((val, index) => (
            <circle
              key={`db-${index}`}
              cx={index * (100/6)}
              cy={100 - (val * 10)}
              r="1.0" // Slightly reduced
              fill="#666"
              opacity="0.7"
            />
          ))}
          
          {/* Draw the draggable user dots - refined style with improved visibility */}
          {values.map((val, index) => (
            <circle
              key={`user-${index}`}
              cx={index * (100/6)}
              cy={100 - (val * 10)}
              r="2.2" // Slightly larger than before (was 2)
              fill="#a25a3c"
              stroke="#fff"
              strokeWidth="0.8"
              filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.3))" 
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