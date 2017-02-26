const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helpers = require('../../config/helpers');

const booksApi = require('./api/books');

module.exports = (PORT) => {
    if (!PORT) {
        throw new Error('PORT must be defined');
    }

    const app = express();
    const baseUrl = '/api/';

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', express.static(helpers.pathFromRoot('dist')));

    app.get(baseUrl + 'books', booksApi.getBooks);
    app.get(baseUrl + 'books/:id', booksApi.getBook);
    app.put(baseUrl + 'books/:id', booksApi.editBook);
    app.post(baseUrl + 'books', booksApi.createBook);
    app.delete(baseUrl + 'books/:id', booksApi.deleteBook);
    app.post(baseUrl + 'books/reset-action', booksApi.resetBooks);

    app.listen(PORT, 'localhost', () => {
        console.log(`Backend server is running at http://localhost:${PORT}`);
    });
};