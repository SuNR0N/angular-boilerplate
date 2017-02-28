import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const baseRoute: string = '/books';
const editPathSegment: string = 'edit';

@Injectable()
export class BookRoutingService {
    constructor(private router: Router) { }

    gotoBooks() {
        this.router.navigate([baseRoute]);
    }

    gotoViewBook(id: string) {
        this.router.navigate([baseRoute, id]);
    }

    gotoEditBook(id: string) {
        this.router.navigate([baseRoute, id, editPathSegment]);
    }
}
