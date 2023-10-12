import { UseCaseFactory } from "../../../@shared/factory/UsecaseFactory";
import { HttpServer } from "../../../@shared/infra/HttpServer";

export class InvoiceController {

    constructor(httpServer: HttpServer, usecaseFactory: UseCaseFactory) {

        httpServer.on('get', '/invoice/:invoiceId', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createFindInvoiceUseCase()
            const output = await usecase.execute({invoiceId: params.invoiceId})
            return output
        })
    }
}