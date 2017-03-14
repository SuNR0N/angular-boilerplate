import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IBook } from './book.model';
import { HATEOASResource, HATEOASService, IHATEOASRelation } from '../../core/hateoas';
import { CONFIG, ExceptionService } from '../../core';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class BookService {
    private options: RequestOptions;

    constructor(
        private http: Http,
        private hateoasService: HATEOASService,
        private exceptionService: ExceptionService
    ) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers });
    }

    createBook(book: IBook) {
        let body = JSON.stringify(book);

        return <Observable<HATEOASResource<IBook>>> this.http
            .post(`${booksUrl}`, body, this.options)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    // Not used directly as it's Hypermedia-Driven now by the 'edit' relation on the book resource
    updateBook(book: IBook) {
        let body = JSON.stringify(book);

        return <Observable<IBook>> this.http
            .put(`${booksUrl}/${book.isbn}`, body, this.options)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    // Not used directly as it's Hypermedia-Driven now by the 'delete' relation on the book resource
    deleteBook(book: IBook) {
        return <Observable<boolean>> this.http
            .delete(`${booksUrl}/${book.isbn}`)
            .map((res: Response) => res.ok)
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBooks() {
        return <Observable<HATEOASResource<Array<HATEOASResource<IBook>>>>> this.http
            .get(`${booksUrl}`)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    getBook(id: string) {
        return <Observable<HATEOASResource<IBook>>> this.http
            .get(`${booksUrl}/${id}`)
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }

    performActionOnBook(bookResource: HATEOASResource<IBook>, relation: IHATEOASRelation, body?: any) {
        return this.http.request(this.hateoasService.getLinkForRelation(bookResource, relation.name), { method: relation.method, body })
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }
}
