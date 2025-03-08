import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Import images
import logo from '../../assets/images/logo.png';
import cube from '../../assets/images/cube.png';
import book from '../../assets/images/book.png';
import person from '../../assets/images/person.png';

const LandingPage: React.FC = () => {
  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logo} alt="LuvNav Logo" height="40" />
          <span>LuvBox</span>
        </div>
      </header>
      
      <main className="content">
        <div className="text-content">
          <h1>Your <em>SatNav</em> for dating and love</h1>
          <p>Love is rich and complex. But today, everyone is trying to make a really simple story theirs. What if your story could be different?</p>
          <div className="button-group">
            <Link to="/form/dealbreakers" className="cta-button primary-button">Start Your Journey</Link>
            <Link to="/cube" className="cta-button secondary-button">Enter</Link>
          </div>
        </div>
        
        <div className="visual-content">
          <div className="diagram">
            {/* SVG for triangle with line-based arrows */}
            <svg className="triangle-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
              {/* Define line-based arrowhead marker */}
              <defs>
                <marker 
                  id="arrowhead" 
                  markerWidth="10" 
                  markerHeight="10" 
                  refX="8" 
                  refY="5" 
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,10 L10,5 L0,0" stroke="#2d2d2d" fill="none" strokeWidth="1.5"/>
                </marker>
                <marker 
                  id="arrowhead-reverse" 
                  markerWidth="10" 
                  markerHeight="10" 
                  refX="2" 
                  refY="5" 
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M10,0 L10,10 L0,5 L10,0" stroke="#2d2d2d" fill="none" strokeWidth="1.5"/>
                </marker>
              </defs>
              
              {/* Line from Cube to Book - only 60% of the distance */}
              <line 
                x1="200" y1="80" 
                x2="140" y2="180" 
                stroke="#2d2d2d" 
                strokeWidth="1.5" 
                strokeDasharray="5,5" 
                markerEnd="url(#arrowhead)" 
              />
              
              {/* Line from Cube to Person - only 60% of the distance */}
              <line 
                x1="200" y1="80" 
                x2="260" y2="180" 
                stroke="#2d2d2d" 
                strokeWidth="1.5" 
                strokeDasharray="5,5" 
                markerEnd="url(#arrowhead)" 
              />
              
              {/* Line from Book to Person - only 60% of the distance */}
              <line 
                x1="140" y1="215" 
                x2="260" y2="215" 
                stroke="#2d2d2d" 
                strokeWidth="1.5" 
                strokeDasharray="5,5" 
                markerStart="url(#arrowhead-reverse)" 
                markerEnd="url(#arrowhead)" 
              />
            </svg>
            
            {/* Images positioned over the SVG */}
            <img src={cube} className="diagram-element diagram-cube" alt="Cube" />
            <img src={book} className="diagram-element book" alt="Book" />
            <img src={person} className="diagram-element person" alt="Person" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;