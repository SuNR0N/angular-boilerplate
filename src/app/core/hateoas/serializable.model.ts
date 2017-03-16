export interface ISerializable {
    deserialize(json: any): this;
}
