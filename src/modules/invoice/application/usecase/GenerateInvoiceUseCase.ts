import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { Address } from "../../../@shared/domain/value-object/Address";
import { Invoice } from "../../domain/Invoice";
import { InvoiceItems } from "../../domain/InvoiceItems";
import { InvoiceGateway } from "../gateway/InvoiceGateway";

export class GenerateInvoiceUseCase implements UseCase {
    
    constructor(readonly invoiceRepository: InvoiceGateway){}

    async execute(input: Input): Promise<Output> {
        const address = new Address(input.street, input.number, input.complement, input.city, input.state, input.zipCode)
        const items = input.items.map((item) => (new InvoiceItems({name: item.name, price: item.price})))
        const invoice = new Invoice({name: input.name, document: input.document, address, items})
        await this.invoiceRepository.generate(invoice)
        return {
            invoiceId: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: '',
            city: '',
            state: invoice.address.state,
            zipCode: invoice.address.zip,
            items: invoice.items.map((item) => ({id: item.id.value, name: item.name, price: item.price})),
            total: invoice.total()
        }
    }
}

type Input = {
    name: string
    document: string
    street: string
    number: number
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
      name: string
      price: number
    }[]
}
  
type Output = {
    invoiceId: string
    name: string
    document: string
    street: string
    number: number
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
      id: string
      name: string
      price: number
    }[]
    total: number
}