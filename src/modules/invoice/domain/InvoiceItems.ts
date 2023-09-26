import { BaseEntity } from "../../@shared/domain/entity/BaseEntity";
import { Id } from "../../@shared/domain/value-object/Id";

type Props = {
    id?: Id
    name: string
    price: number
    createdAt?: Date
    updatedAt?: Date
}

export class InvoiceItems extends BaseEntity {

    private _name: string
    private _price: number

    constructor(props: Props){
        super(props)
        this._name = props.name
        this._price = props.price
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }
}