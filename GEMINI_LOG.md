# Project Log: Task Manager

## Progress Summary

1.  **Project Initialization**: Set up a full-stack structure with a Node.js/Express (TypeScript) backend and a React (TypeScript) + Vite frontend.
2.  **Database Layer**:
    *   Configured **PostgreSQL 16** via Docker Compose.
    *   Integrated **Prisma 7** for ORM.
    *   Successfully handled the **Prisma 7 migration hurdle** by moving the `DATABASE_URL` from `schema.prisma` to `prisma.config.ts` to comply with the new configuration standard.
3.  **Backend Development**:
    *   Implemented an Express server with CORS and JSON middleware.
    *   Created a `Task` model with Enums for Status and Priority.
    *   Developed RESTful API routes (GET, POST, PATCH, DELETE) for task management.
4.  **Frontend Development**:
    *   Initialized React/Vite with **Tailwind CSS**.
    *   Developed a modern, dark-mode `TaskCard` component with semi-transparent aesthetics, hover effects, and status-driven animations.
    *   Applied a deep charcoal-to-black gradient theme across the UI.

## Tech Stack

### Backend
*   **Runtime**: Node.js
*   **Language**: TypeScript
*   **Framework**: Express.js
*   **ORM**: Prisma 7
*   **Database**: PostgreSQL 16 (Dockerized)

### Frontend
*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Language**: TypeScript

### DevOps & Tools
*   **Containerization**: Docker / Docker Compose
*   **Environment Management**: Dotenv
