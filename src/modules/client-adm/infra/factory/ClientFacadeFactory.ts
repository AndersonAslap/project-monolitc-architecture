import { ClientFacadeInterface } from "../../application/facade/ClientFacadeInterface";
import { ClientFacade } from "../facade/ClientFacade";
import { ClientRepositoryDatabase } from "../repository/sequelize/ClientRepositoryDatabase";
import { ClientUseCaseFactory } from "./ClientUseCaseFactory";

export class ClientFacadeFactory {

    static create(): ClientFacadeInterface {
        const clientRepository = new ClientRepositoryDatabase()
        const clientUseCaseFactory = new ClientUseCaseFactory(clientRepository)
        const facade = new ClientFacade(clientUseCaseFactory)
        return facade
    }
}