# 🎯 TaskFlow | Modern Task Manager

A production-ready, full-stack task management application featuring a sleek glassmorphism UI, optimistic updates, type-safe APIs, and one-click cloud deployment.

![Dashboard Preview](https://via.placeholder.com/1200x600/0f172a/60a5fa?text=Task+Manager+Dashboard)

---

## ✨ Features
- 🖥️ **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS 4, Framer Motion animations, responsive glassmorphism design
- 🛠️ **Backend**: Node.js + Express + TypeScript, Prisma ORM, PostgreSQL, centralized error handling, Docker health checks
- 🐳 **DevOps**: Docker Compose (3 services), unified access via `:5100`, Render Blueprint automation
- ⚡ **Performance**: Optimistic UI updates, skeleton loading states, debounced inputs, memoized components
- 🔒 **Reliability**: CORS configured, type-shared interfaces, auto-restart policies, Prisma migration safety

---

## 🛠️ Tech Stack
| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS 4, Framer Motion, Lucide Icons, Axios |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM, Zod (validation), Morgan/Winston (logging) |
| **Database** | PostgreSQL 16, UUID primary keys, Enum constraints, Row-level security ready |
| **DevOps** | Docker, Docker Compose, Nginx (static serving), Render Blueprint, GitHub Actions ready |

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop & Docker Compose v2+
- Node.js 20+ & npm/pnpm
- Git

### 1. Clone & Navigate
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager


2. Run with Docker (Recommended)

# Build and start all services (DB, API, UI)
docker-compose up --build -d

# Stream logs to monitor startup
docker-compose logs -f

✅ Live at: http://localhost:5100


3. Local Development (Split Terminals)

# Terminal 1: Database
docker-compose up -d db

# Terminal 2: Backend (Port 5000)
cd backend
npm install
npm run dev

# Terminal 3: Frontend (Port 5173)
cd frontend
npm install
npm run dev

✅ Frontend proxies /api → http://localhost:5000 automatically.
📂 Project Structure


Task-Manager/
├── 📄 README.md
├── 📄 render.yaml              # Render Blueprint config
├── 📄 docker-compose.yml       # Multi-service orchestration
├── 📁 backend/                 # Node/Express API
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 prisma/schema.prisma
│   ├── 📁 src/
│   │   ├── 📄 index.ts         # Server init + /api/health
│   │   ├── 📁 routes/          # Task CRUD controllers
│   │   └── 📁 middleware/      # CORS, error handler, logger
│   └── 📄 Dockerfile
├── 📁 frontend/                # React/Vite UI
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts       # Dev proxy & build settings
│   ├── 📄 tailwind.config.js
│   ├── 📁 src/
│   │   ├── 📄 main.tsx
│   │   ├── 📄 App.tsx          # Routing + skeleton loader
│   │   ├── 📁 components/      # TaskCard, NewTaskModal, Header
│   │   ├── 📁 hooks/           # useTasks (API + optimistic updates)
│   │   └── 📁 types/           # Shared Task/Status/Priority interfaces
│   └── 📄 Dockerfile           # Multi-stage Nginx build
└── 📁 scripts/                 # Utility scripts
    └── 📄 keep-alive.ts        # Render free-tier uptime pinger


    🔌 API Reference
Base URL: http://localhost:5100/api (via Vite proxy) or http://localhost:5000/api (direct)
Endpoints

Method
Path
Description
Auth
GET
/tasks
List all tasks (sorted by createdAt DESC)
❌
POST
/tasks
Create new task
❌
PATCH
/tasks/:id
Update status/priority/details
❌
DELETE
/tasks/:id
Remove task permanently
❌
GET
/health
Docker/Render health check
❌
Request/Response Example
POST /tasks

{
  "title": "Deploy to Render",
  "description": "Push blueprint and verify health checks",
  "priority": "HIGH",
  "status": "TODO"
}

Response 201 Created

{
  "id": "a1b2c3d4-...",
  "title": "Deploy to Render",
  "description": "Push blueprint and verify health checks",
  "priority": "HIGH",
  "status": "TODO",
  "createdAt": "2026-04-09T12:00:00.000Z"
}

☁️ Deployment (Render)

This project ships with a render.yaml Blueprint for infrastructure-as-code deployment.
Steps
Push code to GitHub (ensure render.yaml is in root)
Go to Render Dashboard → New Blueprint Instance
Connect your repository
Render auto-parses render.yaml and provisions:
🗄️ PostgreSQL 16 database
🖥️ Backend web service (auto-builds Prisma)
Frontend static site (Vite → Nginx)
Post-Deploy: Copy your backend URL from Render dashboard, update render.yaml line ~38 with the real URL, commit & push. Render will auto-sync.
Free Tier Optimization
Services spin down after 15m idle
Run npm run keep-alive or enable Render Cron Jobs to ping /api/health every 10m
Upgrade to Starter ($7/mo) for always-on backend

⚙️ Environment Variables
Variable
Service
Default/Source
Description
DATABASE_URL
Backend
Render DB
postgresql://user:pass@host:5432/dbname
PORT
Backend
5000
Express server port
NODE_ENV
Backend
production
Enables Prisma optimize & logging
VITE_API_BASE_URL
Frontend
Render service host
Production API base URL
🐛 Troubleshooting
Issue
Fix
Blank page on :5100
Run docker-compose logs frontend → check Vite build errors
API returns 500
Verify DATABASE_URL matches running DB container
CORS errors
Ensure cors({ origin: '*' }) in backend/src/index.ts (dev)
Port 5100 occupied
Change host mapping in docker-compose.yml → 5101:80
Prisma client missing
Run npx prisma generate inside backend container
Styles not updating
Hard refresh Ctrl+Shift+R or rebuild frontend container
🤝 Contributing
Fork the repo
Create branch: git checkout -b feat/your-feature
Commit: git commit -m "feat: add dark mode toggle"
Push: git push origin feat/your-feature
Open Pull Request
Code Standards: TypeScript strict mode, ESLint + Prettier, component-driven architecture, ARIA accessible, optimistic UI patterns.
📄 License
MIT License © 2026 NeuralTask Contributors. Free for personal & commercial use.
Built with precision using React, Node.js, Prisma, Docker & Render. ⚡
