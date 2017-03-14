const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const endpoints = require('./endpoints');
const helpers = require('../../config/helpers');

const authApi = require('./api/authenticate');
const booksApi = require('./api/books');

module.exports = (PORT) => {
    if (!PORT) {
        throw new Error('PORT must be defined');
    }

    const app = express();

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', express.static(helpers.pathFromRoot('dist')));

    // Authenticate
    app.post(endpoints.authenticate, authApi.authenticate);

    // Books
    app.get(endpoints.booksCollection, booksApi.getBooks);
    app.get(endpoints.bookResource, booksApi.getBook);
    app.put(endpoints.bookResource, booksApi.editBook);
    app.post(endpoints.booksCollection, booksApi.createBook);
    app.delete(endpoints.bookResource, booksApi.deleteBook);
    app.post(endpoints.booksReset, booksApi.resetBooks);

    app.listen(PORT, 'localhost', () => {
        console.log(`Backend server is running at http://localhost:${PORT}`);
    });
};