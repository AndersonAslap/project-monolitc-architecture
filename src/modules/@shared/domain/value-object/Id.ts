import { v4 as uuidv4 } from 'uuid'
import { ValueObject } from './ValueObject'

export class Id implements ValueObject {
    readonly value: string

    constructor(id?: string) {
        this.value = id || uuidv4()
    }
}