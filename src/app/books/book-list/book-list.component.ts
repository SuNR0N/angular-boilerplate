import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
    selector: 'na-book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[];

    constructor(
        private bookService: BookService,
        private router: Router) { }

    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
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

    onSelect(book: Book) {
        this.router.navigate(['/books', book.isbn]);
    }
}
