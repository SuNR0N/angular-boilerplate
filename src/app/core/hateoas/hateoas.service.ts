import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'angular2-jwt';

import { ExceptionService } from '../exception/exception.service';
import { IHATEOASLink } from './hateoas-link.model';
import { IHATEOASResource } from './hateoas-resource.model';

export interface IHATEOASService {
    performActionOnResource: (resource: IHATEOASResource, rel: string, body?: any) => Observable<any>;
}

@Injectable()
export class HATEOASService implements IHATEOASService {
    constructor(
        protected http: AuthHttp,
        protected exceptionService: ExceptionService
    ) {}

    performActionOnResource(resource: IHATEOASResource, rel: string, body?: any) {
        let link: IHATEOASLink = resource.getLinkWithRel(rel);
        return this.http.request(link.href, { method: link.method, body })
            .map((res: Response) => res.json())
            .catch(this.exceptionService.catchErrorResponse);
    }
}
