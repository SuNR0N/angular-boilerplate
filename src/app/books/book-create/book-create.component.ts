import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoggerService } from '../../core';
import { BookService, BookRoutingService, IBook, ISBNValidator } from '../shared';

@Component({
    selector: 'na-book-create',
    templateUrl: 'book-create.component.html',
    styleUrls: ['book-create.component.css']
})
export class BookCreateComponent {
    isbn: FormControl;
    title: FormControl;
    author: FormControl;
    publicationDate: FormControl;
    newBookForm: FormGroup;

    constructor(
        private loggerService: LoggerService,
        private bookService: BookService,
        private bookRoutingService: BookRoutingService
    ) {
        this.createForm();
    }

    isISBNInvalid() {
        return !this.isFieldValid(this.isbn);
    }

    isISBNRequired() {
        return !this.isFieldValid(this.isbn) && this.isFieldRequired(this.isbn);
    }

    isISBNFormatInvalid() {
        return !this.isFieldValid(this.isbn) && this.hasInvalidISBN(this.isbn);
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
        return this.newBookForm.invalid;
    }

    cancel() {
        this.bookRoutingService.gotoBooks();
    }

    save() {
        let book: IBook = {
            isbn: this.isbn.value,
            title: this.title.value,
            author: this.author.value,
            publicationDate: this.publicationDate.value
        };
        this.bookService.createBook(book).subscribe(
            (newBook) => {
                this.bookRoutingService.gotoViewBook(newBook.isbn);
            },
            (error) => {
                this.loggerService.log(`Failed to create book`);
                this.loggerService.log(error);
            }
        );
    }

    private createForm() {
        this.isbn = new FormControl('', [Validators.required, ISBNValidator.checkISBN]);
        this.title = new FormControl('', Validators.required);
        this.author = new FormControl('', Validators.required);
        this.publicationDate = new FormControl('');
        this.newBookForm = new FormGroup({
            isbn: this.isbn,
            title: this.title,
            author: this.author,
            publicationDate: this.publicationDate
        });
    }

    private isFieldValid(field: FormControl): boolean {
        return field.valid || field.untouched;
    }

    private isFieldRequired(field: FormControl): boolean {
        return field.errors && field.errors.hasOwnProperty('required');
    }

    private hasInvalidISBN(field: FormControl): boolean {
        return field.errors && field.errors.hasOwnProperty('isbn');
    }
}
