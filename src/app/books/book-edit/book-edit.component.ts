import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BookService, BookRoutingService, Book } from '../shared';

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
    book: Book;

    private id: string;

    constructor(
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
    }

    cancel() {
        this.location.back();
    }

    save() {
        this.bookService.updateBook(this.book).subscribe(
            (book) => {
                this.bookRoutingService.gotoViewBook(book.isbn);
            },
            (error) => {
                console.log(`Failed to update book with ISBN ${this.book.isbn}`);
                console.log(error);
            }
        );
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
