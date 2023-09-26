import { InvoiceFacadeInterface } from "../../application/facade/InvoiceFacadeInterface";
import { InvoiceFacade } from "../facade/InvoiceFacade";
import { InvoiceRepositoryDatabase } from "../repository/sequelize/InvoiceRepositoryDatabase";
import { InvoiceUseCaseFactory } from "./InvoiceUseCaseFactory";

export class InvoiceFacadeFactory {

    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepositoryDatabase()
        const invoiceUseCaseFactory = new InvoiceUseCaseFactory(invoiceRepository)
        const facade = new InvoiceFacade(invoiceUseCaseFactory)
        return facade
    }
}