const Router = require('express').Router;
const booksApi = require('../api/books');
const endpoints = require('../endpoints');
const booksRoute = endpoints.booksRoute;
const bookResourceRoute = endpoints.bookResourceRoute;
const booksResetRoute = endpoints.booksResetRoute;

const booksRouter = new Router();

booksRouter.get(booksRoute.getSlash(), booksApi.getBooks);
booksRouter.get(bookResourceRoute.getLastSegment(), booksApi.getBook);
booksRouter.put(bookResourceRoute.getLastSegment(), booksApi.editBook);
booksRouter.post(booksRoute.getSlash(), booksApi.createBook);
booksRouter.delete(bookResourceRoute.getLastSegment(), booksApi.deleteBook);
booksRouter.post(booksResetRoute.getLastSegment(), booksApi.resetBooks);

module.exports = booksRouter;