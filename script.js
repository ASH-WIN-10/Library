const books = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  updateReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  const newBook = new Book(title, author, pages, read);
  books.push(newBook);
  showBooks(newBook);
  
  addBookForm.reset();
  addBookDialog.close();
}

function showBooks(newBook) {
  const library = document.querySelector('main');
  const bookCard = document.createElement('div');
  bookCard.className = "card"

  const infoDiv = document.createElement('div');
  infoDiv.className = "info";
  infoDiv.innerHTML = `
    <span><b>Title: </b>${newBook.title}</span>
    <span><b>Author: </b>${newBook.author}</span>
    <span><b>Pages: </b>${newBook.pages}</span>
  `;

  const btnsDiv = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  btnsDiv.className = "btns"
  readBtn.id = "readBtn";
  removeBtn.id = "removeBtn";
  removeBtn.textContent = "Remove";
  btnsDiv.append(readBtn, removeBtn);

  bookCard.append(infoDiv, btnsDiv);

  library.appendChild(bookCard);

  readBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('read');
    newBook.updateReadStatus();
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