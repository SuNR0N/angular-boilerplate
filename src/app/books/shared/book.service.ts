import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IBook, Book } from './book.model';
import { IHATEOASLink } from '../../core/hateoas/hateoas-link.model';
import { HATEOASPageResource } from '../../core/hateoas/hateoas-page-resource.model';
import { CONFIG, ExceptionService } from '../../core';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class BookService {
    private options: RequestOptions;

    constructor(
        private http: Http,
        private exceptionService: ExceptionService
    ) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers });
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

    getBooks() {
        return <Observable<HATEOASPageResource<Book>>> this.http
            .get(`${booksUrl}`)
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

    performActionOnBook(book: Book, rel: string, body?: any) {
        let link: IHATEOASLink = book.getLinkWithRel(rel);
        return this.http.request(link.href, { method: link.method, body })
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }
}
