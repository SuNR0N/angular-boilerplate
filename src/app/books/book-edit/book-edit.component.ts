import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoggerService, ToasterService } from '../../core';
import { ModalService } from '../../core/modal/modal.service';
import { ICanDeactivate } from '../../core/guards/can-deactivate-guard.service';
import { BookService, BookRoutingService, IBook, Book } from '../shared';

@Component({
    selector: 'na-book-edit',
    templateUrl: 'book-edit.component.html',
    styleUrls: ['book-edit.component.css']
})
export class BookEditComponent implements OnInit, ICanDeactivate {
    title: FormControl;
    author: FormControl;
    publicationDate: FormControl;
    editBookForm: FormGroup;
    book: Book;

    private id: string;
    private forceLeave: boolean;

    constructor(
        private modalService: ModalService,
        private toasterService: ToasterService,
        private loggerService: LoggerService,
        private route: ActivatedRoute,
        private location: Location,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { book: Book }) => {
                this.setEditBook(data.book);
                this.id = this.book.isbn;
            }
        );
        this.forceLeave = false;
    }

    canDeactivate() {
        return this.forceLeave || !this.isDirty() || this.modalService.activate({});
    }

    cancel() {
        this.forceLeave = true;
        this.location.back();
    }

    save() {
        let book: IBook = {
            author: this.author.value,
            isbn: this.book.isbn,
            publicationDate: this.publicationDate.value,
            title: this.title.value
        };
        this.bookService.performActionOnBook(this.book, Book.Links.Edit, book).subscribe(
            (persistedBook: Book) => {
                this.forceLeave = true;
                this.toasterService.success(`${this.book.title} (${this.book.isbn}) has been successfully updated`, 'Successful Update');
                this.bookRoutingService.gotoViewBook(persistedBook.isbn);
            },
            (error) => {
                this.toasterService.error(`Failed to update book with ISBN ${this.book.isbn}`, 'Update Failed');
                this.loggerService.log(error);
            }
        );
    }

    saveable() {
        return this.book.hasLinkWithRel(Book.Links.Edit);
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

    private isDirty() {
        return !this.book.equals({
            author: this.author.value,
            isbn: this.book.isbn,
            publicationDate: this.publicationDate.value,
            title: this.title.value
        });
    }

    private setEditBook(book: Book) {
        this.book = book;

        this.title = new FormControl(this.book.title, Validators.required);
        this.author = new FormControl(this.book.author, Validators.required);
        this.publicationDate = new FormControl(this.book.publicationDate);
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
