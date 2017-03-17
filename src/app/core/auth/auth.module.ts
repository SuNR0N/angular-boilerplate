import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

let authHttpServiceFactory = (http: Http, options: RequestOptions): AuthHttp => {
    return new AuthHttp(new AuthConfig({
        noJwtError: true
    }), http, options);
};

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
