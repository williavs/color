import React from 'react';
import '../styles/TipsGuide.css';

interface TipsGuideProps {
  currentStep: number;
  totalImages: number;
}

const TipsGuide: React.FC<TipsGuideProps> = ({ currentStep, totalImages }) => {
  const tips = [
    "Find a well-lit area for the best color capture.",
    "Remove accessories that might affect color analysis.",
    "Ensure your face is clearly visible in the frame.",
    "Capture photos in various lighting conditions.",
    "Review your images before analysis.",
    "Analyzing your color palette...",
  ];

  return (
    <div className="tips-guide">
      <h2 className="tips-title">Tips for Best Results</h2>
      <div className="tips-container">
        {tips.map((tip, index) => {
          let status = 'inactive';
          if (index === 5 && currentStep === 6) {
            status = 'active';
          } else if (index === 4 && totalImages === 5 && currentStep === 5) {
            status = 'active';
          } else if (index < 4 && index < totalImages) {
            status = 'completed';
          } else if (index < 4 && index === totalImages) {
            status = 'active';
          }
          
          return (
            <div key={index} className={`tip ${status}`}>
              <div className="tip-number">{index + 1}</div>
              <p>{tip}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TipsGuide;