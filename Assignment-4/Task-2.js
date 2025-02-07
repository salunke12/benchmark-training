const bookLibrary = {
  books: [],

  addBook(book) {
    this.books.push(book);
  },

  getBooksByAuthor(author) {
    return this.books.filter((book) => book.author === author);
  },

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  },

  getAllBooks() {
    return this.books.map((book) => book.title);
  },
};

// Adding books
bookLibrary.addBook({ title: "Filter", author: "Steve", year: 2002 });
bookLibrary.addBook({ title: "Map", author: "Savio", year: 1996 });
bookLibrary.addBook({ title: "Cars", author: "Rohan", year: 1999 });
bookLibrary.addBook({ title: "Bikes", author: "Shiv", year: 2008 });
bookLibrary.addBook({ title: "Mobile", author: "Grace", year: 2012 });

// Testing methods
console.log("All Books:", bookLibrary.getAllBooks());
console.log("Books by Steve:", bookLibrary.getBooksByAuthor("Steve"));

bookLibrary.removeBook("Cars");
console.log("After Deleting 'Cars':", bookLibrary.getAllBooks());

/*
Output:
All Books: [ 'Filter', 'Map', 'Cars', 'Bikes', 'Mobile' ]
Books by Steve: [ { title: 'Filter', author: 'Steve', year: 2002 } ]
After Deleting 'Cars': [ 'Filter', 'Map', 'Bikes', 'Mobile' ]
*/
