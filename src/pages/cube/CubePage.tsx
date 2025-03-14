import React from 'react';
import './CubePage.css';
import { CubeComponent } from '../../components/cube';

const CubePage: React.FC = () => {
  return (
    <div className="cube-page">
      <div className="cube-container">
        <div className="cube-view">
          <CubeComponent />
        </div>
      </div>
    </div>
  );
};

export default CubePage;