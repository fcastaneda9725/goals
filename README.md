# Goals managment

Small app for goal managment

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker is installed on your machine.
- Node.js is installed on your machine.
- Angular CLI is installed on your machine.

## Setting Up the Project

Follow these steps to get your project up and running:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/fcastaneda9725/goals
cd goals
```

2. Set Up the Database with Docker
Navigate to the project directory and build the Docker container which includes your database setup:

```bash
docker-compose up -d
```

3. Configure Environment Variables
Copy the env.local file to .env in the backend service:

```bash
cp packages/backend/prisma/env.local packages/backend/prisma/.env
```

This file contains necessary environment variables for the database connection and other configurations.

4. Run Prisma Migrations
Navigate to the backend directory and run the Prisma migrations to set up your database schema:

```bash
cd packages/backend
npx prisma migrate dev
```

5. Install Dependencies
From the project root directory, install all dependencies:

```bash
pnpm install
```

6. Run the Project
You can start both the backend and frontend together (if configured) or separately from the project root:

```bash
pnpm start
```

This command is configured to start both the backend server and the frontend application, as defined in your package.json.
