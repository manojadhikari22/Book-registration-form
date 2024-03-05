
const books = [];
const audioBooks = [];

// Selecting the elements from the DOM
const bookForm = document.querySelector('.book-form');

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const selectElement = document.querySelector('.format');
const isbn = document.querySelector('.isbn');
const narrator = document.querySelector('.narrator');

const booksUL = document.querySelector('.physical-books-list');
const audioBooksUL = document.querySelector('.audio-books-list');

const displayPhysicalBookContainer = document.querySelector('.display-physical-books');
const displayAudioBookContainer = document.querySelector('.display-audio-books');

const renderPhysicalBooksButton = document.querySelector('.render-physical-book-button');
const renderAudioBooksButton = document.querySelector('.render-audio-book-button');



//Adding the event listener
selectElement.addEventListener('change', ()=>{
    if(selectElement.value === 'physical'){
        narrator.setAttribute('disabled', '');
        isbn.removeAttribute('disabled');
    } else{
        isbn.setAttribute('disabled', '');
        narrator.removeAttribute('disabled');
    }
});

bookForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let newBook;
    if(selectElement.value === 'physical'){
        newBook = new Book(title.value, author.value, selectElement.value, isbn.value)
    } else {
        newBook = new AudioBook(title.value, author.value, selectElement.value, narrator.value)
    }
    Book.addBook(newBook);
    console.log(newBook)
    console.log(books)
    console.log(audioBooks)

    //Clear input fields after submitting data
    title.value = '';
    author.value = '';
    //selectElement.value = '';
    isbn.value = '';
    narrator.value = '';
})

renderPhysicalBooksButton.addEventListener('click', () =>{
    UI.activeTab = 'physical';
    UI.renderBooks(books)
})

renderAudioBooksButton.addEventListener('click', () =>{
    UI.activeTab = 'audio';
    UI.renderAudioBooks(audioBooks)
})

//Declaring the BOok class
class Book {
    constructor(title, author, format, isbn){
        this.title = title;
        this.author = author;
        this.format = format;
        this.isbn = isbn;
        this.ID = Date.now()
    }
    static addBook(book){
        if(book.format === 'physical'){
            books.push(book)
        } else {
            audioBooks.push(book)
        }
    }

    //Delete Method
    static deleteBook(id, booksArray){
        const index = booksArray.findIndex(book => book.ID.toString() === id.toString());
        if(index !== -1){
            booksArray.splice(index, 1);
            if(UI.activeTab === 'physical'){
                UI.renderBooks(books)
            } else {
                UI.renderAudioBooks(audioBooks)
            }
        }
    }
}

//Declaring the audio Book class
class AudioBook extends Book{
    constructor(title, author, format, narrator){
        super(title, author, format)
        this.narrator = narrator;
        this.ID = Date.now();
    }
}

//Declare the UI class
class UI{
    static activeTab = 'physical';
    static renderBooks(books){
        displayAudioBookContainer.style.display = 'none';
        displayPhysicalBookContainer.style.display = 'block';
        booksUL.textContent = '';

        if(UI.activeTab === 'physical') {
            books.forEach(book => {
                const liRow = document.createElement('li');
                const renderedTitle = document.createElement('span');
                const renderedAuthor = document.createElement('span');
                const renderedFormat = document.createElement('span');
                const renderedISBN = document.createElement('span');
                const deleteButtonContainer = document.createElement('span');
                const deleteButton = document.createElement('button');

                renderedTitle.textContent = book.title;
                renderedAuthor.textContent = book.author;
                renderedFormat.textContent = book.format;
                renderedISBN.textContent = book.isbn;
                deleteButton.textContent = 'Delete X';

                liRow.classList.add('Physical-books-row');
                deleteButton.classList.add('delete-button');

                liRow.dataset.id = book.ID;

                booksUL.append(liRow);
                liRow.append(renderedTitle, renderedAuthor, renderedFormat, renderedISBN, deleteButtonContainer);
                deleteButtonContainer.append(deleteButton);

                deleteButton.addEventListener('click', (e)=>{
                    const rowID = e.currentTarget.parentElement.parentElement.dataset.id
                    Book.deleteBook(rowID, books)
                })
            })
        }

    }

    static renderAudioBooks(audioBooks){
        audioBooksUL.textContent = '';
        displayPhysicalBookContainer.style.display = 'none';
        displayAudioBookContainer.style.display = 'block';

        if(UI.activeTab === 'audio'){
            audioBooks.forEach(audioBook => {
                const liRow = document.createElement('li');
                const renderedTitle = document.createElement('span');
                const renderedAuthor = document.createElement('span');
                const renderedFormat = document.createElement('span');
                const renderedNarrator = document.createElement('span');
                const deleteButtonContainer = document.createElement('span');
                const deleteButton = document.createElement('button');


                renderedTitle.textContent = audioBook.title;
                renderedAuthor.textContent = audioBook.author;
                renderedFormat.textContent = audioBook.format;
                renderedNarrator.textContent = audioBook.narrator;
                deleteButton.textContent = 'Delete ⨉';

                liRow.classList.add('audio-books-row');
                deleteButton.classList.add('delete-button');

                liRow.dataset.id = audioBook.ID;

                audioBooksUL.append(liRow);
                liRow.append(renderedTitle, renderedAuthor, renderedFormat, renderedNarrator, deleteButtonContainer);
                deleteButtonContainer.append(deleteButton);

                deleteButton.addEventListener('click', (e)=>{
                    const rowID = e.currentTarget.parentElement.parentElement.dataset.id
                    Book.deleteBook(rowID, audioBooks)
                })
            })
        }
    }
}