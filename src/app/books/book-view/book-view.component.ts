import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerService } from '../../core';
import { BookService, BookRoutingService, Book } from '../shared';

@Component({
    selector: 'na-book-view',
    templateUrl: 'book-view.component.html',
    styleUrls: ['book-view.component.css']
})
export class BookViewComponent implements OnInit {
    book: Book;

    private id: string;

    constructor(
        private loggerService: LoggerService,
        private route: ActivatedRoute,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService
    ) { }

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

    editable() {
        return this.book.hasLinkWithRel(Book.Links.Edit);
    }

    delete() {
        this.bookService.performActionOnBook(this.book, Book.Links.Delete).subscribe(
            () => this.bookRoutingService.gotoBooks(),
            (error) => {
                this.loggerService.log(`Failed to delete book with ISBN ${this.book.isbn}`);
                this.loggerService.log(error);
            }
        );
    }

    deletable() {
        return this.book.hasLinkWithRel(Book.Links.Delete);
    }
}
