import { IHATEOASLink } from './hateoas-link.model';

export class HATEOASResource<T> {
    content: T;
    links: IHATEOASLink[];
}
