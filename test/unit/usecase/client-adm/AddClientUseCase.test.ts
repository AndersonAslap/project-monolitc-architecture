import { AddClientUseCase } from "../../../../src/modules/client-adm/application/usecase/AddClientUseCase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("AddClientUseCase tests", () => {

    let clientRepository = MockRepository()

    it("should add client", async () => {
        const usecase = new AddClientUseCase(clientRepository)
        const input = {
            name: 'Anderson',
            email: 'aslap@gmail.com',
            address: {
                street: 'rua quarenta',
                number: 285,
                complement: '',
                city: '',
                state: 'Pernambuco',
                zip: '55555-555'
            }
        }
        await usecase.execute(input)
        expect(clientRepository.add).toBeCalled()
    })

})