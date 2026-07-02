[README.md](https://github.com/user-attachments/files/29591949/README.md)
# DioG-Lite

### AI-Powered Dermatological Diagnostic Assistant

A modern full-stack web application that leverages Google Gemini AI to assist users in identifying possible skin conditions from uploaded images and symptom descriptions. The application provides AI-generated diagnostic insights, maintains diagnosis history, and helps users locate appropriate medical specialists.

---

![DioG-Lite Banner](assets/banner.png)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Database](#database)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [AI Workflow](#ai-workflow)
- [Security Features](#security-features)
- [Future Improvements](#future-improvements)
- [Known Limitations](#known-limitations)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Author](#author)

---

## Project Overview

### Motivation
Dermatological concerns represent one of the most common reasons patients seek primary healthcare. However, access to specialized dermatologists can be limited by geographical location, financial cost, and long appointment wait times. **DioG-Lite** was conceived to bridge this gap, providing users with an accessible, immediate, and user-friendly preliminary screening assistant.

### The Problem It Solves
When users experience skin lesions, rashes, or other dermatological discomforts, they often resort to unverified web searches, leading to unnecessary anxiety or misinterpretation. **DioG-Lite** provides a structured, AI-guided preliminary assessment utilizing a clinical-grade decision support framework. 

### Why AI-Assisted Diagnosis is Useful
- **Immediate Insights:** Delivers real-time analysis of symptoms and images in seconds.
- **Structured Explanations:** Explains possible conditions, urgency assessments, home care advice, and red flag warnings in clear, patient-friendly terms.
- **Bridging the Care Gap:** Guides the user to verified local medical specialists based on the preliminary scan results.

> [!WARNING]
> **Clinical Disclaimer:** DioG-Lite is an educational prototype and a preliminary screening assistant. It is **not** a replacement for professional clinical medical advice, definitive diagnosis, or treatment from a licensed healthcare provider.

---

## Features

- **User Authentication:** Secure user registration and login flows.
- **JWT Authorization:** Token-based session management using JSON Web Tokens with route guards.
- **AI-Powered Diagnostics:** Double-mode workflow:
  - **Workflow A:** Text-only symptom descriptions.
  - **Workflow B:** Image uploads coupled with symptom descriptions.
- **Google Gemini AI Integration:** Leverages the **`gemini-2.5-flash`** model with strictly enforced JSON schemas.
- **Complete Response Persistence:** Stores the full structured raw AI JSON payload in a MySQL `JSON` column to avoid unnecessary API calls or future data migrations.
- **Medical Disclaimer Safety Fallback:** The backend automatically ensures every diagnosis response contains a clinical safety disclaimer.
- **Doctor Finder:** A directory of verified fictional dermatologists across 5 states in India with dynamic, dependent State and City dropdown filters.
- **Nearby Hospitals placeholder:** An interactive "Coming Soon" roadmap tab featuring a playful House MD easter egg.
- **Highly Responsive UI:** Designed with a modern, responsive layout using React, TailwindCSS, and Framer Motion.

---

## Screenshots

### Landing Page
![Landing](assets/screenshots/landing.png)

### Login
![Login](assets/screenshots/login.png)

### Dashboard
![Dashboard](assets/screenshots/dashboard.png)

### Diagnosis
![Diagnosis](assets/screenshots/diagnosis.png)

### Results
![Results](assets/screenshots/results.png)

### History
![History](assets/screenshots/history.png)

### Doctor Finder
![Doctors](assets/screenshots/doctors.png)

---

## Tech Stack

| Component | Technologies Used |
|---|---|
| **Frontend** | React, Vite, TailwindCSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express, ES Modules (import/export) |
| **Database** | MySQL |
| **AI Layer** | Google Gemini API (`gemini-2.5-flash`), `@google/genai` SDK |
| **Security & Auth** | JSON Web Tokens (JWT), Bcrypt password hashing |

---

## Project Architecture

```text
       ┌──────────────┐
       │ User Browser │
       └──────┬───────┘
              │
              ▼
   ┌──────────────────────┐
   │    React Frontend    │ (Vite Dev Server / Build assets)
   └──────────┬───────────┘
              │ (HTTP / JSON + JWT Bearer)
              ▼
    ┌──────────────────┐
    │  REST API Router │
    └─────────┬────────┘
              │
              ▼
 ┌────────────────────────┐
 │     Express Server     │ (Node.js Backend)
 └──────┬──────────┬──────┘
        │          │
        │          ▼
        │   ┌────────────────────┐
        │   │  Google Gemini AI  │ (gemini-2.5-flash)
        │   └────────────────────┘
        ▼
 ┌──────────────┐
 │    MySQL     │ (diagnoses & users tables)
 └──────────────┘
```

---

## Folder Structure

```text
diog-lite/
├── assets/                  # Media assets, banners, and screenshots
├── database/
│   └── schema.sql           # Database tables and constraints schema definition
├── backend/
│   ├── config/              # Database connection pool settings
│   ├── controllers/         # Express request handlers (auth, diagnosis)
│   ├── middleware/          # Route guards and authorization checks
│   ├── models/              # Database query definitions (SQL mapping)
│   ├── prompts/             # System instruction prompt engineering and schemas
│   ├── routes/              # API Endpoint routers
│   ├── services/            # Google Gemini AI connection layer
│   ├── server.js            # Node backend entry point
│   └── .env.example         # Template for environment credentials
└── frontend/
    ├── public/              # Static files (icons, favicon, local images)
    └── src/
        ├── components/      # UI components (Inputs, Buttons, Modals)
        ├── context/         # AuthContext global state wrapper
        ├── data/            # Local doctors and mock dataset catalog
        ├── pages/           # Landing page, Dashboard, Login, Signup
        └── services/        # Frontend API call handlers (Axios clients)
```

---

## Database

The database (`diog_lite`) uses standard relational schemas:

### `users` Table
Stores user credentials and profile metadata.
* `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
* `full_name` (VARCHAR)
* `email` (VARCHAR, UNIQUE)
* `password_hash` (VARCHAR)
* `created_at` / `updated_at` (TIMESTAMP)

### `diagnoses` Table
Stores symptom scan logs, associated users, and raw AI responses.
* `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
* `user_id` (INT, FOREIGN KEY referencing `users(id)`)
* `condition_name` (VARCHAR)
* `confidence_score` (INT)
* `urgency` (VARCHAR)
* `image_url` (LONGTEXT, optional base64 image data)
* `raw_response` (JSON, stores complete Gemini structured response payload)
* `created_at` (TIMESTAMP)

---

## Installation

### Prerequisites
- Node.js (v18+)
- MySQL Server

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/diog-lite.git
cd diog-lite
```

### 2. Database Configuration
1. Access your MySQL CLI or dashboard (e.g. phpMyAdmin).
2. Create a new database named `diog_lite`:
   ```sql
   CREATE DATABASE diog_lite;
   ```
3. Import the tables and schema from `database/schema.sql`:
   ```bash
   mysql -u your_user -p diog_lite < database/schema.sql
   ```

### 3. Backend Setup
1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file by copying the template:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your local port, database credentials, JWT secret key, and Google Gemini API key.

### 4. Frontend Setup
1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### 5. Running the Application
* **Start Backend Server (from the `backend/` folder):**
  ```bash
  npm run dev
  ```
* **Start Frontend Server (from the `frontend/` folder):**
  ```bash
  npm run dev
  ```
* Open your browser and navigate to `http://localhost:5173`.

---

## Environment Variables

Configure these settings inside `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=diog_lite
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## API Overview

### Authentication Router (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Registers a new patient account | No |
| `POST` | `/login` | Authenticates user & returns JWT | No |
| `GET` | `/me` | Verifies current session details | Yes (JWT) |

### Diagnosis Router (`/api/diagnosis`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/analyse` | Submits symptoms & image for AI analysis | Yes (JWT) |
| `GET` | `/history` | Fetches the user's past diagnostic scans | Yes (JWT) |

---

## AI Workflow

```text
[User Input]  ──► [Symptom Text / Optional Base64 Image]
                       │
                       ▼
[Frontend]    ──► Validates image format (PNG/JPEG/WEBP) & size (<10MB)
                       │
                       ▼
[Backend]     ──► Validates inputs & calls Gemini API Client
                       │
                       ▼
[Gemini AI]   ──► Processes prompt + image (model: gemini-2.5-flash)
                       │
                       ▼
[Validation]  ──► Checks JSON structure, cleans markdown blocks & inserts disclaimer
                       │
                       ▼
[Database]    ──► Saves complete raw response in MySQL JSON column
                       │
                       ▼
[Display]     ──► Returns parsed data structure to React Dashboard UI
```

---

## Security Features

1. **Password Protection:** Hashes passwords with `bcrypt` before storing them in the database.
2. **Authorized Actions:** Protects all patient data endpoints behind a JWT router middleware check.
3. **Payload Inspection:** Prevents oversized image buffers or long symptom descriptions (limit 2000 characters) from overload/DoS.
4. **Data Validation:** Enforces specific image formats (PNG, JPEG, JPG, WEBP) and verifies base64 structures to block corrupted payloads.

---

## Future Improvements

- **Appointment Booking:** Connect diagnostic results directly to a live scheduler.
- **Nearby Hospitals Navigation:** Add active geolocating to search and show hospitals dynamically on a Google Map.
- **PDF Export:** Allow users to export AI analysis summaries as downloadable PDFs to share with their doctors.
- **Email Summaries:** Auto-email report metrics after scan completions.
- **Role-Based Portals:** Add portals for verified clinical doctors to review records shared by patients.

---

## Known Limitations

- **Educational Prototype:** Designed strictly as an internship validation project.
- **AI Assessment Limits:** Outputs can occasionally be inaccurate, incomplete, or suffer from hallucination.
- **Connectivity:** Requires an active internet connection to communicate with Google Gemini services.
- **No Diagnostics Replacement:** Does not replace in-person dermatological consultations or visual tests.

---

## Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Vite](https://vite.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Author

**Developed by:**
* **Nithin Thomas**
* MCA Student
* Internship Project

* **GitHub:** [nithinthomas-github](https://github.com/nithinthomas-github) (placeholder)
* **LinkedIn:** [nithinthomas-linkedin](https://linkedin.com/in/nithinthomas-linkedin) (placeholder)
