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
            document: client.document,
            address: {
                street: client.address.street,
                number: client.address.number,
                complement: client.address.complement,
                city: client.address.city,
                state: client.address.state,
                zipCode: client.address.zip
            },
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
    document: string
    address: {
        street: string
        number: number
        complement: string
        city: string
        state: string
        zipCode: string
    }
    createdAt: Date
    updatedAt: Date
}