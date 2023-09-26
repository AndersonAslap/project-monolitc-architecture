import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'products',
    timestamps: false
})
export class ProductModel extends Model {
    @PrimaryKey
    @Column({allowNull:false, type: 'string'})
    declare id: string 

    @Column({ allowNull: false, type: 'string' })
    declare name: string

    @Column({ allowNull: false, type: 'string' })
    declare description: string

    @Column({ allowNull: false, type: 'number' })
    declare salesPrice: number

    @Column({ allowNull: false, type:'timestamp' })
    declare createdAt: Date

    @Column({ allowNull: false, type: 'timestamp' })
    declare updatedAt: Date
}