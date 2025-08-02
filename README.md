# Task Manager API

A RESTful API for managing tasks built with Node.js and Express. This project provides a simple task management system with full CRUD operations.

## Overview

This is a backend API that allows you to:
- Create new tasks
- Retrieve all tasks or specific tasks by ID
- Update existing tasks
- Delete tasks

The API uses a JSON file (`task.json`) as a simple data store and provides proper error handling and validation.

## Features

- ✅ Full CRUD operations for tasks
- ✅ Data validation
- ✅ Error handling
- ✅ RESTful API design
- ✅ JSON file-based storage
- ✅ Comprehensive test suite

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Nodemon** - Development server with auto-restart
- **Tap** - Testing framework
- **Supertest** - HTTP testing library

## Setup Instructions

### Prerequisites

- Node.js version 18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-api-RG-Le
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

### Running Tests

```bash
npm test
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Task Object Structure
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false
}
```

### Endpoints

#### 1. Get All Tasks
**GET** `/tasks`

Returns a list of all tasks.

**Response:**
- **200 OK** - Array of task objects
```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  }
]
```

**Test with curl:**
```bash
curl -X GET http://localhost:3000/tasks
```

#### 2. Get Task by ID
**GET** `/tasks/:id`

Returns a specific task by its ID.

**Parameters:**
- `id` (number) - The task ID

**Response:**
- **200 OK** - Task object
- **404 Not Found** - Task not found

**Test with curl:**
```bash
curl -X GET http://localhost:3000/tasks/1
```

#### 3. Create New Task
**POST** `/tasks`

Creates a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```

**Validation:**
- `title` (required) - string
- `description` (required) - string
- `completed` (required) - boolean

**Response:**
- **201 Created** - Created task object with generated ID
- **400 Bad Request** - Invalid data

**Test with curl:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "completed": false
  }'
```

#### 4. Update Task
**PUT** `/tasks/:id`

Updates an existing task.

**Parameters:**
- `id` (number) - The task ID

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

**Validation:**
- `title` (required) - string
- `description` (required) - string
- `completed` (required) - boolean

**Response:**
- **200 OK** - Updated task object
- **400 Bad Request** - Invalid data
- **404 Not Found** - Task not found

**Test with curl:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true
  }'
```

#### 5. Delete Task
**DELETE** `/tasks/:id`

Deletes a task by its ID.

**Parameters:**
- `id` (number) - The task ID

**Response:**
- **200 OK** - Success message
- **404 Not Found** - Task not found

**Test with curl:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Testing the API

### Using curl

You can test all endpoints using curl commands as shown in the examples above.

### Using Postman

1. Import the following collection or create requests manually
2. Set the base URL to `http://localhost:3000`
3. Use the endpoints listed above

### Using the Test Suite

The project includes a comprehensive test suite that covers:

- ✅ Creating tasks with valid data
- ✅ Creating tasks with invalid data (400 error)
- ✅ Getting all tasks
- ✅ Getting specific tasks by ID
- ✅ Getting non-existent tasks (404 error)
- ✅ Updating tasks with valid data
- ✅ Updating tasks with invalid data (400 error)
- ✅ Updating non-existent tasks (404 error)
- ✅ Deleting tasks
- ✅ Deleting non-existent tasks (404 error)

Run the tests:
```bash
npm test
```

## Error Responses

The API returns consistent error responses:

### 400 Bad Request
```json
{
  "error": "Invalid task data"
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

## File Structure

```
task-manager-api-RG-Le/
├── app.js              # Main application file
├── task.json           # Data storage file
├── package.json        # Project dependencies and scripts
├── test/
│   └── server.test.js  # Test suite
└── README.md           # This file
```

## Development

### Starting the Development Server
```bash
npm start
```

The server uses nodemon for automatic restart when files change.

### Project Scripts

- `npm start` - Start the development server with nodemon
- `npm test` - Run the test suite
- `npm run pretest` - Check Node.js version before running tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

ISC License 