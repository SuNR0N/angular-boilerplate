import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Book } from './book.model';
import { CONFIG } from '../../core';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class BookService {

    constructor(private http: Http) { }

    createBook(book: Book) {
        // TODO
    }

    updateBook(book: Book) {
        // TODO
    }

    deleteBook(book: Book) {
        // TODO
    }

    getBooks() {
        // TODO
    }

    getBook(id: number) {
        // TODO
    }
}
