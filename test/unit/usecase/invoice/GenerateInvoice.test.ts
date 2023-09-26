import { GenerateInvoiceUseCase } from "../../../../src/modules/invoice/application/usecase/GenerateInvoiceUseCase"

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }    
}

describe("GenerateInvoiceUseCase tests", () => {

    let invoiceRepository = MockRepository()

    it("should generate a invoice", async () => {
        const usecase = new GenerateInvoiceUseCase(invoiceRepository)
        const input = {
            name: 'Anderson',
            document: '123456789',
            street: 'rua quarenta e quatro',
            number: 100,
            complement: 'complement',
            city: 'city',
            state: 'Pernambuco',
            zipCode: '55555-555',
            items: [{name: 'product 1', price: 10}, {name: 'product 2', price: 10}]
        }
        const invoiceFind = await usecase.execute(input)
        expect(invoiceRepository.generate).toHaveBeenCalled()
        expect(invoiceFind.invoiceId).toBeDefined()
    })
})