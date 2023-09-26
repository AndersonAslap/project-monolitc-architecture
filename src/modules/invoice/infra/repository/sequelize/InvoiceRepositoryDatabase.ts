import { Address } from "../../../../@shared/domain/value-object/Address"
import { Id } from "../../../../@shared/domain/value-object/Id"
import { InvoiceGateway } from "../../../application/gateway/InvoiceGateway"
import { Invoice } from "../../../domain/Invoice"
import { InvoiceItems } from "../../../domain/InvoiceItems"
import { InvoiceItemModel } from "./InvoiceItemModel"
import { InvoiceModel } from "./InvoiceModel"

export class InvoiceRepositoryDatabase implements InvoiceGateway {
    
    async generate(invoice: Invoice): Promise<void> {
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
    }
    
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: {id}, include: [{ model: InvoiceItemModel }]  })
        if (!invoice) throw new Error('Invoice not found')
        return new Invoice({
            id: new Id(invoice?.id),
            name: invoice?.name,
            document: invoice?.document,
            items: invoice.items.map((item) => ( new InvoiceItems({id: new Id(item.id), name: item.name, price: item.price, createdAt: item.createdAt, updatedAt: item.updatedAt}))),
            address: new Address(invoice?.street, invoice?.number, invoice?.complement, invoice?.city, invoice?.state, invoice?.zip),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        })
    }
}