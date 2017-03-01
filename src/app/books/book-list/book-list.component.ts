import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core';
import { BookService, BookRoutingService, Book } from '../shared';

@Component({
    selector: 'na-book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[];

    constructor(
        private loggerService: LoggerService,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService) { }

    ngOnInit() {
        this.getBooks();
    }

    view(book: Book) {
        this.bookRoutingService.gotoViewBook(book.isbn);
    }

    edit(book: Book) {
        this.bookRoutingService.gotoEditBook(book.isbn);
    }

    delete(book: Book) {
        this.bookService.deleteBook(book).subscribe(
            (result) => {
                let index = this.books.indexOf(book);
                this.books.splice(index, 1);
            },
            (error) => {
                this.loggerService.log(`Failed to delete book with ISBN ${book.isbn}`);
                this.loggerService.log(error);
            }
        );
    }

    private getBooks() {
        this.books = [];
        this.bookService.getBooks().subscribe(
            (books) => {
                this.books = books;
            },
            (error) => {
                this.loggerService.log('Failed to retrieve books');
                this.loggerService.log(error);
            }
        );
    }
}
