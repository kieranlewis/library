let myLibrary = [];

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

let bookA = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);