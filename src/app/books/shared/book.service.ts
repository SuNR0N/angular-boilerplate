import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Book } from './book.model';
import { CONFIG, ExceptionService } from '../../core';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class BookService {

    constructor(
        private http: Http,
        private exceptionService: ExceptionService) { }

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
        return <Observable<Book[]>> this.http
            .get(booksUrl)
            .map((res) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBook(id: string) {
        return <Observable<Book>> this.http
            .get(`${booksUrl}/${id}`)
            .map((res) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }
}
