import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test MySQL Database connection pool
const testDbConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Successfully connected to the MySQL database.');
    connection.release();
  } catch (error) {
    console.warn('MySQL database connection test failed:', error.message);
    console.warn('The application will still run. Please verify your MySQL service is running and configured correctly in .env.');
  }
};

// Mount authentication routes under /api/auth
app.use('/api/auth', authRoutes);

// Mount diagnosis routes under /api/diagnosis
app.use('/api/diagnosis', diagnosisRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend foundation is running' });
});

// Run connection test and start server
testDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
