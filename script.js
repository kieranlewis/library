let myLibrary = [];
const table = document.querySelector('.books');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let readString;
    if(this.read) {
        readString = 'read';
    } else {
        readString = 'not read';
    }
    return [this.title, this.author, this.pages, readString];
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

function populateTable(books = [], table) {
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }

    books.map((book, i) => {
        let row = table.insertRow(i+1);
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let pages = row.insertCell(2);
        let read = row.insertCell(3);

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        read.innerHTML = book.read;
    })
}

function addBook(e) {
    e.preventDefault();
    console.log(document.forms["addBookForm"]);
    const title = addForm.querySelector('#title').value;
    const author = addForm.querySelector('#author').value;
    const pages = addForm.querySelector('#pages').value;
    const read = addForm.querySelector('#read').value;
    const book = new Book(title, author, pages, read);
    
    myLibrary.push(book);
    populateTable(myLibrary, table);
}

//Add book
const addForm = document.forms['addBookForm'];
addForm.addEventListener('submit', addBook);

//dummy list of books
let bookA = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let bookB = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 352, true);
let bookC = new Book('Pride & Prejudice', 'Jane Austen', 384, false);
myLibrary.push(bookA, bookB, bookC);
populateTable(myLibrary ,table);
