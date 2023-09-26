import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./InvoiceModel";

@Table({
    tableName: 'items',
    timestamps: false
})
export class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({allowNull:false, type: 'string'})
    declare id: string 

    @Column({ allowNull: false, type: 'string' })
    declare name: string

    @Column({ allowNull: false, type: 'number' })
    declare price: number

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false, type: 'string' })
    declare invoice_id: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel;

    @Column({ allowNull: false, type:'timestamp' })
    declare createdAt: Date

    @Column({ allowNull: false, type: 'timestamp' })
    declare updatedAt: Date
}