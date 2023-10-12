import { ClientGateway } from "../../client-adm/application/gateway/ClientGateway";
import { ClientRepositoryDatabase } from "../../client-adm/infra/repository/sequelize/ClientRepositoryDatabase";
import { InvoiceGateway } from "../../invoice/application/gateway/InvoiceGateway";
import { InvoiceRepositoryDatabase } from "../../invoice/infra/repository/sequelize/InvoiceRepositoryDatabase";
import { ProductGateway } from "../../product-adm/application/gateway/ProductGateway";
import { ProductRepositoryDatabase } from "../../product-adm/infra/repository/sequelize/ProductRepositoryDatabase";

export class RepositoryFactory {

    createProductAdmRepository(): ProductGateway {
        return new ProductRepositoryDatabase()
    }

    createClientRepository(): ClientGateway {
        return new ClientRepositoryDatabase()
    }

    createInvoiceRepository(): InvoiceGateway {
        return new InvoiceRepositoryDatabase()
    }
}