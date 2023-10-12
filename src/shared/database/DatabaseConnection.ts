import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../modules/product-adm/infra/repository/sequelize/ProductModel"
import { ClientModel } from "../../modules/client-adm/infra/repository/sequelize/ClientModel"
import { ProductModel as ProductModelStoreCatalog } from "../../modules/store-catalog/infra/repository/sequelize/ProductModel"
import { TransactionModel } from "../../modules/payment/infra/repository/sequelize/TransactionModel"
import { InvoiceModel } from "../../modules/invoice/infra/repository/sequelize/InvoiceModel"
import { InvoiceItemModel } from "../../modules/invoice/infra/repository/sequelize/InvoiceItemModel"

export class DatabaseConnection {

    static async initialized() {
        let sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:database',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([ProductModel, ClientModel, ProductModelStoreCatalog, TransactionModel, InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    }
}