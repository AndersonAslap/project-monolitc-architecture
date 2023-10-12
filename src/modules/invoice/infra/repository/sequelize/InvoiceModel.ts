import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceItemModel } from "./InvoiceItemModel";
import { Invoice } from "../../../domain/Invoice";
import { Address } from "../../../../@shared/domain/value-object/Address";
import { Id } from "../../../../@shared/domain/value-object/Id";
import { InvoiceItems } from "../../../domain/InvoiceItems";

@Table({
    tableName: 'invoices',
    timestamps: false
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull:false, type: 'string'})
    declare id: string 

    @Column({ allowNull: false, type: 'string' })
    declare name: string

    @Column({ allowNull: false, type: 'string' })
    declare document: string

    @Column({ allowNull: false, type: 'string' })
    declare street: string

    @Column({ allowNull: false, type: 'number' })
    declare number: number

    @Column({ allowNull: false, type: 'string' })
    declare complement: string

    @Column({ allowNull: false, type: 'string' })
    declare city: string

    @Column({ allowNull: false, type: 'string' })
    declare state: string

    @Column({ allowNull: false, type: 'string' })
    declare zip: string

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];

    @Column({ allowNull: false, type:'timestamp' })
    declare createdAt: Date

    @Column({ allowNull: false, type: 'timestamp' })
    declare updatedAt: Date


    public toAggregate(): Invoice {
        return new Invoice({
            address: new Address(this.street, this.number, this.complement, this.city, this.state, this.zip),
            document: this.document,
            items: this.items.map(item => new InvoiceItems({name: item.name, price: item.price, id: new Id(item.id)})),
            name: this.name,
            id: new Id(this.id),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        });
    }
}