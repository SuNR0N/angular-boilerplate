import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ExceptionService, LoggerService } from './';
import { AuthService, AuthGuard } from './auth';
import { NavComponent } from './nav';
import { HATEOASService } from './hateoas';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NavComponent
    ],
    declarations: [NavComponent],
    providers: [
        ExceptionService,
        LoggerService,
        AuthService,
        AuthGuard,
        HATEOASService
    ]
})
export class CoreModule { }
