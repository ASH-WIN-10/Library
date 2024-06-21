function Book(bookName, authorName, pages, read) {
  this.bookName = bookName;
  this.authorName = authorName;
  this.pages = pages;
  this.read = read;

  // this.info = function () {
  //   let readInfo = "Read it.";
  //   if (!this.read) readInfo = "Not read it, yet.";

  //   const bookInfo = `${this.bookName} by ${this.authorName}; ${this.pages} pages; ${readInfo}`;
  //   return bookInfo;
  // };
}
  
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// console.log(theHobbit.info());