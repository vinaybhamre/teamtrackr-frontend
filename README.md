# 🧠 TeamTrackr – Project & Task Management App

TeamTrackr is a fullstack collaborative project management app built with the MERN stack. It allows users to create workspaces, manage projects, assign tasks, and collaborate with team members — all in one place.

## 🚀 Features

- 🌐 Workspace-based multi-user collaboration
- 👥 Role-based access control (`Owner`, `Admin`, `Member`)
- 📁 Create and manage multiple projects per workspace
- ✅ Assign tasks with priorities, statuses, and due dates
- 🔐 Authentication with password and external provider support
- 🧩 Modular Mongoose schema design
- 🌈 Emoji support for projects!

## 📸 Screenshots

## 🧪 Test Credentials (Demo Login)

Use these credentials to try the app without signing up:

| Role   | Email                | Password    |
| ------ | -------------------- | ----------- |
| Owner  | `owner@example.com`  | `owner123`  |
| Admin  | `admin@example.com`  | `admin123`  |
| Member | `member@example.com` | `member123` |

> These demo users are pre-seeded with realistic data (workspaces, projects, tasks).

## ⚙️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Query
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT, bcrypt, optional OAuth support

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/teamtrackr-frontend.git
cd teamtrackr-frontend
```

```bash
git clone https://github.com/your-username/teamtrackr-backend.git
cd teamtrackr-backend
```

### 2. Install Dependencies

# for both frontend and backend

npm install

### 3. Environment Variables

Create a .env file in both frontend and backend directory:

# Backend

npm run dev

# Frontend (in separate terminal)

npm run dev
Visit: http://localhost:5173 to view the app
