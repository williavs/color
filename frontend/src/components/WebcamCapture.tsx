import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { analyzeImages } from '../services/api';

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
  const [imagesSent, setImagesSent] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const blob = dataURItoBlob(imageSrc);
      const file = new File([blob], `image${capturedImages.length}.jpg`, { type: 'image/jpeg' });
      onImageCapture(file);
    }
  }, [webcamRef, capturedImages.length, onImageCapture]);

  const handleAnalyze = async () => {
    onAnalysisStart();
    setImagesSent(false);
    try {
      const response = await analyzeImages(capturedImages);
      setImagesSent(true);
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
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
      />
      {isAnalyzing && (
        <div className="webcam-overlay">
          <p>Analyzing...</p>
        </div>
      )}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={capture} disabled={capturedImages.length >= 5 || isAnalyzing}>
          Capture ({capturedImages.length}/5)
        </button>
        {capturedImages.length === 5 && (
          <button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        )}
      </div>
      {imagesSent && <p style={{ color: 'green', textAlign: 'center', margin: '5px 0' }}>Images sent!</p>}
      
      <div className="captured-images">
        {capturedImages.map((image, index) => (
          <div key={index} className="captured-image">
            <img src={URL.createObjectURL(image)} alt={`Captured ${index + 1}`} />
            <button onClick={() => onImageDelete(index)} disabled={isAnalyzing}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;