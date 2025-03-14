import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MapPage.css';

// Update image imports to use direct paths
import cube from '../../assets/images/cube.png';
import book from '../../assets/images/book.png';
import person from '../../assets/images/person.png';
import communityIcon from '../../assets/images/community.png';

const MapPage: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState({
    cube: false,
    book: false,
    person: false,
    community: false
  });

  const handleImageLoad = (imageName: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageName]: true
    }));
  };

  return (
    <div className="map-page">
      <div className="map-container">
        <div className="map-subtitle">
          <p>The LuvBox is a map. But, how we read that map is shaped by our unique preferences, our scripts, and our community. Choose below to find out more.</p>
        </div>
        <div className="map-content">
          <div className="visual-content">
            <div className="diagram diamond-layout">
              {/* Images positioned in a diamond layout with links */}
              <Link to="/luvboxinfo" className="diagram-element diagram-cube">
                <span className="element-label">The LuvBox</span>
                <img 
                  src={cube} 
                  alt="Cube" 
                  onLoad={() => handleImageLoad('cube')}
                  style={{ opacity: imagesLoaded.cube ? 1 : 0 }}
                />
              </Link>
              
              <Link to="/scripts" className="diagram-element book">
                <span className="element-label">My Scripts</span>
                <img 
                  src={book} 
                  alt="Book" 
                  onLoad={() => handleImageLoad('book')}
                  style={{ opacity: imagesLoaded.book ? 1 : 0 }}
                />
              </Link>
              
              <Link to="/self" className="diagram-element person">
                <span className="element-label">Myself</span>
                <img 
                  src={person} 
                  alt="Person" 
                  onLoad={() => handleImageLoad('person')}
                  style={{ opacity: imagesLoaded.person ? 1 : 0 }}
                />
              </Link>
              
              <Link to="/community" className="diagram-element community">
                <span className="element-label">Community</span>
                <img 
                  src={communityIcon} 
                  alt="Community" 
                  onLoad={() => handleImageLoad('community')}
                  style={{ opacity: imagesLoaded.community ? 1 : 0 }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
