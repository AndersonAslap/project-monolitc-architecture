import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'transaction',
    timestamps: false
})
export class TransactionModel extends Model {
    @PrimaryKey
    @Column({allowNull:false, type: 'string'})
    declare id: string 

    @Column({ allowNull: false, type: 'string' })
    declare orderId: string

    @Column({ allowNull: false, type: 'number' })
    declare amount: number

    @Column({ allowNull: false, type: 'string' })
    declare status: string

    @Column({ allowNull: false, type:'timestamp' })
    declare createdAt: Date

    @Column({ allowNull: false, type: 'timestamp' })
    declare updatedAt: Date
}