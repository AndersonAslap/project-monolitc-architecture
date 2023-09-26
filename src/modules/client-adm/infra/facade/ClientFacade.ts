import { AddClientFacadeInput, ClientFacadeInterface, FindClientFacadeInput, FindClientFacadeOutput } from "../../application/facade/ClientFacadeInterface";
import { ClientUseCaseFactory } from "../factory/ClientUseCaseFactory";

export class ClientFacade implements ClientFacadeInterface {
    
    constructor(readonly clientUseCaseFactory: ClientUseCaseFactory){}

    async addClient(input: AddClientFacadeInput): Promise<void> {
        return await this.clientUseCaseFactory.createAddClientUseCase().execute(input)
    }

    async findClient(input: FindClientFacadeInput): Promise<FindClientFacadeOutput> {
        return await this.clientUseCaseFactory.createFindClientUseCase().execute(input)
    }
}