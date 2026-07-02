import api from './api.js';

/**
 * Sends a registration request to the backend.
 * @param {string} fullName 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} The response data.
 */
export const signup = async (fullName, email, password) => {
  const response = await api.post('/auth/signup', { fullName, email, password });
  return response.data;
};

/**
 * Sends a login request to the backend.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} The response data containing token and user info.
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Fetches the currently authenticated user details.
 * @returns {Promise<Object>} The response data containing user info.
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
