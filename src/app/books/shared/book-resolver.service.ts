import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoggerService, ToasterService } from '../../core';
import { BookService, Book } from './';

@Injectable()
export class BookResolverService implements Resolve<Book> {

    constructor(
        private toasterService: ToasterService,
        private loggerService: LoggerService,
        private bookService: BookService,
        private router: Router
    ) { }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        return this.bookService.getBook(id)
            .map((book) => {
                if (book) {
                    return book;
                }
                let msg = `Book with ISBN ${id} not found`;
                this.loggerService.log(msg);
                throw new Error(msg);
            })
            .catch((error: any) => {
                this.toasterService.error(`Failed to retrieve book with ISBN ${id}`, 'Load Failed');
                this.loggerService.log(`${error}. Navigating back to book list`);
                this.router.navigate(['/books']);
                return Observable.of(null);
            });
    }
}
