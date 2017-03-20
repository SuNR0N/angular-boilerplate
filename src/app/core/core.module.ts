import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToasterService, ExceptionService, LoggerService } from './';
import { AuthService, AuthGuard } from './auth';
import { NavComponent } from './nav';

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
        ToasterService
    ]
})
export class CoreModule { }
