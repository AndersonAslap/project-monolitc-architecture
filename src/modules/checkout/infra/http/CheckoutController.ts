import { UseCaseFactory } from "../../../@shared/factory/UsecaseFactory";
import { HttpServer } from "../../../@shared/infra/HttpServer";

export class CheckoutController {

    constructor(httpServer: HttpServer, usecaseFactory: UseCaseFactory) {

        httpServer.on('post', '/checkout', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createPlaceOrderUseCase()
            const output = await usecase.execute(body)
            return output
        })
    }

}