import React from 'react';

interface CubeIconProps {
  size?: number;
  color?: string;
  className?: string;
  faceColor?: 'front' | 'top' | 'right' | 'none'; // Added this prop
  onClick?: () => void; // Added this prop
  isActive?: boolean; // Added this prop
  label?: string; // Added this prop
}

const CubeIcon: React.FC<CubeIconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '',
  faceColor = 'none', // Set default value
  onClick = () => {}, // Set default value
  isActive = false, // Set default value
  label = '' // Set default value
}) => {
  // Default stroke color for the cube
  const strokeColor = color === 'currentColor' ? "#a25a3c" : color;
  // Fill color based on which face is active
  const fillColor = faceColor === 'none' ? '#f8f8f8' : '#f0f0f0';
  
  return (
    <div className={`cube-icon-wrapper ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="cube-icon-content">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`cube-icon ${className}`}
        >
          {/* Use faceColor to determine which face should be highlighted */}
          <g>
            <path 
              d="M12 2L2 9L12 16L22 9L12 2Z" 
              fill={faceColor === 'top' ? '#d7967b' : fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path 
              d="M2 9V17L12 24V16" 
              fill={faceColor === 'front' ? '#d7967b' : fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path 
              d="M12 16V24L22 17V9" 
              fill={faceColor === 'right' ? '#d7967b' : fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        {label && <span className="cube-icon-label">{label}</span>}
      </div>
    </div>
  );
};

export default CubeIcon;
