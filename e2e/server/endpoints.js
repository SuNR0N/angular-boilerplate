class Route {
    constructor(url, parent = null) {
        this.url = url;
        if (parent && !(parent instanceof Route)) {
            throw new Error('Invalid parent');
        }
        this.parent = parent;
    }

    getParentUrl() {
        return this.parent ? this.parent.getUrl() : '';
    }

    getLastSegment() {
        return this.url.substr(this.url.lastIndexOf('/'));
    }

    getUrl() {
        return this.getParentUrl() + this.url;
    }

    getSlash() {
        return '/';
    }
}

const apiRoute = new Route('/api');
const authenticateRoute = new Route('/authenticate', apiRoute);
const booksRoute = new Route('/books', apiRoute);
const bookResourceRoute = new Route('/:id', booksRoute);
const booksResetRoute = new Route('/reset-action', booksRoute);

module.exports = {
    authenticateRoute,
    booksRoute,
    bookResourceRoute,
    booksResetRoute
};