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
        private bookRoutingService: BookRoutingService
    ) { }

    ngOnInit() {
        this.getBooks();
    }

    view(book: Book) {
        this.bookRoutingService.gotoViewBook(book.isbn);
    }

    viewable(book: Book) {
        return book.hasLinkWithRel(Book.Links.Self);
    }

    edit(book: Book) {
        this.bookRoutingService.gotoEditBook(book.isbn);
    }

    editable(book: Book) {
        return book.hasLinkWithRel(Book.Links.Edit);
    }

    delete(book: Book) {
        this.bookService.performActionOnBook(book, Book.Links.Delete).subscribe(
            () => this.deleteBook(book),
            (error) => {
                this.loggerService.log(`Failed to delete book with ISBN ${book.isbn}`);
                this.loggerService.log(error);
            }
        );
    }

    deletable(book: Book) {
        return book.hasLinkWithRel(Book.Links.Delete);
    }

    private getBooks() {
        this.books = [];
        this.bookService.getBooks().subscribe(
            (response) => {
                this.books = response.getCollection();
            },
            (error) => {
                this.loggerService.log('Failed to retrieve books');
                this.loggerService.log(error);
            }
        );
    }

    private deleteBook(book: Book) {
        let index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }
}
