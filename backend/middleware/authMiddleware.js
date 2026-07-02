import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware to protect routes using JWT authentication.
 * Reads Bearer token from the Authorization header.
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for Authorization header starting with "Bearer "
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired.'
    });
  }
};
