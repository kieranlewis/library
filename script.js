let myLibrary = JSON.parse(localStorage.getItem('books')) || [];
const table = document.querySelector('.books');
const addForm = document.forms['addBookForm'];

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

Book.prototype.toggleStatus = function() {
    this.read = !this.read;
    populateTable(myLibrary, table);
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function populateTable(books = [], table) {
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }

    books.map((book, i) => {
        // add row into table
        let row = table.insertRow(i+1);
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let pages = row.insertCell(2);
        let read = row.insertCell(3);
        let removeBook = row.insertCell(4);

        // populate cells
        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        read.innerHTML = `<button>${book.read}</button>`
        removeBook.innerHTML = `<button [data-index]="${i}">Remove Book</button>`;
        
        removeBook.addEventListener('click', (e) => {
            let index = e.target.getAttribute('[data-index]');
            myLibrary.splice(index, 1);
            populateTable(myLibrary, table);
            localStorage.setItem('books', JSON.stringify(myLibrary));
        });

        read.addEventListener('click', () => { book.toggleStatus(); });
    })
}

function addBook(e) {
    e.preventDefault();
    const title = addForm.querySelector('#title').value;
    const author = addForm.querySelector('#author').value;
    const pages = addForm.querySelector('#pages').value;
    const read = checkRadioSelected();

    const book = new Book(title, author, pages, read);
    
    myLibrary.push(book);
    populateTable(myLibrary, table);
    localStorage.setItem('books', JSON.stringify(myLibrary));
    addForm.reset();
}

function checkRadioSelected() {
    const read = addForm.querySelector('#radio-read');
    const notRead = addForm.querySelector('#radio-not-read');

    if(read.checked) {
        return true
    } else if(notRead.checked) {
        return false;
    }
}

//Add book
addForm.addEventListener('submit', addBook);

//dummy list of books
/*
let bookA = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let bookB = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 352, true);
let bookC = new Book('Pride & Prejudice', 'Jane Austen', 384, false);
myLibrary.push(bookA, bookB, bookC);*/

// the way local storage works is it does not keep functions so have to replace each item in the array with a book version of itself
myLibrary.forEach(object => {
    let index = myLibrary.indexOf(object);
    const book = new Book(object.title, object.author, object.pages, object.read);
    myLibrary.splice(index, 1, book);
}); 
populateTable(myLibrary ,table);
