import React from 'react';

interface AnalysisResultsProps {
  results: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  if (!results) return <p>No results available</p>;

  console.log('Raw analysis results:', results);

  const sections = [
    { title: 'Analysis', delimiter: 'ANALYSIS' },
    { title: 'Season', delimiter: 'SEASON' },
    { title: 'Explanation', delimiter: 'EXPLANATION' },
    { title: 'Palette', delimiter: 'PALETTE' },
    { title: 'Recommendations', delimiter: 'RECOMMENDATIONS' },
    { title: 'Tips', delimiter: 'TIPS' },
  ];

  const parseSection = (content: string, delimiter: string) => {
    const regex = new RegExp(`<${delimiter}>([\\s\\S]*?)</${delimiter}>`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : 'No data available';
  };

  return (
    <div className="analysis-results">
      <h2>Analysis Results</h2>
      {sections.map(({ title, delimiter }) => (
        <div key={delimiter}>
          <h3>{title}</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{parseSection(results, delimiter)}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalysisResults;