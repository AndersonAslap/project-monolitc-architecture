import { AggregateRoot } from "../../@shared/domain/entity/AggregateRoot"
import { BaseEntity } from "../../@shared/domain/entity/BaseEntity"
import { Id } from "../../@shared/domain/value-object/Id"
import { Client } from "./Client"
import { Product } from "./Product"

type Props = {
    id?: Id
    client: Client
    products: Product[]
    status?: string
    createdAt?: Date
    updatedAt?: Date
}

export class Order extends BaseEntity {

    private _client: Client
    private _products: Product[]
    private _status: string

    constructor(props: Props) {
        super(props)
        this._client = props.client
        this._products = props.products
        this._status = props.status || 'pending'
    }

    get client(): Client {
        return this._client
    }

    get products(): Product[] {
        return this._products
    }

    get status(): string {
        return this._status
    }

    approved(): void {
        this._status = "approved"
    }

    get total(): number {
        return this._products.reduce((total, product) => total + product.salesPrice, 0)
    }
}


