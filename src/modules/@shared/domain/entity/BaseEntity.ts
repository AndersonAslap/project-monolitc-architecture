import { Id } from '../value-object/Id'

type Props = {
    id?: Id
    createdAt?: Date
    updatedAt?: Date
}

export class BaseEntity {
    
    private _id: Id
    private _createdAt: Date
    private _updatedAt: Date

    constructor(props: Props) {
        this._id = props.id || new Id()
        this._createdAt = props.createdAt || new Date()
        this._updatedAt = props.updatedAt || new Date()
    }

    get id(): Id {
        return this._id
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date {
        return this._updatedAt
    }

    set updatedAt(date: Date) {
        this._updatedAt = date
    }
}