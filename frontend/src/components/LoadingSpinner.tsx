import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-circle circle1"></div>
        <div className="spinner-circle circle2"></div>
        <div className="spinner-circle circle3"></div>
      </div>
      <p className="loading-text">Analyzing your colors...</p>
    </div>
  );
};

export default LoadingSpinner;