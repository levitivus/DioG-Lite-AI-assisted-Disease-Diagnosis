import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// User registration (Signup API)
router.post('/signup', signup);

// User login (Login API)
router.post('/login', login);

// Protected profile route (for verification)
router.get('/me', protect, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

export default router;
