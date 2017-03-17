const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const endpoints = require('./endpoints');
const state = require('./state');
const helpers = require('../../config/helpers');
const JWT = require('./utils/utils').JWT;

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

    // Intercept HTTP requests to handle JWT tokens
    app.use((req, res, next) => {
        /*
         *  If there is a logged in user and the request contains the predefined HTTP header
         *  which contains the JWT token then add the JWT token to the response headers
         */
        if (state.hasCurrentUser() && JWT.hasHeader(req)) {
            JWT.addToken({
                response: res,
                subject: state.getCurrentUser().username,
                headerFieldName: JWT.getHeader()
            });
        }
        // otherwise reset current user
        else {
            state.setCurrentUser(null);
        }
        next();
    });

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