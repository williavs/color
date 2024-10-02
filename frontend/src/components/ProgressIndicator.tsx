import React from 'react';
import '../styles/ProgressIndicator.css';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <p className="progress-text">Step {currentStep} of {totalSteps}</p>
    </div>
  );
};

export default ProgressIndicator;