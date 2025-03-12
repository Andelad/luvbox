import React from 'react';
import { CubeFace } from '../../types';
import CubeIcon from './CubeIcon';

interface CubeNavigationProps {
  currentFace: CubeFace;
  navigateTo: (face: CubeFace) => void;
}

const CubeNavigation: React.FC<CubeNavigationProps> = ({ currentFace, navigateTo }) => {
  return (
    <div className="cube-icons-navigation">
      <CubeIcon 
        faceColor="front" 
        onClick={() => navigateTo('qualities')} 
        isActive={currentFace === 'qualities'}
        label="Qualities"
      />
      <CubeIcon 
        faceColor="top" 
        onClick={() => navigateTo('purpose')} 
        isActive={currentFace === 'purpose'}
        label="Purpose"
      />
      <CubeIcon 
        faceColor="right" 
        onClick={() => navigateTo('time')} 
        isActive={currentFace === 'time'}
        label="Time"
      />
    </div>
  );
};

export default CubeNavigation;
