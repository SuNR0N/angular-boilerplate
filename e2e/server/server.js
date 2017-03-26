const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const endpoints = require('./endpoints');
const state = require('./state');
const helpers = require('../../config/helpers');
const JWT = require('./utils/utils').JWT;

const authenticateRouter = require('./routes/authenticate-router');
const booksRouter = require('./routes/books-router');

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

    // Serve static files from dist
    app.use('/', express.static(helpers.pathFromRoot('dist')));

    // Set up routers
    app.use(endpoints.authenticateRoute.getUrl(), authenticateRouter);
    app.use(endpoints.booksRoute.getUrl(), booksRouter);

    // Rewrite virtual URLs to enable internal page navigation within the Angular application
    app.get('*', (req, res) => {
        res.status(200).sendFile(helpers.pathFromRoot('dist/index.html'));
    });

    app.listen(PORT, 'localhost', () => {
        console.log(`Backend server is running at http://localhost:${PORT}`);
    });
};