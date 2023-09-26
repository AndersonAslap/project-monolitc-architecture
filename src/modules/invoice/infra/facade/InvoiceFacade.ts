import { FindInvoiceFacadeInput, FindInvoiceFacadeOutput, GenerateInvoiceFacadeInput, GenerateInvoiceFacadeOutput, InvoiceFacadeInterface } from "../../application/facade/InvoiceFacadeInterface";
import { InvoiceUseCaseFactory } from "../factory/InvoiceUseCaseFactory";

export class InvoiceFacade implements InvoiceFacadeInterface {
    
    constructor(readonly invoiceUseCaseFactory: InvoiceUseCaseFactory){}

    async generateInvoice(input: GenerateInvoiceFacadeInput): Promise<GenerateInvoiceFacadeOutput> {
        return await this.invoiceUseCaseFactory.createGenerateInvoiceUseCase().execute(input)
    }

    async findInvoice(input: FindInvoiceFacadeInput): Promise<FindInvoiceFacadeOutput> {
        return await this.invoiceUseCaseFactory.createFindInvoiceUseCase().execute(input)
    }
}