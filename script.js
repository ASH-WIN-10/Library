function storageAvailable(type) {
	let storage;
	try {
		storage = window[type];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			e.name === "QuotaExceededError" &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage &&
			storage.length !== 0
		);
	}
}

let library = [];
if (!storageAvailable("localStorage")) {
	console.log("local storage not available");
} else {
	if (JSON.parse(localStorage.getItem("library")))
		library = JSON.parse(localStorage.getItem("library"));
	else localStorage.setItem("library", JSON.stringify([]));
}

class Book {
	constructor(title, author, pages, isRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}

	toggleReadStatus() {
		library = library.map((book) => {
			if (JSON.stringify(book) === JSON.stringify(this)) {
				console.log(this.isRead);
				return new Book(book.title, book.author, book.pages, !book.isRead);
			}
			return book;
		});
		this.isRead = !this.isRead;
		localStorage.setItem("library", JSON.stringify(library));
	}

	getReadStatus() {
		return this.isRead ? "read" : "";
	}

	remove() {
		library = library.filter(
			(book) => JSON.stringify(book) !== JSON.stringify(this)
		);
		localStorage.setItem("library", JSON.stringify(library));
	}
}

function renderPlaceholder() {
	const main = document.querySelector("main");

	if (!main.hasChildNodes()) {
		const placeholder = document.createElement("div");
		placeholder.className = "empty";
		placeholder.textContent = "Empty";
		main.appendChild(placeholder);
	} else if (main.childNodes[0].className === "empty") {
		main.removeChild(main.childNodes[0]);
	}
}

function addBook(event) {
	event.preventDefault();

	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const isRead = document.getElementById("read").checked;

	const newBook = new Book(title, author, pages, isRead);
	library.push(newBook);
	localStorage.setItem("library", JSON.stringify(library));
	renderBook(newBook);

	document.querySelector("form").reset();
	document.querySelector(".addBook").close();

	renderPlaceholder();
}

function renderBook(book) {
	const bookCard = document.createElement("div");
	bookCard.className = "card";

	const infoDiv = document.createElement("div");
	infoDiv.className = "info";
	infoDiv.innerHTML = `
    <span><b>Title: </b>${book.title}</span>
    <span><b>Author: </b>${book.author}</span>
    <span><b>Pages: </b>${book.pages}</span>
  `;

	const btnsDiv = document.createElement("div");
	const readBtn = document.createElement("button");
	const removeBtn = document.createElement("button");
	btnsDiv.className = "btns";

	readBtn.id = "readBtn";
	readBtn.className = book.getReadStatus();

	removeBtn.id = "removeBtn";
	removeBtn.textContent = "Remove";
	btnsDiv.append(readBtn, removeBtn);

	bookCard.append(infoDiv, btnsDiv);
	document.querySelector("main").appendChild(bookCard);

	readBtn.addEventListener("click", () => {
		readBtn.classList.toggle("read");
		book.toggleReadStatus();
	});

	removeBtn.addEventListener("click", () => {
		document.querySelector("main").removeChild(bookCard);
		book.remove();
		renderPlaceholder();
	});
}

function renderPreExistingBooks() {
	for (let book of library) {
		book = new Book(book.title, book.author, book.pages, book.isRead);
		renderBook(book);
	}
}

// Dialog
document.querySelector("header > button").addEventListener("click", () => {
	document.querySelector(".addBook").showModal();
});

// Form
document.querySelector("form").addEventListener("submit", addBook);

// Close button for the dialog
document.getElementById("closeBtn").addEventListener("click", () => {
	document.querySelector(".addBook").close();
});

renderPreExistingBooks();
renderPlaceholder();
