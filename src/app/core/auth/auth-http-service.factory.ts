import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions): AuthHttp {
    return new AuthHttp(new AuthConfig({
        noJwtError: true
    }), http, options);
}
