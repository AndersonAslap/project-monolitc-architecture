export type GenerateInvoiceFacadeInput = {
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

export type GenerateInvoiceFacadeOutput = {
    id: string
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

export type FindInvoiceFacadeInput = {
    invoiceId: string
}

export type FindInvoiceFacadeOutput = {
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

export interface InvoiceFacadeInterface {
    generateInvoice(input: GenerateInvoiceFacadeInput): Promise<GenerateInvoiceFacadeOutput>
    findInvoice(input: FindInvoiceFacadeInput): Promise<FindInvoiceFacadeOutput>
}