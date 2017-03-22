import { IHATEOASResource, HATEOASResource, ISerializable, IHATEOASLink } from './';

const firstPageRelName: string = 'first';
const previousPageRelName: string = 'prev';
const nextPageRelName: string = 'next';
const lastPageRelName: string = 'last';

export interface IHATEOASPageResource<T extends ISerializable> extends IHATEOASResource {
    _embedded: Map<string, T[]>;
    currentPage?: number;
    totalPages?: number;
    totalItems: number;

    hasAnyPagingRels: () => boolean;
    getFirstPageRelName: () => string;
    hasFirstPageRel: () => boolean;
    getFirstPageRel: () => IHATEOASLink;
    getPreviousPageRelName: () => string;
    hasPreviousPageRel: () => boolean;
    getPreviousPageRel: () => IHATEOASLink;
    getNextPageRelName: () => string;
    hasNextPageRel: () => boolean;
    getNextPageRel: () => IHATEOASLink;
    getLastPageRelName: () => string;
    hasLastPageRel: () => boolean;
    getLastPageRel: () => IHATEOASLink;
    getCollection: () => T[];
}

export class HATEOASPageResource<T extends ISerializable> extends HATEOASResource implements IHATEOASPageResource<T> {
    _embedded: Map<string, T[]>;
    currentPage?: number;
    totalPages?: number;
    totalItems: number;

    constructor(private type: any) {
        super();
    }

    deserialize(json: any): this {
        super.deserialize(json);

        this._embedded = new Map<string, T[]>();
        if (json && json.hasOwnProperty('_embedded')) {
            for (let key in json._embedded) {
                if (json._embedded.hasOwnProperty(key)) {
                    let collection: T[] = json._embedded[key].map((item: any) => {
                        return this.getNew().deserialize(item);
                    });

                    this._embedded.set(key, collection);
                }
            }
        }

        if (json.hasOwnProperty('currentPage')) {
            this.currentPage = json.currentPage;
        }
        if (json.hasOwnProperty('totalPages')) {
            this.totalPages = json.totalPages;
        }

        this.totalItems = json.totalItems;

        return this;
    }

    hasAnyPagingRels (): boolean {
        return this._links.has(firstPageRelName) ||
            this._links.has(previousPageRelName) ||
            this._links.has(nextPageRelName) ||
            this._links.has(lastPageRelName);
    }

    getFirstPageRelName (): string {
        return firstPageRelName;
    }

    hasFirstPageRel (): boolean {
        return this.hasLinkWithRel(firstPageRelName);
    }

    getFirstPageRel (): IHATEOASLink {
        return this.getLinkWithRel(firstPageRelName);
    }

    getPreviousPageRelName (): string {
        return previousPageRelName;
    }

    hasPreviousPageRel (): boolean {
        return this.hasLinkWithRel(previousPageRelName);
    }

    getPreviousPageRel (): IHATEOASLink {
        return this.getLinkWithRel(previousPageRelName);
    }

    getNextPageRelName (): string {
        return nextPageRelName;
    }

    hasNextPageRel (): boolean {
        return this.hasLinkWithRel(nextPageRelName);
    }

    getNextPageRel (): IHATEOASLink {
        return this.getLinkWithRel(nextPageRelName);
    }

    getLastPageRelName (): string {
        return lastPageRelName;
    }

    hasLastPageRel (): boolean {
        return this.hasLinkWithRel(lastPageRelName);
    }

    getLastPageRel (): IHATEOASLink {
        return this.getLinkWithRel(lastPageRelName);
    }

    getCollection (): T[] {
        return this._embedded.values().next().value;
    }

    private getNew(): T {
        return new this.type();
    }
}
