import { AggregateRoot } from "../../@shared/domain/entity/AggregateRoot";
import { BaseEntity } from "../../@shared/domain/entity/BaseEntity";
import { Address } from "../../@shared/domain/value-object/Address";
import { Id } from "../../@shared/domain/value-object/Id";
import { InvoiceItems } from "./InvoiceItems";

type Props = {
    id?: Id
    name: string
    document: string
    address: Address
    items: InvoiceItems[]
    createdAt?: Date
    updatedAt?: Date
}

export class Invoice extends BaseEntity implements AggregateRoot {

    private _name: string
    private _document: string
    private _address: Address
    private _items: InvoiceItems[]

    constructor(props: Props){
        super(props)
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items
    }

    get name(): string {
        return this._name
    }

    get document(): string {
        return this._document
    }

    get address(): Address {
        return this._address
    }

    get items(): InvoiceItems[] {
        return this._items
    }

    addItem(item: InvoiceItems): void {
        this._items.push(item)
    }

    total(): number {
        return this._items.reduce((accumulator, item) => accumulator + item.price, 0)
    }
}