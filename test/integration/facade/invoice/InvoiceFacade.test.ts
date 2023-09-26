import { Sequelize } from "sequelize-typescript"
import { InvoiceItemModel } from "../../../../src/modules/invoice/infra/repository/sequelize/InvoiceItemModel"
import { InvoiceModel } from "../../../../src/modules/invoice/infra/repository/sequelize/InvoiceModel"
import { InvoiceFacadeFactory } from "../../../../src/modules/invoice/infra/factory/InvoiceFacadeFactory"
import { Invoice } from "../../../../src/modules/invoice/domain/Invoice"
import { InvoiceItems } from "../../../../src/modules/invoice/domain/InvoiceItems"
import { Address } from "../../../../src/modules/@shared/domain/value-object/Address"

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryInvoiceFacade',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should generate a find", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create()
        const spy = jest.spyOn(invoiceFacade, 'generateInvoice')
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
        await invoiceFacade.generateInvoice(input)
        expect(spy).toBeCalled()
        expect(spy).toHaveBeenCalledWith(input)
    })

    it("should find a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create()
        const invoice = new Invoice({
            name: 'Anderson',
            document: '12456242136',
            address: new Address('rua quarenta', 200, 'complement', 'city', 'pernambuco', '555555-555'),
            items: [
                new InvoiceItems({name: 'product 1', price: 100}), 
                new InvoiceItems({name: 'product 2', price: 200})
            ]
        })
        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zip: invoice.address.zip,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map((item) => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }))
        },{
            include: [{ model: InvoiceItemModel }]
        })
        const invoiceFind = await invoiceFacade.findInvoice({invoiceId: invoice.id.value})
        expect(invoiceFind.invoiceId).toBe(invoice.id.value)
    })
})