import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ExceptionService {
    catchErrorResponse: (errorResponse: Response | any) => Observable<any> = (errorResponse: Response | any) => {
        let errorMessage;
        if (errorResponse instanceof Response) {
            let errorBody;
            try {
                errorBody = errorResponse.json();
            } catch (e) {
                errorBody = '';
            }
            const errorText = errorBody.error || JSON.stringify(errorBody);
            errorMessage = `${errorResponse.status} - ${errorResponse.statusText || 'Unknown Error'} ${errorText}`;
        } else {
            errorMessage = errorResponse.error ? errorResponse.error : errorResponse.toString();
        }

        return Observable.throw(errorMessage);
    }
}
