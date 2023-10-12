import { UseCaseFactory } from "../../../@shared/factory/UsecaseFactory";
import { HttpServer } from "../../../@shared/infra/HttpServer";

export class ClientController {

    constructor(httpServer: HttpServer, usecaseFactory: UseCaseFactory) {

        httpServer.on('post', '/clients', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createAddClientUseCase()
            const output = await usecase.execute(body)
            return output
        })
    }
}