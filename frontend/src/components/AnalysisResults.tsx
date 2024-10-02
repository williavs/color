import React from 'react';
import '../styles/AnalysisResults.css';

interface AnalysisResultsProps {
  results: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  if (!results) return <p>No results available</p>;

  const sections = [
    { title: 'Your Color Analysis', delimiter: 'ANALYSIS', icon: '🎨' },
    { title: 'Your Color Season', delimiter: 'SEASON', icon: '🍂' },
    { title: 'Why This Season?', delimiter: 'EXPLANATION', icon: '💡' },
    { title: 'Your Color Palette', delimiter: 'PALETTE', icon: '🌈' },
    { title: 'Style Recommendations', delimiter: 'RECOMMENDATIONS', icon: '👗' },
    { title: 'Pro Tips', delimiter: 'TIPS', icon: '✨' },
  ];

  const parseSection = (content: string, delimiter: string) => {
    const regex = new RegExp(`<${delimiter}>([\\s\\S]*?)</${delimiter}>`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : 'No data available';
  };

  return (
    <div className="analysis-results">
      <h2 className="results-title">Your Personalized Color Analysis</h2>
      {sections.map(({ title, delimiter, icon }) => (
        <div key={delimiter} className="result-section">
          <h3 className="section-title">
            <span className="section-icon">{icon}</span>
            {title}
          </h3>
          <div className="section-content">
            {parseSection(results, delimiter).split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalysisResults;