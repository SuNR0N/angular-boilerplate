import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
    selector: 'na-book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[];

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.getBooks();
    }

    private getBooks() {
        this.books = [];
        this.bookService.getBooks();
    }
}
