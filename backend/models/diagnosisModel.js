import db from '../config/db.js';

/**
 * Persists a new diagnosis report in the database.
 * 
 * @param {number} userId - ID of the authenticated user.
 * @param {string} conditionName - The primary condition detected.
 * @param {number} confidenceScore - Confidence percentage score.
 * @param {string} urgency - Urgency rating (Low, Medium, High, Emergency).
 * @param {string|null} imageUrl - Optional base64 image data URL.
 * @param {Object} rawResponse - The complete structured JSON response returned by Gemini.
 * @returns {Promise<Object>} The saved database record info.
 */
export const createDiagnosis = async (userId, conditionName, confidenceScore, urgency, imageUrl, rawResponse) => {
  const responseString = typeof rawResponse === 'string' ? rawResponse : JSON.stringify(rawResponse);
  const [result] = await db.execute(
    'INSERT INTO diagnoses (user_id, condition_name, confidence_score, urgency, image_url, raw_response) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, conditionName, confidenceScore, urgency, imageUrl || null, responseString]
  );
  return {
    id: result.insertId,
    userId,
    conditionName,
    confidenceScore,
    urgency,
    imageUrl,
    rawResponse
  };
};

/**
 * Retrieves all diagnosis records associated with a specific user.
 * 
 * @param {number} userId - The user ID.
 * @returns {Promise<Array>} List of user diagnoses.
 */
export const getDiagnosesByUserId = async (userId) => {
  const [rows] = await db.execute(
    'SELECT * FROM diagnoses WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};
