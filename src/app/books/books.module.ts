import { NgModule } from '@angular/core';

import { routedComponents, BooksRoutingModule } from './books-routing.module';

import { SharedModule } from '../shared/shared.module';
import { BookService } from './shared/book.service';

@NgModule({
    imports: [
        SharedModule,
        BooksRoutingModule
    ],
    declarations: [routedComponents],
    providers: [BookService],
})
export class BooksModule { }
