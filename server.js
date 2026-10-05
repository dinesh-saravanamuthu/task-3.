const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory book collection (no database required for this task).
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Wings of Fire', author: 'A. P. J. Abdul Kalam' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear' }
];

let nextId = 4;

app.get('/api-info', (req, res) => {
  res.json({
    message: 'Book REST API is running',
    endpoints: {
      getBooks: 'GET /books',
      getBook: 'GET /books/:id',
      createBook: 'POST /books',
      updateBook: 'PUT /books/:id',
      deleteBook: 'DELETE /books/:id'
    }
  });
});

// GET /books - return all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id - return one book
app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json(book);
});

// POST /books - add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (typeof title !== 'string' || !title.trim() || typeof author !== 'string' || !author.trim()) {
    return res.status(400).json({
      error: 'title and author are required and must be non-empty strings'
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update an existing book
app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((item) => item.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author } = req.body;

  if (typeof title !== 'string' || !title.trim() || typeof author !== 'string' || !author.trim()) {
    return res.status(400).json({
      error: 'title and author are required and must be non-empty strings'
    });
  }

  books[bookIndex] = {
    id,
    title: title.trim(),
    author: author.trim()
  };

  res.status(200).json(books[bookIndex]);
});

// DELETE /books/:id - remove a book
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((item) => item.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
});

// Handle invalid JSON bodies.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});

// General error handler.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Book REST API running at http://localhost:${PORT}`);
});
