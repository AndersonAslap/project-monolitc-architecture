import { Address } from "../../../../src/modules/@shared/domain/value-object/Address"
import { FindInvoiceUseCase } from "../../../../src/modules/invoice/application/usecase/FindInvoiceUseCase"
import { Invoice } from "../../../../src/modules/invoice/domain/Invoice"
import { InvoiceItems } from "../../../../src/modules/invoice/domain/InvoiceItems"

const invoice = new Invoice({
    name: 'Anderson',
    document: '12456242136',
    address: new Address('rua quarenta', 200, 'complement', 'city', 'pernambuco', '555555-555'),
    items: [
        new InvoiceItems({name: 'product 1', price: 100}), 
        new InvoiceItems({name: 'product 2', price: 200})
    ]
})

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }    
}

describe("FindInvoiceUseCase tests", () => {

    let invoiceRepository = MockRepository()

    it("should find a invoice", async () => {
        const usecase = new FindInvoiceUseCase(invoiceRepository)
        const input = {
            invoiceId: invoice.id.value
        }
        const invoiceFind = await usecase.execute(input)
        expect(invoiceRepository.find).toHaveBeenCalled()
        expect(invoiceFind.invoiceId).toBe(invoice.id.value)
    })
})