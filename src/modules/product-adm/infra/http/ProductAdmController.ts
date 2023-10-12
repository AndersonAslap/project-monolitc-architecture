import { UseCaseFactory } from "../../../@shared/factory/UsecaseFactory";
import { HttpServer } from "../../../@shared/infra/HttpServer";

export class ProductAdmController {
    
    constructor(httpServer: HttpServer, usecaseFactory: UseCaseFactory) {

        httpServer.on('post', '/products', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createAddProductUseCase()
            const output = await usecase.execute(body)
            return output
        })
    }
}