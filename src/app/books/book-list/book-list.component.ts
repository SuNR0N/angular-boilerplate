import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book.model';
import { BookService, BookRoutingService } from '../shared';

@Component({
    selector: 'na-book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[];

    constructor(
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
                console.log(`Failed to delete book with ISBN ${book.isbn}`);
                console.log(error);
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
                console.log('Failed to retrieve books');
                console.log(error);
            },
            () => {
                console.log('List of books has been successfully retrieved');
            }
        );
    }
}
