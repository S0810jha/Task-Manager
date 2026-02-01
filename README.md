# Task Dashboard (MERN + Vite + Tailwind) ✅

A simple, self-hosted task management dashboard with user authentication and per-user task lists. The frontend is built with React + Vite + Tailwind and the backend uses Node.js + Express with MongoDB (Mongoose) and JWT-based auth.

---

## Features ✨

- Per-user tasks (each user sees only their own tasks)
- Task CRUD: create, edit (title/description), update status, delete
- Task statuses: `pending`, `in_progress`, `completed`
- Dashboard: total counts, status breakdown and a pie chart
- Profile: get and update user profile

---

## Tech Stack 🔧

- Frontend: **React (Vite)**, **Tailwind CSS**, **Recharts**, **Axios**, **React Router**
- Backend: **Node.js**, **Express**, **MongoDB (Mongoose)**, **JWT**, **validator**

---

## Quickstart (local) ⚡

Requirements: Node.js (>=16), MongoDB.

1. Clone repository

   ```bash
   git clone <repo>
   cd DashBoard
   ```

2. Backend setup

   - Go to `backend/`
   - Create a `.env` file with:
     - `MONGODB_URI` (mongodb connection string, e.g. `mongodb://localhost:27017`)
     - `JWT_SECRET` (secret key for signing tokens)

   ```bash
   cd backend
   npm install
   npm run start      # runs nodemon server.js
   ```

   Server runs on `http://localhost:8080` by default.

3. Frontend setup

   - In `frontend/` create `.env` with:
     - `VITE_BACKEND_URL=http://localhost:8080`

   ```bash
   cd frontend
   npm install
   npm run dev        # runs Vite dev server
   ```

   Frontend runs on `http://localhost:5173` (Vite default).

> 💡 Tip: Use the browser to sign up, then the app stores the token in `localStorage` and uses it for authenticated requests.

---

## API Reference (important endpoints) 📡

All API endpoints (except register/login) require `Authorization: Bearer <token>` header.

User
- POST `/api/user/register` — body: `{ name, email, password }` → returns `{ success, token }`
- POST `/api/user/login` — body: `{ email, password }` → returns `{ success, token }`
- GET `/api/user/get-profile` — returns user profile (no password)
- PUT `/api/user/update-profile` — update profile fields

Tasks
- GET `/api/task/dashboard` — returns dashboard summary and latest tasks
- POST `/api/task/create` — body: `{ title, description, status }`
- PUT `/api/task/:id` — update title/description or status
- DELETE `/api/task/:id` — delete task

Responses generally follow `{ success: boolean, ... }`.

---

## Project structure (short) 📁

- `backend/` — Express app, controllers, models, routes, middlewares
  - `server.js` — entry point
  - `config/db.js` — MongoDB connection (uses `MONGODB_URI`)
  - `middlewares/auth.user.js` — verifies JWT using `JWT_SECRET`
- `frontend/` — React + Vite app
  - `src/context/AppContext.jsx` — central API calls & auth token handling
  - `src/pages/Dashboard.jsx`, `Login.jsx`, `Profile.jsx`

---

## Development Notes 🛠

- JWT secret is `process.env.JWT_SECRET`; tokens are expected in `Authorization` header as `Bearer <token>`.
- Dashboard summary is computed from tasks and returned by `GET /api/task/dashboard`.
- Task validation: `title` is required; `status` must be one of `pending`, `in_progress`, `completed`.

---

## Deploy / Production

- Frontend can be deployed to Vercel (there is a `vercel.json` in `frontend/`). Ensure `VITE_BACKEND_URL` points to your production API.
- Backend should set `MONGODB_URI` and `JWT_SECRET` securely (e.g., environment variables on the server).

---

## Contributing & Notes 🤝

- Feel free to open issues or PRs. Add tests if you extend backend logic.
- There are no automated tests in this repo yet.

---

## License

MIT (or add whichever license you'd like)


---

##Author 
Shubham Jhan

