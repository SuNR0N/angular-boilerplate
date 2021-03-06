const booksRepository = require('../repository/books-repository');
const HttpStatus = require('../utils/utils').HttpStatus;
const RequestMethod = require('../utils/utils').RequestMethod;
const HATEOAS = require('../utils/utils').HATEOAS;
const bookResourceRoute = require('../endpoints').bookResourceRoute;
const state = require('../state');

const Links = {
    Self: {
        rel: 'self',
        href: bookResourceRoute.getUrl(),
        method: RequestMethod.GET
    },
    Edit: {
        rel: 'edit',
        href: bookResourceRoute.getUrl(),
        method: RequestMethod.PUT,
        isApplicable: () => state.hasCurrentUser()
    },
    Delete: {
        rel: 'delete',
        href: bookResourceRoute.getUrl(),
        method: RequestMethod.DELETE,
        isApplicable: () => state.hasCurrentUser()
    }
};

function getBook (req, res) {
    let isbn = req.params.id;
    let book = booksRepository.findOne(isbn);
    let hateoasBookResponse = HATEOAS.wrapResource({
        content: book,
        links: [
            Links.Self,
            Links.Edit,
            Links.Delete
        ],
        linkParametersMapping: { id: 'isbn' },
        request: req
    });

    if (book) {
        res.status(HttpStatus.OK).json(hateoasBookResponse);
    } else {
        res.status(HttpStatus.NOT_FOUND).json();
    }
}

function getBooks (req, res) {
    let query = req.query.q;
    let page = parseInt(req.query.page, 10);
    let pageSize = parseInt(req.query.size, 10);
    let books = booksRepository.search(query);
    let hateoasBooksResponse = HATEOAS.wrapAsPageResource({
        content: HATEOAS.wrapResources({
            content: books,
            links: [
                Links.Self,
                Links.Edit,
                Links.Delete
            ],
            linkParametersMapping: { id: 'isbn' },
            request: req
        }),
        collectionKey: 'books',
        page: page,
        pageSize: pageSize,
        request: req
    });

    res.status(HttpStatus.OK).json(hateoasBooksResponse);
}

function editBook (req, res) {
    let isbn = req.params.id;
    let existingBook = booksRepository.findOne(isbn);

    if (existingBook) {
        let book = req.body;
        let modifiedBook = booksRepository.save(book);
        let hateoasBookResponse = HATEOAS.wrapResource({
            content: modifiedBook,
            links: [
                Links.Self,
                Links.Edit,
                Links.Delete
            ],
            linkParametersMapping: { id: 'isbn' },
            request: req
        });
        res.status(HttpStatus.OK).json(hateoasBookResponse);
    } else {
        res.status(HttpStatus.NOT_FOUND).json();
    }
}

function deleteBook (req, res) {
    let isbn = req.params.id;

    if (booksRepository.deleteOne(isbn)) {
        res.status(HttpStatus.NO_CONTENT).end();
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
        let hateoasBookResponse = HATEOAS.wrapResource({
            content: newBook,
            links: [
                Links.Self,
                Links.Edit,
                Links.Delete
            ],
            linkParametersMapping: { id: 'isbn' },
            request: req
        });
        res.setHeader('Location', req.protocol + '://' + req.get('host') + req.originalUrl + '/' + newBook.isbn);
        res.status(HttpStatus.CREATED).json(hateoasBookResponse);
    }
}

function resetBooks (req, res) {
    booksRepository.reset();

    res.status(HttpStatus.OK).end();
}

module.exports = {
    getBook,
    getBooks,
    editBook,
    deleteBook,
    createBook,
    resetBooks
};