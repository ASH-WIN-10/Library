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

  readBtnClassName() {
    if (this.read === true)
      return "read";
    else
      return;
  }
}


function placeholderInMain() {
  const main = document.querySelector('main');
  
  if (main.hasChildNodes() === false) {
    const placeholder = document.createElement('div');
    placeholder.className = "empty";
    placeholder.textContent = "Empty";
    main.appendChild(placeholder);
  }
  else if (main.childNodes[0].className === "empty") {
    const placeholder = document.querySelector('.empty');
    main.removeChild(placeholder);
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

  placeholderInMain();
}


function showBooks(book) {
  const library = document.querySelector('main');
  const bookCard = document.createElement('div');
  bookCard.className = "card";


  // Creating and adding elements in the Book Card
  const infoDiv = document.createElement('div');
  infoDiv.className = "info";
  infoDiv.innerHTML = `
    <span><b>Title: </b>${book.title}</span>
    <span><b>Author: </b>${book.author}</span>
    <span><b>Pages: </b>${book.pages}</span>
  `;

  const btnsDiv = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  btnsDiv.className = "btns";

  readBtn.id = "readBtn";
  readBtn.className = book.readBtnClassName();

  removeBtn.id = "removeBtn";
  removeBtn.textContent = "Remove";
  btnsDiv.append(readBtn, removeBtn);

  bookCard.append(infoDiv, btnsDiv);
  library.appendChild(bookCard);


  // Read Button logic
  readBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('read');
    book.updateReadStatus();
  });


  // Remove Button logic
  removeBtn.addEventListener('click', () => {
    library.removeChild(bookCard);
    placeholderInMain();
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


// Checks if Main has any children and adds a placeholder if it doesn't
placeholderInMain();


// Close button for the dialog
const closeBtn = document.querySelector('#closeBtn');
closeBtn.addEventListener('click', () => {
  addBookDialog.close();
});