import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ClientGateway } from "../../application/gateway/ClientGateway";
import { AddClientUseCase } from "../../application/usecase/AddClientUseCase";
import { FindClientUseCase } from "../../application/usecase/FindClientUseCase";

export class ClientUseCaseFactory {

    constructor(readonly clientRepository: ClientGateway){}

    createAddClientUseCase(): UseCase {
        return new AddClientUseCase(this.clientRepository)
    }

    createFindClientUseCase(): UseCase {
        return new FindClientUseCase(this.clientRepository)
    }
}