/**
 * Generates the prompt template for Google Gemini.
 * Isolates prompt engineering from business logic.
 * 
 * @param {string} concernText - The text description of the symptoms.
 * @param {Object} patientContext - Optional patient metadata (age, gender, etc.).
 * @returns {string} The formatted prompt string.
 */
export const generateDiagnosisPrompt = (concernText, patientContext = {}) => {
  return `
You are acting as a clinical decision-support AI assistant.
Your purpose is to provide informational analysis of the patient's skin concern or general symptoms and recommend appropriate home care, tests, or clinical next steps.

Strict Guidelines:
1. Do not claim absolute certainty.
2. Do not claim to replace a professional doctor's diagnosis.
3. Always recommend professional consultation when appropriate.
4. If emergency symptoms (red flags) are detected, explicitly advise immediate emergency care.

Patient Context:
- Age: ${patientContext.age || 'Unknown'}
- Gender: ${patientContext.gender || 'Unknown'}
- Location: ${patientContext.location || 'Unknown'}
- Blood Group: ${patientContext.bloodGroup || 'Unknown'}

User Describe Concern/Symptoms:
"${concernText || 'No symptoms description provided.'}"

If an image is attached to this request, use it to inspect the lesion or symptom details. If no image is attached, rely solely on the described symptoms.

Provide your analysis strictly adhering to the JSON schema.
  `;
};

/**
 * Output schema defining the structured JSON payload expected from Gemini.
 */
export const diagnosisResponseSchema = {
  type: "OBJECT",
  properties: {
    possibleConditions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          condition: { type: "STRING", description: "Name of the condition" },
          confidence: { type: "NUMBER", description: "Confidence score out of 100" },
          reason: { type: "STRING", description: "Reason why this condition matches" }
        },
        required: ["condition", "confidence", "reason"]
      }
    },
    recommendedTests: {
      type: "ARRAY",
      items: { type: "STRING" }
    },
    medications: {
      type: "ARRAY",
      items: { type: "STRING" }
    },
    homeCare: {
      type: "ARRAY",
      items: { type: "STRING" }
    },
    redFlags: {
      type: "ARRAY",
      items: { type: "STRING" }
    },
    urgency: {
      type: "STRING",
      enum: ["Low", "Medium", "High", "Emergency"]
    },
    summary: { type: "STRING", description: "Clinical interpretation summary of findings" },
    disclaimer: { type: "STRING", description: "Medical disclaimer emphasizing this is not a final diagnosis" }
  },
  required: [
    "possibleConditions",
    "recommendedTests",
    "medications",
    "homeCare",
    "redFlags",
    "urgency",
    "summary",
    "disclaimer"
  ]
};
