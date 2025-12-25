# Task Manager API

REST API for task management built with NestJS, PostgreSQL, and Prisma ORM.

## Tech Stack

- **NestJS** — Node.js framework
- **PostgreSQL** — Database
- **Prisma** — ORM
- **Docker** — Containerization
- **Swagger** — API documentation
- **class-validator** — Data validation

## Requirements

- Node.js ^20.19.0, ^22.12.0, or ^24.0.0
- Docker & Docker Compose
- npm

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-manager-api

# Install dependencies
npm install
```

## Environment Setup

Create a `.env` file in the project root:

```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DATABASE=
POSTGRES_URI=
```

## Running the App

```bash
# Start PostgreSQL in Docker
docker-compose up -d

# Apply Prisma migrations
npx prisma db push

# Start the server in development mode
npm run start:dev
```

Server will be available at `http://localhost:3001`

## API Documentation

Swagger UI is available at: `http://localhost:3001/api`

## API Endpoints

| Method   | Endpoint    | Description    |
| -------- | ----------- | -------------- |
| `POST`   | `/task`     | Create a task  |
| `GET`    | `/task`     | Get all tasks  |
| `GET`    | `/task/:id` | Get task by ID |
| `PATCH`  | `/task/:id` | Update task    |
| `DELETE` | `/task/:id` | Delete task    |

### Query Parameters

| Parameter | Values                                     | Description                       |
| --------- | ------------------------------------------ | --------------------------------- |
| `status`  | `TODO`, `IN_PROGRESS`, `DONE`, `CANCELLED` | Filter by status                  |
| `sort`    | `createdAt`, `updatedAt`, `title`          | Sort field (default: `createdAt`) |
| `order`   | `asc`, `desc`                              | Sort order (default: `desc`)      |

**Examples:**

```
GET /task?status=TODO
GET /task?sort=title&order=asc
GET /task?status=IN_PROGRESS&sort=createdAt&order=desc
```

## Task Model

```typescript
{
  id: string;          // UUID
  title: string;       // Task title
  description?: string; // Description (optional)
  status: TaskStatus;  // TODO | DONE | IN_PROGRESS | CANCELLED
  createdAt: Date;     // Creation date
  updatedAt: Date;     // Last update date
}
```

## Request Examples

### Create a Task

```bash
curl -X POST http://localhost:3001/task \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, bread, eggs"}'
```

### Get All Tasks

```bash
curl http://localhost:3001/task
```

### Update Task Status

```bash
curl -X PATCH http://localhost:3001/task/<id> \
  -H "Content-Type: application/json" \
  -d '{"status": "DONE"}'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3001/task/<id>
```

## Useful Commands

```bash
# Build the project
npm run build

# Run in production mode
npm run start:prod

# Prisma Studio (Database GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Stop Docker containers
docker-compose down
```

## Project Structure

```
src/
├── main.ts                 # Entry point
├── app.module.ts           # Main module
├── prisma/
│   ├── prisma.module.ts    # Prisma module
│   └── prisma.service.ts   # Prisma service
└── task/
    ├── task.module.ts      # Task module
    ├── task.controller.ts  # Controller
    ├── task.service.ts     # Service
    └── dto/
        ├── create-task.dto.ts      # Create DTO
        ├── update-task.dto.ts      # Update DTO
        └── task-response.dto.ts    # Response DTOs
```

## License

MIT
