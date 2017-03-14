import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoggerService } from '../../core';
import { HATEOASResource } from '../../core/hateoas';
import { BookService, IBook } from './';

@Injectable()
export class BookResolverService implements Resolve<HATEOASResource<IBook>> {

    constructor(
        private loggerService: LoggerService,
        private bookService: BookService,
        private router: Router
    ) { }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        return this.bookService.getBook(id)
            .map((bookResource) => {
                if (bookResource) {
                    return bookResource;
                }
                let msg = `Book with ISBN ${id} not found`;
                this.loggerService.log(msg);
                throw new Error(msg);
            })
            .catch((error: any) => {
                this.loggerService.log(`${error}. Navigating back to book list`);
                this.router.navigate(['/books']);
                return Observable.of(null);
            });
    }
}
