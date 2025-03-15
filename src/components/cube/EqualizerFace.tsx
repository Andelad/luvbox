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

// Add mapping for column titles
const getColumnTitle = (index: number): string => {
  const titles = [
    'Personality',
    'Physical Attraction',
    'Family Values',
    'Values',
    'Behaviour',
    'Goals',
    'Viability'
  ];
  return titles[index] || '';
};

const EqualizerFace: React.FC<EqualizerFaceProps> = ({ values, onValuesChange }) => {
  // Load dealbreaker values from localStorage
  const [dealbreakerValues, setDealbreakerValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipDotIndex, setTooltipDotIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', value: 0, isAboveDealbreaker: false, isInCautionZone: false });
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  
  // Add Material Symbols import for warning icon - properly inside the component
  useEffect(() => {
    // Load Material Icons font for warning symbol
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=warning';
    document.head.appendChild(link);
    
    // Add style element for font variation settings
    const style = document.createElement('style');
    style.textContent = `
      .material-symbols-outlined {
        font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  
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
  
  // Initialize the refs array
  useEffect(() => {
    dotRefs.current = dotRefs.current.slice(0, values.length);
  }, [values.length]);
  
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

  // Handle dot mouse hover - simplified
  const handleDotMouseEnter = (index: number) => {
    // Check if dot is below dealbreaker line or in caution zone
    const isAboveDealbreaker = values[index] >= dealbreakerValues[index];
    const isInCautionZone = values[index] > 9 || values[index] < 2;
    
    setTooltipContent({
      title: getColumnTitle(index),
      value: values[index],
      isAboveDealbreaker,
      isInCautionZone
    });
    
    setTooltipDotIndex(index);
    setTooltipVisible(true);
  };
  
  const handleDotMouseLeave = () => {
    if (activeDot === null) {
      setTooltipVisible(false);
      setTooltipDotIndex(null);
    }
  };
  
  // Handle dot dragging - modified to keep tooltip visible
  const handleDotMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setActiveDot(index);
    
    // Check if dot is below dealbreaker line or in caution zone
    const isAboveDealbreaker = values[index] >= dealbreakerValues[index];
    const isInCautionZone = values[index] > 9 || values[index] < 2; // Fixed typo: replaced `value` with `values[index]`
    
    setTooltipContent({
      title: getColumnTitle(index),
      value: values[index], // Fixed typo: replaced `value` with `values[index]`
      isAboveDealbreaker,
      isInCautionZone
    });
    
    setTooltipDotIndex(index);
    setTooltipVisible(true);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault(); // Prevent default behaviors
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate position relative to SVG
      const svgY = moveEvent.clientY - rect.top;
      const svgHeight = rect.height;
      
      // Convert to value (0-10)
      // SVG Y is top-down, while our values are bottom-up
      const valuePercent = Math.max(0, Math.min(1, 1 - (svgY / svgHeight)));
      const value = Math.max(0, Math.min(10, Math.round(valuePercent * 10 * 10) / 10));
      
      // Update the values and notify parent
      const newValues = [...values];
      newValues[index] = value;
      onValuesChange(newValues);
      
      // Update tooltip content immediately
      const isAboveDealbreaker = value >= dealbreakerValues[index];
      const isInCautionZone = value > 9 || value < 2;
      
      setTooltipContent({
        title: getColumnTitle(index),
        value: value,
        isAboveDealbreaker,
        isInCautionZone
      });
      
      // Ensure tooltip remains visible during dragging
      setTooltipVisible(true);
    };
    
    const handleMouseUp = (upEvent: MouseEvent) => {
      upEvent.preventDefault();
      upEvent.stopPropagation();
      
      setActiveDot(null);
      
      // Keep tooltip visible briefly after release
      setTimeout(() => {
        // Only hide tooltip if we're not still hovering over a dot
        if (activeDot === null && !document.querySelector('.active-dot')) {
          setTooltipVisible(false);
          setTooltipDotIndex(null);
        }
      }, 1000);
      
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

// Function to render the SVG tooltip directly within the SVG
const renderTooltip = () => {
  if (!tooltipVisible || tooltipDotIndex === null) return null;
  
  const index = tooltipDotIndex;
  const dotX = index * (100/6);
  const dotY = 100 - (values[index] * 10);
  
  // Compact tooltip dimensions
  const tooltipWidth = 28;
  const tooltipHeight = 11;
  const padding = 1.5;
  
  // Position tooltip only slightly higher above the dot (further reduced)
  const tooltipY = dotY - tooltipHeight - 4; // Reduced to 4 (75% of the way from 3 to 7)
  const tooltipX = dotX - (tooltipWidth / 2);
  
  // Calculate the distance from the dealbreaker line
  const distance = values[index] - dealbreakerValues[index];
  
  // Create a smooth gradient between colors based on distance
  // Full red when below dealbreaker by 0.5 or more, full green when above dealbreaker by 0.5 or more
  let colorRatio = Math.min(1, Math.max(0, (distance + 0.5) / 1.0));
  
  // Interpolate between red and green colors
  const redColor = { r: 230, g: 140, b: 140 }; // rgba(230, 140, 140, 1)
  const greenColor = { r: 169, g: 183, b: 146 }; // rgba(169, 183, 146, 1)
  
  const interpolatedColor = {
    r: Math.round(redColor.r * (1 - colorRatio) + greenColor.r * colorRatio),
    g: Math.round(redColor.g * (1 - colorRatio) + greenColor.g * colorRatio),
    b: Math.round(redColor.b * (1 - colorRatio) + greenColor.b * colorRatio)
  };
  
  const tooltipColor = `rgba(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b}, 1)`;
  
  // Create warning icon instead of text symbol
  const showWarning = tooltipContent.isInCautionZone;
  
  return (
    <g className="svg-tooltip">
      {/* Background rectangle */}
      <rect
        x={tooltipX}
        y={tooltipY}
        width={tooltipWidth}
        height={tooltipHeight}
        rx="1"
        ry="1"
        fill={tooltipColor}
        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.2))"
      />
      
      {/* Arrow - adjusted to connect from the updated position */}
      <path
        d={`M${dotX-2.5},${tooltipY+tooltipHeight} L${dotX},${dotY-1.5} L${dotX+2.5},${tooltipY+tooltipHeight} Z`}
        fill={tooltipColor}
      />
      
      {/* Title text */}
      <text
        x={tooltipX + padding}
        y={tooltipY + padding}
        textAnchor="start"
        fill="white"
        fontSize="3"
        fontWeight="bold"
        dominantBaseline="hanging"
        className="tooltip-text"
      >
        {tooltipContent.title}
      </text>
      
      {/* Score text with Material Symbols warning icon */}
      <text
        x={tooltipX + padding}
        y={tooltipY + tooltipHeight - padding - 4}
        textAnchor="start"
        fill="white"
        fontSize="3"
        dominantBaseline="hanging"
        className="tooltip-text"
      >
        {tooltipContent.value.toFixed(1)}
        {/* Space after score */}
        <tspan dx="1"></tspan>
        {/* Warning icon moved to the right of the score */}
        {showWarning && (
          <tspan 
            className="material-symbols-outlined warning-icon" 
            fontSize="3.5"
            dy="0"
            style={{ fontFamily: "'Material Symbols Outlined'", verticalAlign: "middle" }}
          >
            warning
          </tspan>
        )}
      </text>
    </g>
  );
};

  return (
    <div className="equalizer-face" style={{ 
      width: '100%', 
      height: '100%', 
      padding: 0,
      backgroundColor: '#f0e9e2', // Set background to match page background
      border: 'none', // Remove border - we'll use the SVG overlay instead
      borderRadius: '6px', // Add slight border radius for softer appearance
      position: 'relative',
      overflow: 'visible', // Let content overflow
      boxSizing: 'border-box' // Ensure border is included in width/height
    }}>
      <div 
        ref={containerRef}
        className="equalizer-container"
        style={{ 
          position: 'relative', 
          height: '100%', 
          width: '100%', 
          padding: 0, 
          overflow: 'visible', // Let content overflow
          zIndex: 5  // Higher z-index than the border
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          style={{ 
            overflow: 'visible',
            position: 'relative',
            zIndex: 10  // Higher z-index to ensure content appears above border
          }} 
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
          
          {/* Background elements */}
          <rect x="0" y="0" width="100" height="100" fill="transparent" />
          
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
          
          {/* Update the user's curved line color */}
          <path
            d={createPath(values)}
            stroke="#a25a3c" /* Rust color */
            strokeWidth="0.96" /* Reduced by 20% (was 1.2) */
            fill="none"
            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
            style={{ zIndex: 25 }}
            className="user-line"
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
          
          {/* Update the draggable user dots color */}
          {values.map((val, index) => (
            <circle
              key={`user-${index}`}
              ref={el => dotRefs.current[index] = el}
              cx={index * (100/6)}
              cy={100 - (val * 10)}
              r="1.65" /* Reduced size by 25% (was 2.2) */
              fill="#a25a3c" /* Rust color */
              stroke="#fff"
              strokeWidth="0.6" /* Reduced stroke width by 25% (was 0.8) */
              filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))" 
              style={{ cursor: 'pointer', zIndex: 30 }}
              className="user-dot"
              onMouseDown={handleDotMouseDown(index)}
              onMouseEnter={() => handleDotMouseEnter(index)}
              onMouseLeave={handleDotMouseLeave}
              data-active={activeDot === index ? 'true' : 'false'}
            />
          ))}
          
          {/* SVG Tooltip - highest z-index */}
          {renderTooltip()}
        </svg>
      </div>
      
      {/* Single border overlay with lower z-index than content */}
      <svg 
        className="border-overlay" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,  // Lower z-index so it appears below content
          overflow: 'visible'
        }}
      >
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="none" 
          stroke="#666" 
          strokeWidth="1" 
          rx="6" 
          ry="6"
        />
      </svg>
    </div>
  );
};

export default EqualizerFace;