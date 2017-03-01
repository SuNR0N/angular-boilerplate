import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Book } from './';
import { CONFIG, ExceptionService } from '../../core';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class BookService {
    private options: RequestOptions;

    constructor(
        private http: Http,
        private exceptionService: ExceptionService) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers });
    }

    createBook(book: Book) {
        let body = JSON.stringify(book);

        return <Observable<string>> this.http
            .post(`${booksUrl}`, body, this.options)
            .map((res: Response) => {
                let resourceUrl: string = res.headers.get('Location');
                let resourceId: string = resourceUrl.substr(resourceUrl.lastIndexOf('/') + 1);
                return resourceId;
            })
            .catch(this.exceptionService.catchErrorResponse);
    }

    updateBook(book: Book) {
        let body = JSON.stringify(book);

        return <Observable<Book>> this.http
            .put(`${booksUrl}/${book.isbn}`, body, this.options)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    deleteBook(book: Book) {
        return <Observable<boolean>> this.http
            .delete(`${booksUrl}/${book.isbn}`)
            .map((res: Response) => res.ok)
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBooks() {
        return <Observable<Book[]>> this.http
            .get(`${booksUrl}`)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBook(id: string) {
        return <Observable<Book>> this.http
            .get(`${booksUrl}/${id}`)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }
}
