import { IHATEOASLink, HATEOASLink } from './hateoas-link.model';
import { ISerializable } from './serializable.model';

export interface IHATEOASResource {
    _links: Map<string, IHATEOASLink>;

    getLinkWithRel: (rel: string) => IHATEOASLink;
    hasLinkWithRel: (rel: string) => boolean;
    hasAnyLinks: () => boolean;
}

export class HATEOASResource implements IHATEOASResource, ISerializable {
    _links: Map<string, IHATEOASLink>;

    deserialize(json: any): this {
        this._links = new Map();
        if (json && json.hasOwnProperty('_links')) {
            for (let rel in json._links) {
                if (json._links.hasOwnProperty(rel)) {
                    let link: HATEOASLink = new HATEOASLink().deserialize(json._links[rel]);
                    this._links.set(rel, link);
                }
            }
        }

        return this;
    }

    getLinkWithRel (rel: string): IHATEOASLink {
        return this._links.get(rel);
    };

    hasLinkWithRel (rel: string): boolean {
        return this._links.has(rel);
    }

    hasAnyLinks (): boolean {
        return this._links.size > 0;
    }
}
