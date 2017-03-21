import { HATEOASResource } from '../../core/hateoas/hateoas-resource.model';
import { ISerializable } from '../../core/hateoas/serializable.model';

export interface IBook {
    isbn: string;
    title: string;
    author: string;
    publicationDate: string;
}

export class Book extends HATEOASResource implements IBook, ISerializable {
    static Links = {
        Delete: 'delete',
        Edit: 'edit',
        Self: 'self'
    };

    isbn: string;
    title: string;
    author: string;
    publicationDate: string;

    deserialize(json: any): this {
        super.deserialize(json);

        this.isbn = json.isbn;
        this.title = json.title;
        this.author = json.author;
        this.publicationDate = json.publicationDate;

        return this;
    }

    equals(other: IBook): boolean {
        if (!other) {
            return false;
        }

        return this.isbn === other.isbn &&
            this.title === other.title &&
            this.author === other.author &&
            this.publicationDate === other.publicationDate;
    }
 }
