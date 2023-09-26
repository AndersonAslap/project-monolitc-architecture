import { Invoice } from "../../domain/Invoice";

export interface InvoiceGateway {
    generate(input: Invoice): Promise<void>
    find(invoiceId: string): Promise<Invoice>
}