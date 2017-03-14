const baseUrl = '/api';

const authenticate = `${baseUrl}/authenticate`;
const bookResource = `${baseUrl}/books/:id`;
const booksCollection = `${baseUrl}/books`;
const booksReset = `${baseUrl}/books/reset-action`;

module.exports = {
    authenticate,
    bookResource,
    booksCollection,
    booksReset
};
