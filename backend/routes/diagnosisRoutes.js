import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDiagnosis, getHistory } from '../controllers/diagnosisController.js';

const router = express.Router();

// Route to submit symptoms and/or image for AI analysis
router.post('/analyse', protect, getDiagnosis);

// Route to fetch past diagnosis reports history
router.get('/history', protect, getHistory);

export default router;
