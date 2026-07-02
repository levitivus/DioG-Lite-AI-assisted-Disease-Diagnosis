-- SQL Schema for DioG-Lite Database
-- Database name: diog_lite

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diagnoses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    condition_name VARCHAR(255) NOT NULL,
    confidence_score INT NOT NULL,
    urgency VARCHAR(50) NOT NULL,
    image_url LONGTEXT, -- Stores optional base64 image
    raw_response JSON NOT NULL, -- Persists the complete structured JSON returned by Gemini
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
