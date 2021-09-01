let myLibrary = [];
const booksList = document.querySelector('.books');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let readString;
    if(this.read) {
        readString = 'has been read';
    } else {
        readString = 'not read yet';
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
}

function addBookToLibrary() {
    let title = prompt('Enter a title');
    let author = prompt('Enter the author');
    let pages = prompt('Enter the number of pages');
    let read = prompt('Have you read the book before, y/n');

    read = read == 'y' ?  true : false;  

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    let book;
    //loops through all books in myLibrary
    for(let i = 0; i < myLibrary.length; i++) {
        book = myLibrary[i];
        const li = document.createElement('li');
        li.textContent = book.info();
        
        booksList.appendChild(li);
    }
}

//dummy list of books
let bookA = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let bookB = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 352, true);
let bookC = new Book('Pride & Prejudice', 'Jane Austen', 384, false);
myLibrary.push(bookA, bookB, bookC);
displayBooks();