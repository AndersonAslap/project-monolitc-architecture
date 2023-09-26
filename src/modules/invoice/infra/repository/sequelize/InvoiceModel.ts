import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceItemModel } from "./InvoiceItemModel";

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
}