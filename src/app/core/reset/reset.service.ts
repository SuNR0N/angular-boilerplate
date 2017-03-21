import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthHttp } from 'angular2-jwt';

import { CONFIG } from '../config';
import { ToasterService } from '../toaster/toaster.service';

const booksUrl = CONFIG.baseUrls.books;

@Injectable()
export class ResetService {
    resetCountSubject: Subject<number>;
    private counter: number;

    constructor(
        private http: AuthHttp,
        private toasterService: ToasterService
    ) {
        this.counter = 0;
        this.resetCountSubject = new Subject<number>();
    }

    reset() {
        return this.http
            .post(`${booksUrl}/reset-action`, null)
                .subscribe(() => {
                    this.resetCountSubject.next(++this.counter);
                    this.toasterService.success('Database has been successfully reverted', 'Successful Restoration');
                });
    }
}
