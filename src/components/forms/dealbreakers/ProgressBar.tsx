// Add the ProgressBar content here
import React from 'react';
import './DealbreakersForm.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-text">
        Question {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;