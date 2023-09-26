import { ValueObject } from "./ValueObject";

export class Address implements ValueObject {
    constructor(readonly street: string, readonly number:number , readonly complement: string, readonly city: string, readonly state: string ,readonly zip: string) {}
}