import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../../../../src/modules/invoice/infra/repository/sequelize/InvoiceModel"
import { InvoiceItemModel } from "../../../../src/modules/invoice/infra/repository/sequelize/InvoiceItemModel"
import { InvoiceRepositoryDatabase } from "../../../../src/modules/invoice/infra/repository/sequelize/InvoiceRepositoryDatabase"
import { Invoice } from "../../../../src/modules/invoice/domain/Invoice"
import { Address } from "../../../../src/modules/@shared/domain/value-object/Address"
import { InvoiceItems } from "../../../../src/modules/invoice/domain/InvoiceItems"

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryInvoiceRepository',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should generate a invoice", async () => {
        const invoiceRepository = new InvoiceRepositoryDatabase()
        const spy = jest.spyOn(invoiceRepository, 'generate')
        const invoice = new Invoice({
            name: 'Anderson',
            document: '12456242136',
            address: new Address('rua quarenta', 200, 'complement', 'city', 'pernambuco', '555555-555'),
            items: [
                new InvoiceItems({name: 'product 1', price: 100}), 
                new InvoiceItems({name: 'product 2', price: 200})
            ]
        })
        await invoiceRepository.generate(invoice)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(invoice)
    })

    it("should find a invoice", async () => {
        const invoiceRepository = new InvoiceRepositoryDatabase()
        const spy = jest.spyOn(invoiceRepository, 'find')
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
        const invoiceFind = await invoiceRepository.find(invoice.id.value)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(invoice.id.value)
        expect(invoiceFind.id.value).toBe(invoice.id.value)
    })
})