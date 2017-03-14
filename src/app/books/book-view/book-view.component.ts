import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerService } from '../../core';
import { HATEOASResource, HATEOASService } from '../../core/hateoas';
import { BookService, BookRoutingService, IBook, BookRelation } from '../shared';

@Component({
    selector: 'na-book-view',
    templateUrl: 'book-view.component.html',
    styleUrls: ['book-view.component.css']
})
export class BookViewComponent implements OnInit {
    bookResource: HATEOASResource<IBook>;

    private id: string;

    constructor(
        private hateoasService: HATEOASService,
        private loggerService: LoggerService,
        private route: ActivatedRoute,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { bookResource: HATEOASResource<IBook> }) => {
                this.bookResource = data.bookResource;
                this.id = this.bookResource.content.isbn;
            }
        );
    }

    edit() {
        this.bookRoutingService.gotoEditBook(this.id);
    }

    editable() {
        return this.hateoasService.hasRelation(this.bookResource, BookRelation.Edit.name);
    }

    delete() {
        this.bookService.performActionOnBook(this.bookResource, BookRelation.Delete).subscribe(
            () => {
                this.bookRoutingService.gotoBooks();
            },
            (error) => {
                this.loggerService.log(`Failed to delete book with ISBN ${this.bookResource.content.isbn}`);
                this.loggerService.log(error);
            }
        );
    }

    deletable() {
        return this.hateoasService.hasRelation(this.bookResource, BookRelation.Delete.name);
    }
}
