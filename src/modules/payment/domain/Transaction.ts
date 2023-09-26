import { BaseEntity } from "../../@shared/domain/entity/BaseEntity"
import { Id } from "../../@shared/domain/value-object/Id"
import { AggregateRoot } from "../../@shared/domain/entity/AggregateRoot"

type Props = {
    id?: Id
    amount: number
    orderId: string
    status?: string
    createdAt?: Date
    updateddAt?: Date
}

export class Transaction extends BaseEntity implements AggregateRoot {

    private _amount: number
    private _orderId: string
    private _status: string

    constructor(props: Props){
        super(props)
        this._amount = props.amount
        this._orderId = props.orderId
        this._status = props.status || "pending"
        this.validate()
    }

    get amount(): number {
        return this._amount
    }

    get orderId(): string {
        return this._orderId
    }

    get status(): string {
        return this._status
    }

    set status(status: string) {
        this._status = status
    }

    private validate(): void {
        if (this._amount <= 0) throw new Error("Amount must be greater than 0")
    }

    private approve(): void {
        this._status = "approved"
    }

    private decline(): void {
        this._status = "declined"
    }

    process(): void {
        if (this._amount >= 100) {
            this.approve()
        } else {
            this.decline()
        }
    }
}