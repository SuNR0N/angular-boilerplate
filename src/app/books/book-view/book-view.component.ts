import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../shared/book.model';
import { BookService, BookRoutingService } from '../shared';

@Component({
    selector: 'na-book-view',
    templateUrl: 'book-view.component.html',
    styleUrls: ['book-view.component.css']
})
export class BookViewComponent implements OnInit {
    book: Book;

    private id: string;

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { book: Book }) => {
                this.book = data.book;
                this.id = this.book.isbn;
            }
        );
    }

    edit() {
        this.bookRoutingService.gotoEditBook(this.id);
    }

    delete() {
        this.bookService.deleteBook(this.book).subscribe(
            () => {
                this.bookRoutingService.gotoBooks();
            },
            (error) => {
                console.log(`Failed to delete book with ISBN ${this.book.isbn}`);
                console.log(error);
            }
        );
    }
}
