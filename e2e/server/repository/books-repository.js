const mockedData = [
    {
        isbn: '099134460X',
        title: 'ng-book - The Complete Book on AngularJS',
        author: 'Ari Lerner',
        publicationDate: '2013-12-29'
    },
    {
        isbn: '1430264489',
        title: 'Pro AngularJS',
        author: 'Adam Freeman',
        publicationDate: '2014-03-26'
    },
    {
        isbn: '0596517742',
        title: 'JavaScript : The Good Parts: The Good Parts',
        author: 'Douglas Crockford ',
        publicationDate: '2008-05-01'
    },
    {
        isbn: '0596806752',
        title: 'JavaScript Patterns',
        author: 'Stoyan Stefanov',
        publicationDate: '2010-10-01'
    },
    {
        isbn: '1449336361',
        title: 'JS.Next : ECMAScript 6',
        author: 'Aaron Frost',
        publicationDate: '2015-11-25'
    }
];
let books = [];

function reset () {
    console.log('Resetting books...');
    books.length = 0;
    mockedData.forEach((item) => {
        let clonedBook = JSON.parse(JSON.stringify(item));
        books.push(clonedBook);
    });
}

function findOne (key) {
    let book = books.find((book) => {
        return book.isbn === key;
    });

    if (!book) {
        console.log(`Book cannot be found. Reason: No book exists with ISBN ${key}`);
    }

    return book;
}

function findAll () {
    return books;
}

function deleteOne (key) {
    let index = books.findIndex((book) => {
        return book.isbn === key;
    });

    if (index !== -1) {
        books.splice(index, 1);
        return true;
    } else {
        console.log(`Book cannot be deleted. Reason: No book exists with ISBN ${key}`);
        return false;
    }
}

function save (entity) {
    let existingBook = books.find((book) => {
        return book.isbn === entity.isbn;
    });

    if (existingBook) {
        existingBook.title = entity.title || existingBook.title;
        existingBook.author = entity.author || existingBook.author;
        existingBook.publicationDate = entity.publicationDate || existingBook.publicationDate;
        console.log(`Book has been successfully modified with ISBN ${entity.isbn}`);
        return existingBook;
    } else {
        let newBook = {
            isbn: entity.isbn,
            title: entity.title,
            author: entity.author,
            publicationDate: entity.publicationDate
        };
        books.push(newBook);
        console.log(`Book has been successfully created with ISBN ${entity.isbn}`);
        return newBook;
    }
}

reset();

module.exports = {
    findOne,
    findAll,
    save,
    deleteOne,
    reset
};