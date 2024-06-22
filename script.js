const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


// Dialog

const addBookDialog = document.querySelector('.addBook');
const addBtn = document.querySelector('header > button');

addBtn.addEventListener('click', () => {
  addBookDialog.showModal();
});

// Form

const addBookForm = document.querySelector('form');

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
});