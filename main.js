const myLibrary = []
const bookContainer = document.querySelector('.booksContainer')
const addBookForm = document.querySelector('.addBook')
addBookForm.style.display = 'none'

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = false
}

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this)
    displayLibrary()
}

function processAddBookForm() {
    title = document.querySelector('#title').value
    author = document.querySelector('#author').value
    pages = document.querySelector('#pages').value

    newBook = new Book(title, author, pages).addBookToLibrary()
}

addBookForm.addEventListener('submit', (e) =>  {
    e.preventDefault()
    processAddBookForm()
    addBookForm.reset()
});


function toggleAddForm(e) {
    addBookForm.style.display = addBookForm.style.display === 'none' ? 'grid' : 'none'
    showAddForm.style.backgroundColor = addBookForm.style.display === 'none' ? '#59CD90' : '#ccc'
    showAddForm.textContent = addBookForm.style.display === 'none' ? 'Add a Book' : 'Close'
}


const showAddForm = document.querySelector('.showAddForm')
showAddForm.addEventListener('click', (e) => toggleAddForm(e))

function displayLibrary() {

    //Clear currently displayed books to avoid display and array sync issues
    document.querySelectorAll('.book').forEach((book)=> book.remove())

    //Iterate on Array and display each
    myLibrary.forEach((book, id) => {

        let bookDiv = document.createElement('div')
        bookDiv.style.backgroundColor = '#fff'

        bookDiv.classList.add('book')
        bookDiv.dataset.indexNumber = id

        let bookTitleDiv = document.createElement('div')
        bookTitleDiv.classList.add('bookTitle')
        bookTitleDiv.textContent = book.title
        bookDiv.appendChild(bookTitleDiv)

        let bookAuthorDiv = document.createElement('div')
        bookAuthorDiv.classList.add('bookAuthor')
        bookAuthorDiv.textContent = book.author
        bookDiv.appendChild(bookAuthorDiv)

        let bookPagesDiv = document.createElement('div')
        bookPagesDiv.classList.add('bookPages')
        bookPagesDiv.textContent = book.pages
        bookDiv.appendChild(bookPagesDiv)

        let bookReadDiv = document.createElement('div')
        bookReadDiv.classList.add('bookRead')
        bookReadDiv.classList.add('bookActions')
        bookReadDiv.textContent = book.isRead === true ? 'Mark Unread' : 'Mark Read'
        bookDiv.appendChild(bookReadDiv)

        bookReadDiv.addEventListener('click', (e) => {
            let id = e.target.parentNode.dataset.indexNumber;
            myLibrary[id].isRead = myLibrary[id].isRead === true ? false : true
            e.target.textContent = myLibrary[id].isRead === true ? 'Mark Unread' : 'Mark Read'
            // e.target.parentNode.style.backgroundColor = myLibrary[id].isRead === false ? '#fff' : '#ccc'
            e.target.parentNode.style.opacity = myLibrary[id].isRead === false ? '100%' : '60%'
        });

        let bookDelDiv = document.createElement('div')
        bookDelDiv.classList.add('bookDel')
        bookDelDiv.classList.add('bookActions')
        bookDelDiv.textContent = 'Remove'
        bookDiv.appendChild(bookDelDiv)

        bookDelDiv.addEventListener('click', (e) => {
            //Removes without confirmation, add in later
            myLibrary.splice(id, 1)
            e.target.parentNode.remove()
            displayLibrary()
        });

        bookContainer.appendChild(bookDiv)
    })
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 296)
const book2 = new Book('Farenheit 451','Ray Bradbury', 614)
const book3 = new Book('1984', 'George Orwell', 631)

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();