const books = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // info() {
  //   return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
  // }
}

function addBookToLibrary(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  // const newBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
  books.push(newBook);
  showBooks();

  addBookForm.reset();
  addBookDialog.close();
}

function showBooks() {
  const library = document.querySelector('main');
  const bookCard = document.createElement('div');
  books.forEach(book => {
    bookCard.innerHTML = `
    <span>${book.title}</span>
    <div>
      <button>Not Complete</button>
      <button>Remove</button>
    </div>
    `;
    library.appendChild(bookCard);
  });
}

// Dialog

const addBookDialog = document.querySelector('.addBook');
const addBtn = document.querySelector('header > button');

addBtn.addEventListener('click', () => {
  addBookDialog.showModal();
});

// Form

const addBookForm = document.querySelector('form');
addBookForm.addEventListener('submit', addBookToLibrary);