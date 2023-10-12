import { AggregateRoot } from "../../@shared/domain/entity/AggregateRoot"
import { BaseEntity } from "../../@shared/domain/entity/BaseEntity"
import { Id } from "../../@shared/domain/value-object/Id"

type Props = {
    id?: Id
    name: string
    description: string
    salesPrice: number
    createdAt?: Date
    updatedAt?: Date
}

export class Product extends BaseEntity implements AggregateRoot {

    private _name: string
    private _description: string
    private _salesPrice: number

    constructor(props: Props) {
        super(props)
        this._name = props.name 
        this._description = props.description
        this._salesPrice = props.salesPrice
    }

    get name(): string {
        return this._name 
    }

    get description(): string {
        return this._description
    }

    get salesPrice(): number {
        return this._salesPrice
    }
}