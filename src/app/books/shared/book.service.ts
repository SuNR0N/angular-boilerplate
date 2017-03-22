import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthHttp } from 'angular2-jwt';

import { IBook, Book } from './book.model';
import { HATEOASService } from '../../core/hateoas/hateoas.service';
import { HATEOASPageResource } from '../../core/hateoas/hateoas-page-resource.model';
import { CONFIG, ExceptionService, ResetService } from '../../core';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class BookService extends HATEOASService {
    onReset: Subject<number>;

    private options: RequestOptions;

    constructor(
        http: AuthHttp,
        exceptionService: ExceptionService,
        private resetService: ResetService
    ) {
        super(http, exceptionService);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers });
        this.onReset = this.resetService.resetCountSubject;
    }

    createBook(book: IBook) {
        return <Observable<Book>> this.http
            .post(`${booksUrl}`, book, this.options)
            .map((res: Response) => res.json())
            .map((json) => new Book().deserialize(json))
            .catch(this.exceptionService.catchErrorResponse);
    }

    // Not used directly as it's Hypermedia-Driven now by the 'edit' relation on the book resource
    updateBook(book: Book) {
        return <Observable<Book>> this.http
            .put(`${booksUrl}/${book.isbn}`, book, this.options)
            .map((res: Response) => res.json())
            .map((json) => new Book().deserialize(json))
            .catch(this.exceptionService.catchErrorResponse);
    }

    // Not used directly as it's Hypermedia-Driven now by the 'delete' relation on the book resource
    deleteBook(book: Book) {
        return <Observable<boolean>> this.http
            .delete(`${booksUrl}/${book.isbn}`)
            .map((res: Response) => res.ok)
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBooks(query?: string, page: number = 0, size: number = 10) {
        let params = new URLSearchParams();
        if (query) {
            params.set('q', query);
        }
        params.set('page', page.toString());
        params.set('size', size.toString());
        return <Observable<HATEOASPageResource<Book>>> this.http
            .get(`${booksUrl}`, { search: params })
            .map((res: Response) => res.json())
            .map((json) => new HATEOASPageResource<Book>(Book).deserialize(json))
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBook(id: string) {
        return <Observable<Book>> this.http
            .get(`${booksUrl}/${id}`)
            .map((res: Response) => res.json())
            .map((json) => new Book().deserialize(json))
            .catch(this.exceptionService.catchErrorResponse);
    }
}
