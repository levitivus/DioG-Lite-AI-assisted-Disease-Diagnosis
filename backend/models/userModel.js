import db from '../config/db.js';

/**
 * Finds a user in the database by email.
 * @param {string} email - The email to search for.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

/**
 * Finds a user in the database by ID.
 * @param {number|string} id - The user ID to search for.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export const findUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
};

/**
 * Creates a new user in the database.
 * @param {string} fullName - The user's full name.
 * @param {string} email - The user's unique email.
 * @param {string} passwordHash - The hashed password.
 * @returns {Promise<Object>} The created user metadata (excluding password).
 */
export const createUser = async (fullName, email, passwordHash) => {
  const [result] = await db.execute(
    'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
    [fullName, email, passwordHash]
  );
  return {
    id: result.insertId,
    fullName,
    email
  };
};
