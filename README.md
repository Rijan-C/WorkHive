# MERN Project

A clean MERN stack starter:

- MongoDB + Mongoose
- Express API
- React + Vite frontend
- Shared root scripts for local development

## Setup

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Create environment files:

   ```bash
   copy backend\.env.example backend\.env
   copy frontend\.env.example frontend\.env
   ```

3. Update `backend/.env` with your MongoDB connection string.

4. Start the full app:

   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:5000`.
Frontend runs on `http://localhost:5173`.
