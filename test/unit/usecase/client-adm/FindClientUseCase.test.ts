import { Address } from "../../../../src/modules/@shared/domain/value-object/Address"
import { FindClientUseCase } from "../../../../src/modules/client-adm/application/usecase/FindClientUseCase"
import { Client } from "../../../../src/modules/client-adm/domain/Client"

const client = new Client({
    name: 'Anderson',
    email: 'aslap@gmail.com',
    address: new Address('rua quarenta', 200, '', '', 'Pernambuco', '55555-555')
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("AddClientUseCase tests", () => {

    let clientRepository = MockRepository()

    it("should find a client", async () => {
        const usecase = new FindClientUseCase(clientRepository)
        const clientFind = await usecase.execute({clientId: client.id.value})
        expect(clientRepository.find).toBeCalled()
        expect(clientFind.clientId).toBe(client.id.value)
        expect(clientFind.name).toBe(client.name)
        expect(clientFind.email).toBe(client.email)
        expect(clientFind.address).toBe(`${client.address.street}, ${client.address.number} - ${client.address.state}`)
    })
})