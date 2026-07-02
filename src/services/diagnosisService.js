import api from './api.js';

/**
 * Submits symptoms and/or image data to the backend for AI analysis.
 * 
 * @param {string|null} uploadedImage - Optional base64 image data URL.
 * @param {string} concernText - Text description of the symptoms.
 * @param {Object} patientContext - Metadata about the patient (age, gender, etc.).
 * @returns {Promise<Object>} The API response containing the diagnosis report.
 */
export const analyseSymptoms = async (uploadedImage, concernText, patientContext = {}) => {
  const response = await api.post('/diagnosis/analyse', {
    uploadedImage,
    concernText,
    patientContext
  });
  return response.data;
};

/**
 * Fetches the logged-in user's diagnosis report history.
 * 
 * @returns {Promise<Object>} The API response containing previous diagnostics.
 */
export const getDiagnosisHistory = async () => {
  const response = await api.get('/diagnosis/history');
  return response.data;
};
