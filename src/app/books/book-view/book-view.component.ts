import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerService, ToasterService } from '../../core';
import { BookService, BookRoutingService, Book } from '../shared';
import { ModalService } from '../../core/modal/modal.service';

@Component({
    selector: 'na-book-view',
    templateUrl: 'book-view.component.html',
    styleUrls: ['book-view.component.css']
})
export class BookViewComponent implements OnInit {
    book: Book;

    private id: string;

    constructor(
        private modalService: ModalService,
        private toasterService: ToasterService,
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
        this.modalService.activate({
            message: `Are you sure you want to delete this book?`,
            okButtonText: 'Yes',
            okButtonStyle: 'btn-danger',
            cancelButtonText: 'No'
        }).then((response) => {
            if (response) {
                this.bookService.performActionOnBook(this.book, Book.Links.Delete).subscribe(
                    () => {
                        this.toasterService.success(
                            `${this.book.title} (${this.book.isbn}) has been successfully deleted`,
                            'Successful Deletion'
                        );
                        this.bookRoutingService.gotoBooks();
                    },
                    (error) => {
                        this.toasterService.error(`Failed to delete book with ISBN ${this.book.isbn}`, 'Deletion Failed');
                        this.loggerService.log(error);
                    }
                );
            }
        });
    }

    deletable() {
        return this.book.hasLinkWithRel(Book.Links.Delete);
    }
}
