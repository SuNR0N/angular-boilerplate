import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SearchComponent,
        PagerComponent
    ],
    declarations: [
        SearchComponent,
        PagerComponent
    ]
})
export class SharedModule { }
