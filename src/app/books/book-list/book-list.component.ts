import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core';
import { BookService, BookRoutingService, IBook, BookRelation } from '../shared';
import { HATEOASResource, HATEOASService } from '../../core/hateoas';

@Component({
    selector: 'na-book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Array<HATEOASResource<IBook>>;

    constructor(
        private hateoasService: HATEOASService,
        private loggerService: LoggerService,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService
    ) { }

    ngOnInit() {
        this.getBooks();
    }

    view(bookResource: HATEOASResource<IBook>) {
        this.bookRoutingService.gotoViewBook(bookResource.content.isbn);
    }

    viewable(bookResource: HATEOASResource<IBook>) {
        return this.hateoasService.hasRelation(bookResource, BookRelation.Self.name);
    }

    edit(bookResource: HATEOASResource<IBook>) {
        this.bookRoutingService.gotoEditBook(bookResource.content.isbn);
    }

    editable(bookResource: HATEOASResource<IBook>) {
        return this.hateoasService.hasRelation(bookResource, BookRelation.Edit.name);
    }

    delete(bookResource: HATEOASResource<IBook>) {
        this.bookService.performActionOnBook(bookResource, BookRelation.Delete).subscribe(
            (result) => {
                let index = this.books.indexOf(bookResource);
                this.books.splice(index, 1);
            },
            (error) => {
                this.loggerService.log(`Failed to delete book with ISBN ${bookResource.content.isbn}`);
                this.loggerService.log(error);
            }
        );
    }

    deletable(bookResource: HATEOASResource<IBook>) {
        return this.hateoasService.hasRelation(bookResource, BookRelation.Delete.name);
    }

    private getBooks() {
        this.books = [];
        this.bookService.getBooks().subscribe(
            (response) => {
                this.books = response.content;
            },
            (error) => {
                this.loggerService.log('Failed to retrieve books');
                this.loggerService.log(error);
            }
        );
    }
}
