export type AddClientFacadeInput = {
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

export type FindClientFacadeInput = {
    clientId: string
}

export type FindClientFacadeOutput = {
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
    createdAt: string
    updatedAt: string
}

export interface ClientFacadeInterface {
    addClient(input: AddClientFacadeInput): Promise<void> 
    findClient(input: FindClientFacadeInput): Promise<FindClientFacadeOutput>
}