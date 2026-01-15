# DMS

Document Management System (DMS) with a Node/Express backend, Next.js frontend, and MySQL.

## Prerequisites

- Node.js 20+
- Docker Desktop (recommended for MySQL)
- Git

## Quick Start (Docker)

1. Start services:
   ```sh
   docker-compose up --build
   ```
2. Create the schema:
   ```sh
   docker exec -it <mysql-container-name> mysql -u dms_user -p dms < /app/backend/sql/schema.sql
   ```
   Password: `dms_password`

Backend: http://localhost:5000  
Frontend: http://localhost:3000

## Local Dev (No Docker)

### Backend
1. Install deps:
   ```sh
   cd backend
   npm install
   ```
2. Create `.env`:
   ```sh
   copy .env.example .env
   ```
3. Run:
   ```sh
   npm run dev
   ```

### Frontend
1. Install deps:
   ```sh
   cd frontend
   npm install
   ```
2. Run:
   ```sh
   npm run dev
   ```

## Database

Default DB env values are in `backend/.env.example`:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

Schema file:
- `backend/sql/schema.sql`

## API Endpoints

- `GET /documents?parentId=` list documents/folders under a parent (omit for root)
- `GET /documents/search?q=term` search documents/folders
- `POST /documents` create a document (file)
- `POST /documents/folders` create a folder
- `DELETE /documents/:id` soft delete

## Notes

- If port `3306` is already used by local MySQL, change the host port in `docker-compose.yml` or stop the local service.
