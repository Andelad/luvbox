import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Header from '../../components/common/Header';

// Import images
import cube from '../../assets/images/cube.png';
import book from '../../assets/images/book.png';
import person from '../../assets/images/person.png';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-wrapper">
      <Header />
      <div className="container">
        <main className="content">
          <div className="text-content">
            <h1>Your <em>diagnostic tool</em> for dating and love</h1>
            <p>Love is beautiful when it feels effortless. But, what about when its difficult? LuvBox is your tool for assessing what is happening and what to do about it.</p>
            <div className="button-group">
              <Link to="/form/dealbreakers" className="cta-button primary-button">Start Your Journey</Link>
              <Link to="/cube" className="cta-button secondary-button">Enter</Link>
            </div>
          </div>
          
          <div className="visual-content">
            <div className="diagram">
              {/* SVG for triangle with curved arrows */}
              <svg className="triangle-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                {/* Define chevron arrowhead markers */}
                <defs>
                  <marker 
                    id="chevron-arrow" 
                    markerWidth="10" 
                    markerHeight="10" 
                    refX="6" 
                    refY="5" 
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L6,5 L0,10" stroke="#2d2d2d" fill="none" strokeWidth="1.5"/>
                  </marker>
                  <marker 
                    id="chevron-arrow-reverse" 
                    markerWidth="10" 
                    markerHeight="10" 
                    refX="4" 
                    refY="5" 
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M6,0 L0,5 L6,10" stroke="#2d2d2d" fill="none" strokeWidth="1.5"/>
                  </marker>
                </defs>
                
                {/* Line from Cube to Book - properly positioned to avoid cube */}
                <line 
                  x1="170" y1="120" 
                  x2="145" y2="170" 
                  stroke="#2d2d2d" 
                  strokeWidth="1.5" 
                  strokeDasharray="5,5" 
                  markerStart="url(#chevron-arrow-reverse)"
                  markerEnd="url(#chevron-arrow)" 
                />
                
                {/* Line from Cube to Person - properly positioned to avoid cube */}
                <line 
                  x1="230" y1="120" 
                  x2="255" y2="170" 
                  stroke="#2d2d2d" 
                  strokeWidth="1.5" 
                  strokeDasharray="5,5"
                  markerStart="url(#chevron-arrow-reverse)" 
                  markerEnd="url(#chevron-arrow)" 
                />
                
                {/* Line from Book to Person - bi-directional */}
                <line 
                  x1="140" y1="215" 
                  x2="260" y2="215" 
                  stroke="#2d2d2d" 
                  strokeWidth="1.5" 
                  strokeDasharray="5,5" 
                  markerStart="url(#chevron-arrow-reverse)" 
                  markerEnd="url(#chevron-arrow)" 
                />
              </svg>
              
              {/* Images positioned over the SVG with labels */}
              <div className="diagram-element diagram-cube">
                <span className="element-label">The LuvBox</span>
                <img src={cube} alt="Cube" />
              </div>
              <div className="diagram-element book">
                <span className="element-label">My Scripts</span>
                <img src={book} alt="Book" />
              </div>
              <div className="diagram-element person">
                <span className="element-label">Myself</span>
                <img src={person} alt="Person" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;