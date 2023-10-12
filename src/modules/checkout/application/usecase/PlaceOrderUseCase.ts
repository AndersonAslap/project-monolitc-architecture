import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { Address } from "../../../@shared/domain/value-object/Address";
import { Id } from "../../../@shared/domain/value-object/Id";
import { FacadeFactory } from "../../../@shared/factory/FacadeFactory";
import { ClientFacadeInterface } from "../../../client-adm/application/facade/ClientFacadeInterface";
import { InvoiceFacadeInterface } from "../../../invoice/application/facade/InvoiceFacadeInterface";
import { TransactionFacadeInterface } from "../../../payment/application/facade/TransactionFacadeInterface";
import { ProductFacadeInterface } from "../../../product-adm/application/facade/ProductFacadeInterface";
import { ProductStoreCatalogFacadeInterface } from "../../../store-catalog/application/facade/ProductFacadeInterface";
import { Client } from "../../domain/Client";
import { Order } from "../../domain/Order";
import { Product } from "../../domain/Product";
import CheckoutGateway from "../gateway/CheckoutGateway";

export class PlaceOrderUseCase implements UseCase {

    private productFacade: ProductFacadeInterface
    private catalogFacade: ProductStoreCatalogFacadeInterface
    private clientFacade: ClientFacadeInterface
    private invoiceFacade: InvoiceFacadeInterface
    private paymentFacade: TransactionFacadeInterface

    constructor(facadeFactory: FacadeFactory) {
        this.productFacade = facadeFactory.createProductAdminFacade()
        this.catalogFacade = facadeFactory.createStoreCatalogFacade()
        this.clientFacade = facadeFactory.createClientAdminFacade()
        this.invoiceFacade = facadeFactory.createInvoiceFacade()
        this.paymentFacade = facadeFactory.createPaymentFacade()
    }
    
    async execute(input: Input): Promise<Output> {
        const clientData = await this.clientFacade.findClient({ clientId: input.clientId })
        
        if (!clientData) throw new Error('Client not found')
        
        await this.validateProducts(input)
        
        const products = await Promise.all(
            input.products.map((p) => this.getProduct({productId: p.productId}))
        )
    
        const client = new Client({
            id: new Id(clientData.clientId),
            name: clientData.name,
            email: clientData.email,
            document: clientData.document,
            address: new Address(clientData.address.street, clientData.address.number, clientData.address.complement, clientData.address.city, clientData.address.state, clientData.address.zipCode)
        })

        const order = new Order({client, products})

        const payment = await this.paymentFacade.addPayment({
            orderId: order.id.value,
            amount: order.total
        })

        const invoice = 
            payment.status === "approved" ?
                await this.invoiceFacade.generateInvoice({
                    name: client.name,
                    document: client.document,
                    items: products.map((p) => ({name: p.name, price: p.salesPrice})),
                    street: client.address.street,
                    city: client.address.city,
                    complement: client.address.complement,
                    number: 10,
                    state: client.address.state,
                    zipCode: client.address.zip
                }) : null
        
        payment.status === "approved" && order.approved()
        //await this.checkoutRepository.addOrder(order)

        return {
            orderId: order.id.value,
            invoiceId: payment.status === "approved" ? invoice?.invoiceId : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
                return {
                    productId: p.id.value
                }
            })
        }
    }

    public async validateProducts(input: Input): Promise<void> {
        await this.validateProductsSeleted(input)
        await this.validateProductsStock(input)
    }

    public async validateProductsSeleted(input: Input): Promise<void> {
        if (input.products.length === 0) throw new Error('No products selected')
    }

    public async validateProductsStock(input: Input): Promise<void> {
        for (const product_ of input.products) {
            const product = await this.productFacade.checkStock({productId: product_.productId})
            if (product.stock <= 0) throw new Error(`Product ${product.productId} is not available in stock`)
        }
    }

    public async getProduct({productId}: {productId: string}): Promise<Product> {
        const product = await this.catalogFacade.findProduct({productId})
        if (!product) throw new Error('Product not found')
        return new Product({
            id: new Id(product.productId),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
}

type Input = {
    clientId: string
    products: Array<{
        productId: string
    }>
}

type Output = {
    orderId: string
    invoiceId: string | null | undefined
    status: string
    total: number
    products: Array<{
        productId: string
    }>
}