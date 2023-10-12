import { Address } from "../../../../@shared/domain/value-object/Address";
import { Id } from "../../../../@shared/domain/value-object/Id";
import { ClientGateway } from "../../../application/gateway/ClientGateway";
import { Client } from "../../../domain/Client";
import { ClientModel } from "./ClientModel";

export class ClientRepositoryDatabase implements ClientGateway {
    
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zip: client.address.zip,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }
    
    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({ where: {id} })
        if (!client) throw new Error('Client not found')
        return new Client({
            id: new Id(client?.id),
            name: client?.name,
            email: client?.email,
            document: client?.document,
            address: new Address(client?.street, client?.number, client?.complement, client?.city, client?.state, client?.zip),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }
}