import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';

/**
 * Validates whether an email format is correct.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Handle user registration (Signup).
 * POST /api/auth/signup
 */
export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    // 1. Validation: Field presence
    if (fullName === undefined || email === undefined || password === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields (fullName, email, password) are required.'
      });
    }

    // 2. Formatting: Trim whitespace
    fullName = typeof fullName === 'string' ? fullName.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password.trim() : '';

    // 3. Validation: Field length checks
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: 'Full name cannot be empty.'
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address cannot be empty.'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password cannot be empty.'
      });
    }

    // 4. Validation: Email format check
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // 5. Validation: Password length check (minimum 8 characters)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    // 6. Duplicate User Check
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered.'
      });
    }

    // 7. Password Hashing (using bcrypt)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 8. Database insertion
    await createUser(fullName, email, passwordHash);

    // 9. Success Response (Standardized JSON structure, no JWT, no auto-login)
    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {}
    });

  } catch (error) {
    console.error('Signup error:', error);
    // Standardized error response hiding SQL/database specifics
    return res.status(500).json({
      success: false,
      message: 'An error occurred during account creation. Please try again later.'
    });
  }
};

/**
 * Handle user login.
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 1. Validation: Field presence
    if (email === undefined || password === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    // 2. Formatting: Trim whitespace and lowercase email
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password.trim() : '';

    // 3. Validation: Field length checks
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address cannot be empty.'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password cannot be empty.'
      });
    }

    // 4. Look up user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 5. Compare password using bcrypt.compare()
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 6. Generate a JWT containing user id and email
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // 7. Successful Response (Return user data but never the password hash)
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    // Standardized error response hiding backend specifics
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again later.'
    });
  }
};
