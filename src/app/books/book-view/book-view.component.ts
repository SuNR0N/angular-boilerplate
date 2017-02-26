import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
    selector: 'na-book-view',
    templateUrl: 'book-view.component.html',
    styleUrls: ['book-view.component.css']
})
export class BookViewComponent implements OnInit {
    @Input() book: Book;

    private id: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bookService: BookService) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { book: Book }) => {
                this.book = data.book;
                this.id = this.book.isbn;
            }
        );
    }
}
