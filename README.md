# School Management Mini System

A simple full stack web application to manage students and their tasks/assignments.

## Features

- Admin login authentication (JWT-based)
- Student management
  - Add student
  - Edit student details
  - Delete student
  - View student list
- Task / assignment management
  - Assign task to student
  - Mark task as completed
  - View assigned tasks
- Dashboard view after login

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JSON Web Token (JWT)

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    seedAdmin.js
    server.js
frontend/
  src/
    components/
    services/
    App.jsx
    main.jsx
```

## Setup Instructions

### 1. Clone repository

```bash
git clone <your-repo-url>
cd gridaan
```

### 2. Configure environment variables

Create files from examples:

- `backend/.env` from `backend/.env.example`
- `frontend/.env` from `frontend/.env.example`

Default backend admin credentials:

- Email: `admin@school.com`
- Password: `admin123`

### 3. Install dependencies

```bash
npm run install:all
```

Or install individually:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 4. Start backend

```bash
npm run dev:backend
```

Backend runs on `http://localhost:5000`.

### 5. Start frontend (new terminal)

```bash
npm run dev:frontend
```

Frontend runs on `http://localhost:5173`.

## API Endpoints

### Auth

- `POST /api/auth/login`

### Students (Protected)

- `GET /api/students`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`

### Tasks (Protected)

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id/status`

## Example Flow

1. Login as admin
2. Add a student (e.g., Rahul, Class 10)
3. Assign a task to Rahul
4. Mark the task as completed

## Notes

- Ensure MongoDB is running locally or set `MONGO_URI` to your cloud MongoDB connection string.
- Only authenticated admin can access dashboard operations.
