import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExceptionService {
    catchErrorResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        let response = <Response> errorResponse;
        let error = response.json();
        let errorMessage = error ?
            (error.error ? error.error : JSON.stringify(error)) :
            (response.statusText || 'Unknown Error');
        return Observable.throw(errorMessage);
    }
}
