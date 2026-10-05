# Task 3 - Book REST API

A simple REST API for managing a list of books using **Node.js** and **Express.js**. The project follows the Task 3 requirements: CRUD operations are implemented without a database, so books are stored in memory.

## Features

- GET all books
- GET one book by ID
- POST a new book
- PUT/update a book by ID
- DELETE a book by ID
- JSON request/response handling
- CORS middleware
- Simple HTML/CSS/JavaScript frontend for managing books
- Basic input validation
- 400, 404 and 500 error handling

## Requirements

- Node.js 18+ recommended
- npm
- Postman (optional, for testing)

## Installation

```bash
npm install
```

## Run the server

```bash
npm start
```

The API runs on:

`http://localhost:3000`

Open `http://localhost:3000` in your browser to use the HTML book-management interface.

For development with Node's watch mode:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book |
| POST | `/books` | Add a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

### POST /books body

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

### PUT /books/:id body

```json
{
  "title": "Clean Code - Updated",
  "author": "Robert C. Martin"
}
```

## Example curl tests

Get all books:

```bash
curl http://localhost:3000/books
```

Add a book:

```bash
curl -X POST http://localhost:3000/books \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Clean Code","author":"Robert C. Martin"}'
```

Update book 1:

```bash
curl -X PUT http://localhost:3000/books/1 \\
  -H "Content-Type: application/json" \\
  -d '{"title":"The Alchemist - Updated","author":"Paulo Coelho"}'
```

Delete book 1:

```bash
curl -X DELETE http://localhost:3000/books/1
```

## HTTP status codes used

- `200 OK` - successful GET, PUT and DELETE
- `201 Created` - successful POST
- `400 Bad Request` - invalid/missing request data or invalid JSON
- `404 Not Found` - book or route does not exist
- `500 Internal Server Error` - unexpected server error

## Notes

The books are stored in an in-memory JavaScript array. Restarting the server resets the book list to the sample data. No database is required for this task.

## Interview Questions - Quick Answers

1. **What is REST?** A style for designing network APIs around resources and standard HTTP methods.
2. **What are HTTP methods?** GET reads, POST creates, PUT updates/replaces, and DELETE removes resources.
3. **How do you handle routes in Express?** With methods such as `app.get()`, `app.post()`, `app.put()` and `app.delete()`.
4. **What is middleware?** A function that runs during the request-response cycle and can modify the request/response or pass control onward.
5. **How do you parse JSON in Express?** Use `app.use(express.json())`.
6. **What status codes are used for CRUD?** Commonly 200, 201, 400 and 404, depending on the result.
7. **How do you handle errors?** Validate input, return suitable HTTP status codes, and use Express error-handling middleware.
8. **What is CORS?** Cross-Origin Resource Sharing, which controls whether browsers can make requests across origins.
9. **What are request and response objects?** `req` contains incoming request data; `res` is used to send the server response.
10. **How do you test API endpoints?** With Postman, curl, or another HTTP client.
