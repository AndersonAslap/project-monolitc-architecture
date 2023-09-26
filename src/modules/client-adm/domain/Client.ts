import { AggregateRoot } from "../../@shared/domain/entity/AggregateRoot";
import { BaseEntity } from "../../@shared/domain/entity/BaseEntity";
import { Address } from "../../@shared/domain/value-object/Address";
import { Id } from "../../@shared/domain/value-object/Id";

type Props = {
    id?: Id
    name: string
    email: string
    address: Address
    createdAt?: Date
    updatedAt?: Date
}

export class Client extends BaseEntity implements AggregateRoot {

    private _name: string
    private _email: string
    private _address: Address

    constructor(props: Props){
        super(props)
        this._name = props.name
        this._email = props.email
        this._address = props.address
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }

    get address(): Address {
        return this._address
    }
}