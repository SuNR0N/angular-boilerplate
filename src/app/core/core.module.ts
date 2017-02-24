import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { NavComponent } from './nav/nav.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NavComponent
    ],
    declarations: [NavComponent],
    providers: [],
})
export class CoreModule { }
