import { NgModule } from '@angular/core';

import { routedComponents, BooksRoutingModule } from './books-routing.module';

import { SharedModule } from '../shared/shared.module';
import { BookService, BookRoutingService } from './shared';

@NgModule({
    imports: [
        SharedModule,
        BooksRoutingModule
    ],
    declarations: [routedComponents],
    providers: [
        BookService,
        BookRoutingService
    ]
})
export class BooksModule { }
