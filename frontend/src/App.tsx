import React, { useState } from 'react';
import WebcamCapture from './components/WebcamCapture';
import AnalysisResults from './components/AnalysisResults';
import TipsGuide from './components/TipsGuide';
import ProgressIndicator from './components/ProgressIndicator';
import './styles/App.css';

const App: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [results, setResults] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageCapture = (image: File) => {
    setImages(prev => {
      const newImages = [...prev, image];
      if (newImages.length > 5) {
        newImages.shift();
      }
      return newImages;
    });
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleImageDelete = (index: number) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      return newImages;
    });
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleAnalysisComplete = (analysisResults: any) => {
    setResults(analysisResults);
    setCurrentStep(6);
    setIsAnalyzing(false);
  };

  return (
    <div className="App">
      <h1>Color Analysis X</h1>
      <div className="main-content">
        <div className="left-column">
          <TipsGuide currentStep={currentStep} />
          <WebcamCapture
            onImageCapture={handleImageCapture}
            onImageDelete={handleImageDelete}
            onAnalysisStart={() => setIsAnalyzing(true)}
            onAnalysisComplete={handleAnalysisComplete}
            capturedImages={images}
            isAnalyzing={isAnalyzing}
          />
          <ProgressIndicator currentStep={currentStep} totalSteps={6} />
        </div>
        <div className="right-column">
          {results ? (
            <AnalysisResults results={results} />
          ) : (
            <div className="placeholder-results">
              Your analysis results will appear here after capturing and analyzing 5 images.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;