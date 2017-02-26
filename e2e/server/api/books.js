const booksRepository = require('../repository/books-repository');
const HttpStatus = require('./utils').HttpStatus;

function getBook (req, res) {
    let isbn = req.params.id;
    let book = booksRepository.findOne(isbn);

    if (book) {
        res.status(HttpStatus.OK).json(book);
    } else {
        res.status(HttpStatus.NOT_FOUND).json();
    }
}

function getBooks (req, res) {
    let books = booksRepository.findAll();

    res.status(HttpStatus.OK).json(books);
}

function editBook (req, res) {
    let isbn = req.params.id;
    let existingBook = booksRepository.findOne(isbn);

    if (existingBook) {
        let book = req.body;
        let modifiedBook = booksRepository.save(book);
        res.status(HttpStatus.OK).json(modifiedBook);
    } else {
        res.status(HttpStatus.NOT_FOUND).json();
    }
}

function deleteBook (req, res) {
    let isbn = req.params.id;

    if (booksRepository.deleteOne(isbn)) {
        res.status(HttpStatus.NO_CONTENT).json();
    } else {
        res.status(HttpStatus.NOT_FOUND).json();
    }
}

function createBook (req, res) {
    let book = req.body;
    let existingBook = booksRepository.findOne(book.isbn);

    if (existingBook) {
        res.status(HttpStatus.CONFLICT).json();
    } else {
        let newBook = booksRepository.save(book);
        res.status(HttpStatus.CREATED).json(newBook);
    }
}

function resetBooks (req, res) {
    booksRepository.reset();

    res.status(HttpStatus.OK).json();
}

module.exports = {
    getBook,
    getBooks,
    editBook,
    deleteBook,
    createBook,
    resetBooks
};