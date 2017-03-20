import { IHATEOASResource, HATEOASResource, ISerializable } from './';

const firstPageRel: string = 'first';
const previousPageRel: string = 'prev';
const nextPageRel: string = 'next';
const lastPageRel: string = 'last';

export interface IHATEOASPageResource<T extends ISerializable> extends IHATEOASResource {
    _embedded: Map<string, T[]>;
    currentPage?: number;
    totalPages?: number;
    totalItems: number;

    hasAnyPagingRels: () => boolean;
    hasFirstPageRel: () => boolean;
    hasPreviousPageRel: () => boolean;
    hasNextPageRel: () => boolean;
    hasLastPageRel: () => boolean;
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
        return this._links.has(firstPageRel) ||
            this._links.has(previousPageRel) ||
            this._links.has(nextPageRel) ||
            this._links.has(lastPageRel);
    }

    hasFirstPageRel (): boolean {
        return this._links.has(firstPageRel);
    }

    hasPreviousPageRel (): boolean {
        return this._links.has(previousPageRel);
    }

    hasNextPageRel (): boolean {
        return this._links.has(nextPageRel);
    }

    hasLastPageRel (): boolean {
        return this._links.has(lastPageRel);
    }

    getCollection (): T[] {
        return this._embedded.values().next().value;
    }

    private getNew(): T {
        return new this.type();
    }
}
