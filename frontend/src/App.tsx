import React, { useState } from 'react';
import WebcamCapture from './components/WebcamCapture';
import AnalysisResults from './components/AnalysisResults';
import TipsGuide from './components/TipsGuide';
import ProgressIndicator from './components/ProgressIndicator';
import LoadingSpinner from './components/LoadingSpinner';
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

  const resetAnalysis = () => {
    setImages([]);
    setResults(null);
    setCurrentStep(1);
    setIsAnalyzing(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Color Analysis X</h1>
      </header>
      <div className="content-wrapper">
        <aside className="sidebar">
          <div className="sidebar-content">
            <TipsGuide currentStep={currentStep} totalImages={images.length} />
            <ProgressIndicator currentStep={currentStep} totalSteps={6} />
          </div>
        </aside>
        <main className="main-content">
          {!isAnalyzing && !results ? (
            <div className="webcam-section">
              <div className="instructions">
                <h2>Discover Your Perfect Color Palette</h2>
                <p>Take 5 selfies in different lighting conditions for the most accurate results!</p>
              </div>
              <WebcamCapture
                onImageCapture={handleImageCapture}
                onImageDelete={handleImageDelete}
                onAnalysisStart={() => setIsAnalyzing(true)}
                onAnalysisComplete={handleAnalysisComplete}
                capturedImages={images}
                isAnalyzing={isAnalyzing}
              />
            </div>
          ) : (
            <div className="results-container">
              {isAnalyzing ? (
                <div className="loading-container">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <div className="captured-images-gallery">
                    {images.map((image, index) => (
                      <img 
                        key={index} 
                        src={URL.createObjectURL(image)} 
                        alt={`Captured ${index + 1}`} 
                        className="gallery-image"
                      />
                    ))}
                  </div>
                  <AnalysisResults results={results} />
                  <button onClick={resetAnalysis} className="reset-button">
                    Perform Another Analysis
                  </button>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;