import { ISerializable } from './serializable.model';

type HTTPVerb = 'DELETE' | 'GET' | 'POST' | 'PUT';

export interface IHATEOASLink {
    href: string;
    method: HTTPVerb;
}

export class HATEOASLink implements IHATEOASLink, ISerializable {
    href: string;
    method: HTTPVerb;

    deserialize(json: any): this {
        this.href = json.href;
        this.method = json.method;

        return this;
    }
}
