class Library {
  constructor() {
    this.books = [];
  }

  getBooks() {
    return this.books;
  }

  removeBookById(id) {
    if (this.books[id]) {
      this.books.splice(id, 1);
      return true;
    }
    return false;
  }

  //
  addBookToLibrary(book) {
    this.books.push(book);
    book.library = this;
  }
}

class Book {
  constructor(title, author, pages = 0) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.library = null;
    this.read = false;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    this._author = author;
  }

  get pages() {
    return this._pages;
  }

  set pages(pages) {
    this._pages = pages;
  }
}

class Renderer {
  constructor(library) {
    this.showAddFormBtn = document.querySelector(".showAddForm");
    this.showAddFormBtn.addEventListener("click", (e) => this.toggleForm());

    this.bookContainer = document.querySelector(".booksContainer");
    this.addBookForm = document.querySelector(".addBook");
    this.addBookButton = document.querySelector(".addBookButton");
    this.library = library;

    this.addBookButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.processAddBookForm(e);
    });
  }

  updatePage() {
    this.clearBooks();
    let books = this.library.getBooks();
    this.bookContainer.innerHTML = "";
    console.log(books);
    books.forEach((book, id) => {
      this.addBook(book, id);
    });
    this.addBookForm.style.display = "none";
  }

  addBook(book, id) {
    let bookDiv = document.createElement("div");
    bookDiv.style.backgroundColor = "#fff";

    bookDiv.classList.add("book");
    bookDiv.dataset.indexNumber = id;

    //Use this buildDev method to put together a new div for different bits of info to attach to the bookDiv
    this.buildDiv(book.title, ["bookTitle"], bookDiv);
    this.buildDiv(book.author, ["bookAuthor"], bookDiv);
    this.buildDiv(book.pages, "bookPages", bookDiv);

    //For the next two we need to add event listeners so we're taking advantage of the return newDiv
    //from the buildDiv function to access them
    let readDiv = this.buildDiv(
      book.isRead === true ? "Mark Unread" : "Mark Read",
      ["bookRead", "bookActions"],
      bookDiv
    );
    let delDiv = this.buildDiv("Remove", ["bookDel", "bookActions"], bookDiv);

    readDiv.addEventListener("click", (e) => {
      let id = e.target.parentNode.dataset.indexNumber;
      book.read = book.read === true ? false : true;
      e.target.textContent = book.read === true ? "Mark Unread" : "Mark Read";
      // e.target.parentNode.style.backgroundColor = myLibrary[id].isRead === false ? '#fff' : '#ccc'
      e.target.parentNode.style.opacity = book.read === false ? "100%" : "60%";
    });

    delDiv.addEventListener(
      "click",
      (e) => {
        //Removes without confirmation, add in later
        this.library.removeBookById(id);
        e.target.parentNode.remove();
        console.log(this.library.getBooks());
      },
      this.library
    );

    this.bookContainer.appendChild(bookDiv);
  }

  buildDiv(divText, classesToAdd, parentDiv) {
    //Allow for string of a single css class to be added, convert string to array for processing
    if (!Array.isArray(classesToAdd)) {
      classesToAdd = classesToAdd.split();
    }

    let newDiv = document.createElement("div");

    //Add CSS classes
    classesToAdd.forEach((cssclass) => {
      newDiv.classList.add(cssclass);
    });

    newDiv.textContent = divText;
    parentDiv.appendChild(newDiv);
    return newDiv;
  }

  processAddBookForm(e) {
    //Validate form, return on fail
    let form = document.querySelector("#addBook");
    console.log(form.checkValidity());
    if (!form.checkValidity()) return;

    //Query for form components
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;

    //Create new book, add to lib, update page
    let newBook = new Book(title, author, pages);

    this.library.addBookToLibrary(newBook);
    this.updatePage();
  }

  clearBooks() {
    this.bookContainer.innerHTML = "";
  }

  toggleForm() {
    this.addBookForm.style.display =
      this.addBookForm.style.display === "none" ? "grid" : "none";
  }
}
const myClassLibrary = new Library();
myClassLibrary.addBookToLibrary(new Book("1984", "George Orwell", 531));
myClassLibrary.addBookToLibrary(new Book("Farenheit 451", "Ray Bradbury", 362));
const pageRenderer = new Renderer(myClassLibrary);

pageRenderer.updatePage();
