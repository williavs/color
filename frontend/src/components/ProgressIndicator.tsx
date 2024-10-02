import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="progress-indicator">
      <p>Step {currentStep} of {totalSteps}</p>
      <progress value={currentStep} max={totalSteps} />
    </div>
  );
};

export default ProgressIndicator;