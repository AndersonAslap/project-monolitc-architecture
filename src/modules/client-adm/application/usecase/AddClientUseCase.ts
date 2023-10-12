import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { Address } from "../../../@shared/domain/value-object/Address";
import { Client } from "../../domain/Client";
import { ClientGateway } from "../gateway/ClientGateway";

export class AddClientUseCase implements UseCase {

    constructor(readonly clientRepository: ClientGateway) {}
    
    async execute(input: Input): Promise<void> {
        const address = new Address(input.address.street, input.address.number, input.address.complement, input.address.city, input.address.state, input.address.zip)
        const client = new Client({name: input.name, email:input.email, document: input.document, address})
        await this.clientRepository.add(client)
    }
}

type Input = {
    name: string
    email: string
    document: string
    address: {
        street: string
        number: number
        complement: string
        city: string
        state: string
        zip: string
    }
}