import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { InvoiceGateway } from "../gateway/InvoiceGateway";

export class FindInvoiceUseCase implements UseCase {
    
    constructor(readonly invoiceRepository: InvoiceGateway){}

    async execute(input: Input): Promise<Output> {
        const invoice = await this.invoiceRepository.find(input.invoiceId)
        return {
            invoiceId: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: '',
                city: '',
                state: invoice.address.state,
                zipCode: invoice.address.zip
            },
            items: invoice.items.map((item) => ({id: item.id.value, name: item.name, price: item.price})),
            total: invoice.total(),
            createdAt: invoice.createdAt
        }
    }
}

type Input = {
    invoiceId: string
}
  
type Output = {
    invoiceId: string
    name: string
    document: string
    address: {
      street: string
      number: number
      complement: string
      city: string
      state: string
      zipCode: string
    }
    items: {
      id: string
      name: string
      price: number
    }[]
    total: number
    createdAt: Date
}