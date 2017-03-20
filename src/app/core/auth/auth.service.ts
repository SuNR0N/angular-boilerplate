import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { CONFIG, ExceptionService } from '../';
import { IUser } from './user.model';
import { ICredential } from '../../login/credential.model';

const headerName = 'Authorization';
const headerPrefix = 'Bearer ';

@Injectable()
export class AuthService {
    private isLoginSubject: BehaviorSubject<boolean>;
    private options: RequestOptions;

    constructor(
        private router: Router,
        private exceptionService: ExceptionService,
        private http: AuthHttp
    ) {
        this.isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers });
    }

    login(credential: ICredential) {
        return <Observable<IUser>> this.http
            .post(`${CONFIG.baseUrls.authenticate}`, credential, this.options)
            .map((res: Response) => {
                let token = this.getToken(res.headers);
                let user: IUser = res.json();
                localStorage.setItem(CONFIG.auth.tokenName, token);
                localStorage.setItem(CONFIG.auth.profile, JSON.stringify(user));
                this.isLoginSubject.next(true);
                return user;
            })
            .catch(this.exceptionService.catchErrorResponse);
    }

    logout() {
        localStorage.removeItem(CONFIG.auth.tokenName);
        localStorage.removeItem(CONFIG.auth.profile);
        this.isLoginSubject.next(false);
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.isLoginSubject.asObservable();
    }

    isLoggedInValue() {
        return this.isLoginSubject.getValue();
    }

    private hasToken() {
        return tokenNotExpired();
    }

    private getToken(headers: Headers): string {
        let headerValue = headers.get(headerName);
        let regExp = new RegExp('^' + headerPrefix + '(.*)$');
        let tokenArr = regExp.exec(headerValue);

        if (tokenArr) {
            return tokenArr[1];
        } else {
            return null;
        }
    }
}
