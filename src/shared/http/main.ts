import { RepositoryFactory } from "../../modules/@shared/factory/RepositoryFactory";
import { UseCaseFactory } from "../../modules/@shared/factory/UsecaseFactory";
import { ExpressAdapter } from "../../modules/@shared/infra/ExpressAdapter";
import { CheckoutController } from "../../modules/checkout/infra/http/CheckoutController";
import { ClientController } from "../../modules/client-adm/infra/http/ClientController";
import { InvoiceController } from "../../modules/invoice/infra/http/InvoiceController";
import { ProductAdmController } from "../../modules/product-adm/infra/http/ProductAdmController";
import { DatabaseConnection } from "../database/DatabaseConnection";

DatabaseConnection.initialized()
const repositoryFactory = new RepositoryFactory()
const usecaseFactory = new UseCaseFactory(repositoryFactory)
const httpServer = new ExpressAdapter()
new ProductAdmController(httpServer, usecaseFactory)
new ClientController(httpServer, usecaseFactory)
new CheckoutController(httpServer, usecaseFactory)
new InvoiceController(httpServer, usecaseFactory)
httpServer.listen(3444)