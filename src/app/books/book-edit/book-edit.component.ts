import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoggerService } from '../../core';
import { HATEOASService, HATEOASResource } from '../../core/hateoas';
import { BookService, BookRoutingService, IBook, BookRelation } from '../shared';

@Component({
    selector: 'na-book-edit',
    templateUrl: 'book-edit.component.html',
    styleUrls: ['book-edit.component.css']
})
export class BookEditComponent implements OnInit {
    title: FormControl;
    author: FormControl;
    publicationDate: FormControl;
    editBookForm: FormGroup;
    bookResource: HATEOASResource<IBook>;

    private id: string;

    constructor(
        private hateoasService: HATEOASService,
        private loggerService: LoggerService,
        private route: ActivatedRoute,
        private location: Location,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { bookResource: HATEOASResource<IBook> }) => {
                this.setEditBook(data.bookResource);
                this.id = this.bookResource.content.isbn;
            }
        );
    }

    cancel() {
        this.location.back();
    }

    save() {
        let book: IBook = {
            author: this.author.value,
            isbn: this.bookResource.content.isbn,
            publicationDate: this.publicationDate.value,
            title: this.title.value
        };
        this.bookService.performActionOnBook(this.bookResource, BookRelation.Edit, book).subscribe(
            (bookResource: HATEOASResource<IBook>) => {
                this.bookRoutingService.gotoViewBook(bookResource.content.isbn);
            },
            (error) => {
                this.loggerService.log(`Failed to update book with ISBN ${this.bookResource.content.isbn}`);
                this.loggerService.log(error);
            }
        );
    }

    saveable() {
        return this.hateoasService.hasRelation(this.bookResource, BookRelation.Edit.name);
    }

    isTitleInvalid() {
        return !this.isFieldValid(this.title);
    }

    isTitleRequired() {
        return !this.isFieldValid(this.title) && this.isFieldRequired(this.title);
    }

    isAuthorInvalid() {
        return !this.isFieldValid(this.author);
    }

    isAuthorRequired() {
        return !this.isFieldValid(this.author) && this.isFieldRequired(this.author);
    }

    isFormInvalid() {
        return this.editBookForm.invalid;
    }

    private setEditBook(bookResource: HATEOASResource<IBook>) {
        this.bookResource = bookResource;

        this.title = new FormControl(this.bookResource.content.title, Validators.required);
        this.author = new FormControl(this.bookResource.content.author, Validators.required);
        this.publicationDate = new FormControl(this.bookResource.content.publicationDate);
        this.editBookForm = new FormGroup({
            title: this.title,
            author: this.author,
            publicationDate: this.publicationDate
        });
    }

    private isFieldValid(field: FormControl): boolean {
        return field.valid;
    }

    private isFieldRequired(field: FormControl): boolean {
        return field.errors && field.errors.hasOwnProperty('required');
    }
}
