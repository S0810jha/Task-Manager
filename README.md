# Task Dashboard (MERN + Vite + Tailwind)

A simple task management dashboard built with:

- **Frontend:** React + Vite + Tailwind CSS + Recharts  
- **Backend:** Node.js + Express + MongoDB (Mongoose)  
- **Auth:** JWT-based authentication  
- **Features:** Task CRUD, status tracking, dashboard stats, and a status pie chart.

---

## Features

- **Authenticated user tasks**
  - Each user sees only their own tasks.

- **Task CRUD**
  - Create task (title, description, status)
  - Edit task text (title & description)
  - Update status: `pending`, `in_progress`, `completed`
  - Delete task

- **Dashboard overview**
  - Total tasks
  - Pending / In Progress / Completed counts
  - Latest tasks list
  - Pie chart of tasks by status

- **Profile**
  - Fetch and display logged-in user profile (`/api/user/get-profile`)

---

## Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS
- Recharts (Pie chart)
- Axios
- React Router

**Backend**

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Validator

---

## Project Structure

```text
.
├── backend/
│   ├── controllers/
│   │   └── task.controller.js
│   ├── models/
│   │   └── task.model.js
│   ├── routes/
│   │   └── task.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js        
│   ├── server.js / index.js          
│   └── .env                          
│
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── AppContext.jsx
    │   ├── pages/
    │   │   └── Dashboard.jsx
    │   ├── component/
    │   │   ├── Headers.jsx
    │   │   ├── StateCard.jsx
    │   │   ├── AddTask.jsx
    │   │   ├── Chart.jsx
    │   │   └── ListTask.jsx
    │   ├── App.jsx
    │   └── main.jsx / main entry
    ├── index.css / tailwind.css
    └── vite.config.js
