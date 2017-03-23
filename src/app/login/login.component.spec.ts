import { expect } from 'chai';
import { spy, stub } from 'sinon';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoggerService, ToasterService } from '../core';
import { AuthService } from '../core/auth/auth.service';

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let comp: LoginComponent;
    let el;

    let toasterServiceStub;
    let loggerServiceStub;
    let activatedRouteStub;
    let routerStub;
    let authServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            providers: [
                {
                    provide: ToasterService,
                    useValue: toasterServiceStub
                },
                {
                    provide: LoggerService,
                    useValue: loggerServiceStub
                },
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteStub
                },
                {
                    provide: Router,
                    useValue: routerStub
                },
                {
                    provide: AuthService,
                    useValue: authServiceStub
                }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
    });
});
