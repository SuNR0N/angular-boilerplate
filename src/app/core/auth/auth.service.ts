import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CONFIG } from '../config';
import { ExceptionService } from '../exception.service';
import { IUser } from './user.model';
import { ICredential } from '../../login/credential.model';

@Injectable()
export class AuthService {
    private isLoginSubject: BehaviorSubject<boolean>;
    private options: RequestOptions;

    constructor(
        private router: Router,
        private exceptionService: ExceptionService,
        private http: Http) {
        this.isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers });
    }

    login(credential: ICredential) {
        return <Observable<IUser>> this.http
            .post(`${CONFIG.baseUrls.authenticate}`, credential, this.options)
            .map((res: Response) => {
                let user: IUser = res.json();
                localStorage.setItem(CONFIG.localStorage.profile, JSON.stringify(user));
                this.isLoginSubject.next(true);
                return user;
            })
            .catch(this.exceptionService.catchErrorResponse);
    }

    logout() {
        localStorage.removeItem(CONFIG.localStorage.profile);
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
        return !!localStorage.getItem(CONFIG.localStorage.profile);
    }
}
