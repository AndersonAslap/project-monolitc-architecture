import { Client } from "../../domain/Client"

export interface ClientGateway {
    add(input: Client): Promise<void>
    find(id: string): Promise<Client>
}