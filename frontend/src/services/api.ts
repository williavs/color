import axios from 'axios';

const API_BASE_URL = 'http://localhost:8034'; // Updated to match the new backend port

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeImages = async (images: File[]): Promise<any> => {
  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append('images', image, `image${index}.jpg`);
  });

  try {
    const response = await api.post('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing images:', error);
    throw error;
  }
};