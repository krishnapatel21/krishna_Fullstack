# React + Node.js Jenkins Demo Project

A simple full-stack Task Manager designed for learning GitHub + Jenkins CI.

## Structure

```text
react-node-jenkins-project/
├── frontend/       # React + Vite
├── backend/        # Node.js + Express
├── Jenkinsfile     # Jenkins CI pipeline
└── README.md
```

## Requirements

- Node.js 20+
- npm 10+
- Git
- Jenkins

## Run locally

### Backend

```bash
cd backend
npm install
npm start
```

Backend: http://localhost:5000

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

The frontend calls the backend API at `http://localhost:5000/api/tasks`.

## Jenkins pipeline

The included `Jenkinsfile` runs:

1. Checkout source code
2. Install backend dependencies
3. Run backend tests
4. Install frontend dependencies
5. Build the React application
6. Archive the frontend build as a Jenkins artifact

For Jenkins, create a **Pipeline** job and point it to this GitHub repository, or use Pipeline script from SCM with `Jenkinsfile`.

## GitHub upload

```bash
git init
git add .
git commit -m "Initial React Node Jenkins project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/react-node-jenkins-project.git
git push -u origin main
```

Do not commit `node_modules/` or `.env` files.
