import { RequestMethod } from '@angular/http';
import { IHATEOASRelation } from '../../core/hateoas/hateoas-relation.model';

export class BookRelation {
    public static readonly Self: IHATEOASRelation = {
        name: 'self',
        method: RequestMethod.Get
    };
    public static readonly Edit: IHATEOASRelation = {
        name: 'edit',
        method: RequestMethod.Put
    };
    public static readonly Delete: IHATEOASRelation = {
        name: 'delete',
        method: RequestMethod.Delete
    };
}

export interface IBook {
    isbn: string;
    title: string;
    author: string;
    publicationDate: string;
}
