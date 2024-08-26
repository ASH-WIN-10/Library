const library = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }

  getReadStatusClass() {
    return this.isRead ? 'read' : '';
  }
}

function renderPlaceholder() {
  const main = document.querySelector('main');

  if (!main.hasChildNodes()) {
    const placeholder = document.createElement('div');
    placeholder.className = 'empty';
    placeholder.textContent = 'Empty';
    main.appendChild(placeholder);
  } else if (main.childNodes[0].className === 'empty') {
    main.removeChild(main.childNodes[0]);
  }
}

function addBook(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, isRead);
  library.push(newBook);
  renderBook(newBook);

  document.getElementById('addBookForm').reset();
  document.querySelector('.addBook').close();

  renderPlaceholder();
}

function renderBook(book) {
  const bookCard = document.createElement('div');
  bookCard.className = 'card';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'info';
  infoDiv.innerHTML = `
    <span><b>Title: </b>${book.title}</span>
    <span><b>Author: </b>${book.author}</span>
    <span><b>Pages: </b>${book.pages}</span>
  `;

  const btnsDiv = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  btnsDiv.className = 'btns';

  readBtn.id = 'readBtn';
  readBtn.className = book.getReadStatusClass();

  removeBtn.id = 'removeBtn';
  removeBtn.textContent = 'Remove';
  btnsDiv.append(readBtn, removeBtn);

  bookCard.append(infoDiv, btnsDiv);
  document.querySelector('main').appendChild(bookCard);

  readBtn.addEventListener('click', () => {
    readBtn.classList.toggle('read');
    book.toggleReadStatus();
  });

  removeBtn.addEventListener('click', () => {
    document.querySelector('main').removeChild(bookCard);
    renderPlaceholder();
  });
}

// Dialog
document.querySelector('header > button').addEventListener('click', () => {
  document.querySelector('.addBook').showModal();
});

// Form
document.getElementById('addBookForm').addEventListener('submit', addBook);

// Close button for the dialog
document.getElementById('closeBtn').addEventListener('click', () => {
  document.querySelector('.addBook').close();
});

renderPlaceholder();

