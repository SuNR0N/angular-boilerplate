import { HATEOASResource } from './hateoas-resource.model';
import { IHATEOASLink } from './hateoas-link.model';

const linksProperty: string = 'links';
const contentProperty: string = 'content';
const firstPageRelation: string = 'first';
const previousPageRelation: string = 'previous';
const nextPageRelation: string = 'next';
const lastPageRelation: string = 'last';

export class HATEOASService {
    hasRelation (resource: HATEOASResource<any>, relation: string): boolean {
        return resource.links.some((link) => link.rel === relation);
    }

    hasAnyPagingRelations (resource: HATEOASResource<any>): boolean {
        return resource.links.some((link) => {
            return link.rel === firstPageRelation ||
                link.rel === previousPageRelation ||
                link.rel === nextPageRelation ||
                link.rel === lastPageRelation;
        });
    }

    hasAnyRelations (resource: HATEOASResource<any>): boolean {
        return resource.links.length > 0;
    }

    getLinkForRelation (resource: HATEOASResource<any>, relation: string): string {
        let hateoasLink: IHATEOASLink = resource.links.find((link) => link.rel === relation);

        return hateoasLink ? hateoasLink.href : null;
    }
}
