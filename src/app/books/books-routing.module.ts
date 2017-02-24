import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        children: [
            {
                path: '',
                component: BookListComponent
            },
            {
                path: 'new',
                component: BookListComponent
            },
            {
                path: ':id',
                component: BookListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class BooksRoutingModule { }

export const routedComponents = [
    BooksComponent,
    BookListComponent
];
