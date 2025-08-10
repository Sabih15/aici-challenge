# AICI Challenge

This repository contains a multi-service system built with Angular (frontend) and Node.js/Express (backend services), communicating over REST APIs. The backend services connect to PostgreSQL databases. Docker and Docker Compose are used for easy setup and deployment.

---

## Technologies Used

- Frontend: Angular 14+ (standalone components)  
- Backend: Node.js (v18 Alpine image in Docker), Express.js, Prisma ORM  
- Databases: PostgreSQL (version 13)  
- Containerization: Docker, Docker Compose  
- Node version for local development: v22.15 or later

---

## Prerequisites

- Docker (version 20+ recommended)  
- Docker Compose (version 1.29+ recommended)  
- (Optional) Node.js v22.15 or later if running services locally without Docker

---

## Node.js Version

- The Docker containers use Node.js version 18 (via the `node:18-alpine` image).  
- For local development (running services without Docker), Node.js v22.15 or later is recommended.

---

## Getting Started: Build and Run with Docker Compose

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Sabih15/aici-challenge.git
   cd aici-challenge
Configure environment variables (optional)
Default environment variables are set in the docker-compose.yml.
To customize, edit the environment variables inside each service’s section or create .env files accordingly.

Build and start all services
Run the following command to build images and start all containers (frontend, backend services, and databases):

bash
Copy
Edit
docker-compose up --build
Access the system

Frontend: http://localhost:3000

User Service API: http://localhost:8000

Todo Service API: http://localhost:8001

Stop the system
Press Ctrl+C in the terminal running Docker Compose, then optionally run:

bash
Copy
Edit
docker-compose down
Project Structure Overview
frontend-service/ — Angular frontend app, served via Nginx on port 3000

user-service/ — Node.js backend for user management on port 8000

todo-service/ — Node.js backend for todo management on port 8001

user-db/ & todo-db/ — PostgreSQL containers for respective services

Notes
Backend services use Prisma ORM, which runs migrations during build (npx prisma generate).

PostgreSQL data is persisted using Docker volumes (user-data and todo-data).

JWT secrets and DB connection info are set via environment variables in docker-compose.yml.

Frontend uses Angular’s production build served by Nginx.

Running Services Locally (Without Docker)
If you prefer to run services locally for development and testing, follow these steps:

Install Node.js v22.15 or later

Navigate to each service folder (frontend-service, user-service, todo-service) and install dependencies:

bash
Copy
Edit
npm install
Set environment variables
Create .env files in user-service and todo-service folders with the appropriate database URLs, JWT secret, and ports, similar to the .env examples provided.

Run Prisma migrations (if needed)

bash
Copy
Edit
npx prisma generate
Start the backend services

bash
Copy
Edit
npm start
Start the frontend (in frontend-service)

bash
Copy
Edit
npm run start

Access the system on the corresponding ports configured in .env.