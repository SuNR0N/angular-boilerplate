import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './core/page-forbidden/page-forbidden.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule'
    },
    {
        path: 'books',
        loadChildren: 'app/books/books.module#BooksModule'
    },
    {
        path: '403',
        pathMatch: 'full',
        component: PageForbiddenComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }
