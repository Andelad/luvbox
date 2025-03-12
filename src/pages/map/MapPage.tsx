import React from 'react';
import { Link } from 'react-router-dom';
import './MapPage.css';

// Import the same images used in the landing page
import cube from '../../assets/images/cube.png';
import book from '../../assets/images/book.png';
import person from '../../assets/images/person.png';
import communityIcon from '../../assets/images/community.png';

const MapPage: React.FC = () => {
  return (
    <div className="map-page">
      <div className="map-container">
        <h1>Welcome</h1>
        <div className="map-content">
          <div className="visual-content">
            <div className="diagram diamond-layout">
              {/* Images positioned in a diamond layout with links */}
              <Link to="/cube" className="diagram-element diagram-cube">
                <span className="element-label">The LuvBox</span>
                <img src={cube} alt="Cube" />
              </Link>
              
              <Link to="/scripts" className="diagram-element book">
                <span className="element-label">My Scripts</span>
                <img src={book} alt="Book" />
              </Link>
              
              <Link to="/self" className="diagram-element person">
                <span className="element-label">Myself</span>
                <img src={person} alt="Person" />
              </Link>
              
              <Link to="/community" className="diagram-element community">
                <span className="element-label">Community</span>
                <img src={communityIcon} alt="Community" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
