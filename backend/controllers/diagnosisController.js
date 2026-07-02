import { getGeminiDiagnosis } from '../services/geminiService.js';
import { createDiagnosis, getDiagnosesByUserId } from '../models/diagnosisModel.js';

/**
 * Validates the base64 image data URL format, size, and character set.
 * 
 * @param {string} uploadedImage 
 * @returns {boolean} True if the image is valid.
 */
const validateImage = (uploadedImage) => {
  const allowedPrefixes = [
    'data:image/png;base64,',
    'data:image/jpeg;base64,',
    'data:image/jpg;base64,',
    'data:image/webp;base64,'
  ];
  
  const prefixMatch = allowedPrefixes.find(prefix => uploadedImage.startsWith(prefix));
  if (!prefixMatch) return false;

  // Max size check: approx 10MB limit (base64 length around 13.3 million chars)
  if (uploadedImage.length > 14000000) return false;

  const base64Data = uploadedImage.substring(prefixMatch.length);
  // Verify base64 character set
  const base64Regex = /^[A-Za-z0-9+/=\s\r\n]+$/;
  return base64Regex.test(base64Data);
};

/**
 * Sanitizes and safely parses JSON text returned by Gemini.
 * Removes markdown code fences, leading/trailing whitespace, and unexpected formatting.
 * 
 * @param {string} rawText 
 * @returns {Object} Parsed JSON object.
 */
const safeParseJSON = (rawText) => {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    const match = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
    if (match) {
      cleaned = match[1].trim();
    }
  }
  return JSON.parse(cleaned);
};

/**
 * Handles symptom analysis using Google Gemini.
 * POST /api/diagnosis/analyse
 */
export const getDiagnosis = async (req, res) => {
  try {
    const { uploadedImage, concernText, patientContext } = req.body;
    const userId = req.user.id; // From protect middleware

    // 1. Validate empty requests
    if (!concernText && !uploadedImage) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either a description of your symptoms or upload an image.'
      });
    }

    // 2. Validate symptom description length
    if (concernText && concernText.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Symptom description is too long (maximum 2000 characters).'
      });
    }

    // 3. Validate image format and corruption
    if (uploadedImage) {
      if (!validateImage(uploadedImage)) {
        return res.status(400).json({
          success: false,
          message: 'Unsupported, oversized, or corrupted image upload. Please upload a valid PNG, JPG, JPEG, or WEBP image (max 10MB).'
        });
      }
    }

    // 4. Contact Gemini service
    const rawText = await getGeminiDiagnosis(
      uploadedImage || null,
      concernText || '',
      patientContext || {}
    );

    // 5. Robust JSON Parsing
    let parsedResult;
    try {
      parsedResult = safeParseJSON(rawText);
    } catch (parseError) {
      console.error('Gemini output failed JSON parsing:', parseError, rawText);
      return res.status(500).json({
        success: false,
        message: 'The AI service returned an unparseable response format. Please try again.'
      });
    }

    // 6. Enforce Medical Disclaimer
    const defaultDisclaimer = "Disclaimer: This is an AI-assisted screening report. It is for informational support only and does not substitute a professional doctor's clinical diagnosis.";
    if (!parsedResult.disclaimer || typeof parsedResult.disclaimer !== 'string' || parsedResult.disclaimer.trim().length === 0) {
      parsedResult.disclaimer = defaultDisclaimer;
    }

    // 7. Validate standard schema properties (fallback to safe values if missing)
    const conditions = parsedResult.possibleConditions || [];
    if (!Array.isArray(conditions) || conditions.length === 0) {
      conditions.push({
        condition: 'General Symptom Discomfort',
        confidence: 50,
        reason: 'Analyzing described symptoms.'
      });
    }

    const topCondition = conditions[0];
    const conditionName = topCondition.condition || 'Unspecified Condition';
    const confidenceScore = topCondition.confidence || 50;
    const description = parsedResult.summary || topCondition.reason || 'No description provided.';
    const urgency = parsedResult.urgency || 'Low';

    // 8. Persist diagnosis in MySQL (Save the entire raw JSON response object)
    const saved = await createDiagnosis(
      userId,
      conditionName,
      confidenceScore,
      urgency,
      uploadedImage || null,
      parsedResult
    );

    // 9. Return response structured for the existing UI
    return res.status(200).json({
      success: true,
      message: 'Analysis completed successfully.',
      diagnosis: {
        id: saved.id,
        condition: conditionName,
        confidence: `${confidenceScore}%`,
        description,
        advice: [
          ...(parsedResult.homeCare || []),
          ...(parsedResult.medications || []),
          ...(parsedResult.recommendedTests || []),
          ...(parsedResult.redFlags || [])
        ],
        imageUrl: uploadedImage || null,
        urgency,
        disclaimer: parsedResult.disclaimer,
        created_at: new Date()
      }
    });

  } catch (error) {
    console.error('Diagnosis controller error:', error);
    
    let message = 'An error occurred during AI analysis. Please try again.';
    if (error.message.includes('API key') || error.message.includes('GEMINI_API_KEY')) {
      message = 'AI service is temporarily unavailable due to configuration issues.';
    }

    return res.status(500).json({
      success: false,
      message
    });
  }
};

/**
 * Retrieves the diagnostic logs (history) for the authenticated user.
 * GET /api/diagnosis/history
 */
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const diagnoses = await getDiagnosesByUserId(userId);
    return res.status(200).json({
      success: true,
      diagnoses
    });
  } catch (error) {
    console.error('Fetch history controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch diagnostic history.'
    });
  }
};
