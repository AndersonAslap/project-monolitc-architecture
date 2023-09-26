import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ClientGateway } from "../gateway/ClientGateway";

export class FindClientUseCase implements UseCase {

    constructor(readonly clientRepository: ClientGateway){}
    
    async execute(input: Input): Promise<Output> {
        const client = await this.clientRepository.find(input.clientId)
        return {
            clientId: client.id.value,
            name: client.name,
            email: client.email,
            address: `${client.address.street}, ${client.address.number} - ${client.address.state}`,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}

type Input = {
    clientId: string
}

type Output = {
    clientId: string
    name: string
    email: string
    address: string
    createdAt: Date
    updatedAt: Date
}