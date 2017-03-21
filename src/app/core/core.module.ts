import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from './modal/modal.module';

import { ToasterService, ExceptionService, LoggerService } from './';
import { AuthService } from './auth';
import { AuthGuard, CanDeactivateGuard } from './guards';
import { NavComponent } from './nav';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './page-forbidden/page-forbidden.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ModalModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ModalModule,
        NavComponent
    ],
    declarations: [
        NavComponent,
        PageNotFoundComponent,
        PageForbiddenComponent
    ],
    providers: [
        ExceptionService,
        LoggerService,
        AuthService,
        AuthGuard,
        CanDeactivateGuard,
        ToasterService
    ]
})
export class CoreModule { }
