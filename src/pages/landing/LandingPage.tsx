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
          <span>LuvNav</span>
        </div>
      </header>
      
      <main className="content">
        <div className="text-content">
          <h1>Your <em>SatNav</em> for dating and love</h1>
          <p>Love is rich and complex. But today, everyone is trying to make a really simple story theirs. What if your story could be different?</p>
          <div className="button-group">
            <Link to="/form/dealbreakers" className="cta-button primary-button">Start Your Journey</Link>
            <Link to="/cube" className="cta-button secondary-button"></Link>
          </div>
        </div>
        
        <div className="visual-content">
          <div className="diagram">
            {/* Cube element at top of triangle */}
            <img src={cube} className="diagram-element diagram-cube" alt="Cube" />
            
            {/* Book element at bottom left */}
            <img src={book} className="diagram-element book" alt="Book" />
            
            {/* Person element at bottom right */}
            <img src={person} className="diagram-element person" alt="Person" />
            
            {/* Connection lines with arrows - forming a triangle */}
            <div className="connector connector-cube-book"></div>
            <div className="arrow arrow-cube-book"></div>
            
            <div className="connector connector-cube-person"></div>
            <div className="arrow arrow-cube-person"></div>
            
            <div className="connector connector-book-person"></div>
            <div className="arrow arrow-book-person"></div>
            <div className="arrow arrow-person-book"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;