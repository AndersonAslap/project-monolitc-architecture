import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { InvoiceGateway } from "../../application/gateway/InvoiceGateway";
import { FindInvoiceUseCase } from "../../application/usecase/FindInvoiceUseCase";
import { GenerateInvoiceUseCase } from "../../application/usecase/GenerateInvoiceUseCase";

export class InvoiceUseCaseFactory {

    constructor(readonly invoiceRepository: InvoiceGateway){}

    createGenerateInvoiceUseCase(): UseCase {
        return new GenerateInvoiceUseCase(this.invoiceRepository)
    }

    createFindInvoiceUseCase(): UseCase {
        return new FindInvoiceUseCase(this.invoiceRepository)
    }
}