import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { authHttpServiceFactory } from './auth-http-service.factory';

@NgModule({
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [
                Http,
                RequestOptions
            ]
        }
    ]
})
export class AuthModule { }
