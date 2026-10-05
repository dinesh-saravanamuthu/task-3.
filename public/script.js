const form = document.getElementById('bookForm');
const bookId = document.getElementById('bookId');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksList = document.getElementById('booksList');
const message = document.getElementById('message');
const cancelBtn = document.getElementById('cancelBtn');
const refreshBtn = document.getElementById('refreshBtn');

async function loadBooks() {
  booksList.textContent = 'Loading...';
  try {
    const response = await fetch('/books');
    const books = await response.json();
    if (!books.length) {
      booksList.innerHTML = '<div class="empty">No books available.</div>';
      return;
    }
    booksList.innerHTML = books.map(book => `
      <div class="book">
        <div>
          <h3>${escapeHtml(book.title)}</h3>
          <p>by ${escapeHtml(book.author)} · ID: ${book.id}</p>
        </div>
        <div class="actions">
          <button onclick="editBook(${book.id})">Edit</button>
          <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    booksList.innerHTML = '<div class="empty">Could not connect to the server.</div>';
  }
}

async function editBook(id) {
  const response = await fetch(`/books/${id}`);
  if (!response.ok) return;
  const book = await response.json();
  bookId.value = book.id;
  title.value = book.title;
  author.value = book.author;
  cancelBtn.hidden = false;
  title.focus();
}

async function deleteBook(id) {
  if (!confirm('Delete this book?')) return;
  const response = await fetch(`/books/${id}`, { method: 'DELETE' });
  const data = await response.json();
  showMessage(response.ok ? data.message : data.error);
  loadBooks();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = { title: title.value.trim(), author: author.value.trim() };
  const id = bookId.value;
  const url = id ? `/books/${id}` : '/books';
  const method = id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  showMessage(response.ok ? (id ? 'Book updated successfully.' : 'Book added successfully.') : result.error);
  if (response.ok) resetForm();
  loadBooks();
});

cancelBtn.addEventListener('click', resetForm);
refreshBtn.addEventListener('click', loadBooks);

function resetForm() {
  form.reset();
  bookId.value = '';
  cancelBtn.hidden = true;
}

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => { message.textContent = ''; }, 3000);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

loadBooks();
