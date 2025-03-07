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
          <Link to="/cube" className="cta-button">Enter</Link>
        </div>
        
        <div className="visual-content">
          <div className="diagram">
            {/* Cube element */}
            <img src={cube} className="diagram-element cube" alt="Cube" />
            
            {/* Book element */}
            <img src={book} className="diagram-element book" alt="Book" />
            
            {/* Person element */}
            <img src={person} className="diagram-element person" alt="Person" />
            
            {/* Connection lines and arrows */}
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