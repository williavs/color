import React from 'react';

interface TipsGuideProps {
  currentStep: number;
}

const TipsGuide: React.FC<TipsGuideProps> = ({ currentStep }) => {
  const tips = [
    "Ensure good lighting for accurate color capture.",
    "Face the camera directly for the best results.",
    "Remove any accessories that might affect color analysis.",
    "Try to maintain a neutral expression.",
    "Capture different angles if possible.",
    "Review your images before analysis.",
  ];

  return (
    <div className="tips-guide">
      <h2>Tips for Best Results</h2>
      <p>{tips[Math.min(currentStep - 1, tips.length - 1)]}</p>
    </div>
  );
};

export default TipsGuide;