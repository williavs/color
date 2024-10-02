import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { analyzeImages } from '../services/api';
import '../styles/WebcamCapture.css';

interface WebcamCaptureProps {
  onImageCapture: (image: File) => void;
  onImageDelete: (index: number) => void;
  onAnalysisStart: () => void;
  onAnalysisComplete: (results: any) => void;
  capturedImages: File[];
  isAnalyzing: boolean;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onImageCapture,
  onImageDelete,
  onAnalysisStart,
  onAnalysisComplete,
  capturedImages,
  isAnalyzing,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const captureImage = useCallback(() => {
    setIsCapturing(true);
    setTimeout(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        const blob = dataURItoBlob(imageSrc);
        const file = new File([blob], `image${capturedImages.length}.jpg`, { type: 'image/jpeg' });
        onImageCapture(file);
      }
      setIsCapturing(false);
    }, 500);
  }, [webcamRef, capturedImages.length, onImageCapture]);

  const handleAnalyze = async () => {
    onAnalysisStart();
    try {
      const response = await analyzeImages(capturedImages);
      onAnalysisComplete(response.results);
    } catch (error) {
      console.error('Error during analysis:', error);
      onAnalysisComplete(null);
    }
  };

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="webcam-container">
      <div className={`webcam-wrapper ${isCapturing ? 'capturing' : ''}`}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'user' }}
          onUserMedia={() => setIsCameraReady(true)}
        />
        {!isCameraReady && <div className="camera-loading">Loading camera...</div>}
        {isCapturing && <div className="capture-flash"></div>}
      </div>
      <div className="webcam-controls">
        <button 
          onClick={captureImage} 
          disabled={capturedImages.length >= 5 || isAnalyzing || !isCameraReady || isCapturing}
          className="capture-button"
        >
          {isCapturing ? 'Capturing...' : `Capture (${capturedImages.length}/5)`}
        </button>
        {capturedImages.length === 5 && (
          <button onClick={handleAnalyze} disabled={isAnalyzing} className="analyze-button">
            {isAnalyzing ? 'Analyzing...' : 'Analyze My Colors!'}
          </button>
        )}
      </div>
      <div className="captured-images">
        {capturedImages.map((image, index) => (
          <div key={index} className="captured-image">
            <img src={URL.createObjectURL(image)} alt={`Captured ${index + 1}`} />
            <button onClick={() => onImageDelete(index)} disabled={isAnalyzing}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;