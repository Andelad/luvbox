import React, { useState } from 'react';
import './CubeKey.css';

// Using the same face type as in CubeComponent.tsx
type FaceType = 'qualities' | 'purpose' | 'time' | 'back' | 'left' | 'bottom';

interface CubeKeyProps {
  activeFace: FaceType;
}

const CubeKey: React.FC<CubeKeyProps> = ({ activeFace }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    if (openAccordion === key) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(key);
    }
  };

  // Helper function to render SVG icon for each element
  const renderSvgIcon = (type: string) => {
    switch (type) {
      case 'dealbreaker':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="#888" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 12H21" stroke="#d7967b" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" />
            <path d="M3 18H21" stroke="#888" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'user-line':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6C7 14 17 7 21 18" stroke="#d7967b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'grid':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20V20H4V4Z" stroke="#e0e0e0" strokeWidth="1" />
            <path d="M4 9H20" stroke="#e0e0e0" strokeWidth="1" />
            <path d="M4 14H20" stroke="#e0e0e0" strokeWidth="1" />
            <path d="M9 4V20" stroke="#e0e0e0" strokeWidth="1" />
            <path d="M14 4V20" stroke="#e0e0e0" strokeWidth="1" />
          </svg>
        );
      case 'cube':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f0e9e2" stroke="#a25a3c" strokeWidth="1" />
            <path d="M2 7V17L12 22V12" fill="#f0e9e2" stroke="#a25a3c" strokeWidth="1" />
            <path d="M12 12V22L22 17V7" fill="#f0e9e2" stroke="#a25a3c" strokeWidth="1" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Define content for accordions based on active face
  const getFaceAccordions = () => {
    switch (activeFace) {
      case 'qualities':
        return [
          {
            key: 'dealbreaker',
            title: 'Dealbreaker Line',
            icon: 'dealbreaker',
            content: 'The dashed line shows your minimum acceptable threshold for each characteristic. Values falling below this line may indicate potential dealbreakers in your relationships.'
          },
          {
            key: 'user-line',
            title: 'Your Values Line',
            icon: 'user-line',
            content: 'The solid line represents your actual values for each characteristic. Drag the dots up or down to adjust your values.'
          },
          {
            key: 'grid',
            title: 'Characteristics Grid',
            icon: 'grid',
            content: 'Pe: Personality, PA: Physical Attraction, FC: Family Culture, SV: Shared Values, GB: Good Behavior, G: Goals, Vi: Viability'
          }
        ];
      case 'purpose':
        return [
          {
            key: 'timeline',
            title: 'Time Projection',
            icon: 'grid',
            content: 'This face shows how your relationship characteristics project over time, helping you visualize long-term compatibility.'
          },
          {
            key: 'categories',
            title: 'Purpose Categories',
            icon: 'grid',
            content: 'Intimacy factors (left) and Purpose factors (right) show different aspects of your relationship values over time.'
          }
        ];
      case 'time':
        return [
          {
            key: 'structure',
            title: 'Relationship Structure',
            icon: 'cube',
            content: 'The isometric view represents the structure of your relationship over time, with height indicating strength in different areas.'
          },
          {
            key: 'patterns',
            title: 'Time Patterns',
            icon: 'grid',
            content: 'Observe how your relationship values might evolve over time across different stages of life together.'
          }
        ];
      default:
        return [
          {
            key: 'info',
            title: 'Face Information',
            icon: 'cube',
            content: 'This face will contain additional relationship insights in future updates.'
          }
        ];
    }
  };

  const accordions = getFaceAccordions();

  return (
    <div className="cube-key">
      <div className="cube-key-header">
        <h3>{activeFace.charAt(0).toUpperCase() + activeFace.slice(1)} View</h3>
      </div>
      <div className="cube-key-accordions">
        {accordions.map((item) => (
          <div className="key-accordion" key={item.key}>
            <div 
              className={`accordion-header ${openAccordion === item.key ? 'active' : ''}`}
              onClick={() => toggleAccordion(item.key)}
            >
              <div className="header-icon">
                {renderSvgIcon(item.icon)}
              </div>
              <div className="header-title">{item.title}</div>
              <div className="accordion-toggle">
                {openAccordion === item.key ? 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  : 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              </div>
            </div>
            {openAccordion === item.key && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="cube-key-footer">
        <div className={`key-dot qualities-color`}></div>
        <span>Qualities</span>
        <div className={`key-dot purpose-color`}></div>
        <span>Purpose</span>
        <div className={`key-dot time-color`}></div>
        <span>Time</span>
      </div>
    </div>
  );
};

export default CubeKey;