const Logger = require('../utils/utils').Logger;

const mockedData = [
    {
        isbn: '099134460X',
        title: 'ng-book - The Complete Book on AngularJS',
        author: 'Ari Lerner',
        publicationDate: '2013-12-29'
    },
    {
        isbn: '0991344618',
        title: 'ng-book 2: The Complete Book on Angular 2: Volume 2',
        author: 'Ari Lerner',
        publicationDate: '2016-11-29'
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
    },
    {
        isbn: '178217561X',
        title: 'TypeScript Cookbook',
        author: 'Remo H. Jansen',
        publicationDate: '2017-04-06'
    },
    {
        isbn: '1491904240',
        title: 'You Don\'t Know JS: ES6 & Beyond',
        author: 'Kyle Simpson',
        publicationDate: '2016-08-25'
    },
    {
        isbn: '0984782850',
        title: 'Cracking the Coding Interview, 6th Edition: 189 Programming Questions and Solutions',
        author: 'Gayle Laakmann McDowell',
        publicationDate: '2015-07-01'
    },
    {
        isbn: '0132350882',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        publicationDate: '2008-08-11'
    },
    {
        isbn: '020161622X',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        publicationDate: '1999-10-20'
    },
    {
        isbn: '0596007124',
        title: 'Head First Design Patterns',
        author: 'Eric Freeman',
        publicationDate: '2004-11-04'
    },
    {
        isbn: '1119067901',
        title: 'OCP: Oracle Certified Professional Java SE 8 Programmer II Study Guide: Exam 1Z0-809',
        author: 'Jeanne Boyarsky',
        publicationDate: '2016-01-01'
    },
    {
        isbn: '1118957407',
        title: 'OCA: Oracle Certified Associate Java SE 8 Programmer I Study Guide: Exam 1Z0-808',
        author: 'Jeanne Boyarsky',
        publicationDate: '2015-02-06'
    },
    {
        isbn: '8192107590',
        title: 'Data Structure and Algorithmic Thinking with Python: Data Structure and Algorithmic Puzzles',
        author: 'Narasimha Karumanchi',
        publicationDate: '2015-01-29'
    },
    {
        isbn: '1491965975',
        title: 'Production-Ready Microservices: Building Standardized Systems Across an Engineering Organization',
        author: 'Susan Fowler',
        publicationDate: '2016-12-09'
    },
    {
        isbn: '1785885588',
        title: 'Node.js Design Patterns - Second Edition',
        author: 'Mario Casciaro',
        publicationDate: '2016-07-18'
    },
    {
        isbn: '1593275994',
        title: 'Automate the Boring Stuff with Python: Practical Programming for Total Beginners',
        author: 'Al Sweigart',
        publicationDate: '2015-05-01'
    },
    {
        isbn: '1512214566',
        title: 'The Hacker Playbook 2: Practical Guide To Penetration Testing',
        author: 'Peter Kim',
        publicationDate: '2015-06-20'
    },
    {
        isbn: '0262533057',
        title: 'Introduction to Algorithm',
        author: 'Thomas Cormen',
        publicationDate: '2009-08-20'
    },
    {
        isbn: '1491950358',
        title: 'Building Microservices',
        author: 'Sam Newman',
        publicationDate: '2015-02-20'
    }
];
let books = [];

function reset () {
    Logger.info('Resetting books...');
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
        Logger.error(`No book exists with ISBN ${key}`);
    }

    return book;
}

function findAll () {
    return books.sort((a, b) => a.isbn.localeCompare(b.isbn));
}

function search (query) {
    const filterByISBN = (book) => {
        return book.isbn.toLowerCase().includes(query);
    }
    const filterByAuthor = (book) => {
        return book.author.toLowerCase().includes(query);
    };
    const filterByTitle = (book) => {
        return book.title.toLowerCase().includes(query);
    }

    if (query) {
        query = query.toLowerCase();

        return books
            .filter((book) => {
                return filterByTitle(book) || filterByAuthor(book) || filterByISBN(book);
            })
            .sort((a, b) => a.title.localeCompare(b.title));
    } else {
        return this.findAll();
    }
}

function deleteOne (key) {
    let index = books.findIndex((book) => {
        return book.isbn === key;
    });

    if (index !== -1) {
        books.splice(index, 1);
        return true;
    } else {
        Logger.error(`No book exists with ISBN ${key}`);
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
        Logger.success(`Book has been successfully modified with ISBN ${entity.isbn}`);
        return existingBook;
    } else {
        let newBook = {
            isbn: entity.isbn,
            title: entity.title,
            author: entity.author,
            publicationDate: entity.publicationDate
        };
        books.push(newBook);
        Logger.success(`Book has been successfully created with ISBN ${entity.isbn}`);
        return newBook;
    }
}

reset();

module.exports = {
    findOne,
    findAll,
    save,
    deleteOne,
    reset,
    search
};