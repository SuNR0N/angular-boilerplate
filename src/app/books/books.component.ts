import { Component } from '@angular/core';

import { BookService } from './shared/book.service';

@Component({
    template: `<router-outlet></router-outlet>`,
    providers: [BookService]
})
export class BooksComponent { }
