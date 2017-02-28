import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookViewComponent } from './book-view/book-view.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookResolverService } from './shared/book-resolver.service';

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
                component: BookCreateComponent
            },
            {
                path: ':id',
                component: BookViewComponent,
                resolve: {
                    book: BookResolverService
                }
            },
            {
                path: ':id/edit',
                component: BookEditComponent,
                resolve: {
                    book: BookResolverService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BookResolverService],
})
export class BooksRoutingModule { }

export const routedComponents = [
    BooksComponent,
    BookCreateComponent,
    BookListComponent,
    BookViewComponent,
    BookEditComponent
];
