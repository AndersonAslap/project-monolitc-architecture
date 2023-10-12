import { randomUUID } from "crypto"
import { PlaceOrderUseCase } from "../../../../src/modules/checkout/application/usecase/PlaceOrderUseCase"
import { Product } from "../../../../src/modules/checkout/domain/Product";
import { Id } from "../../../../src/modules/@shared/domain/value-object/Id";

const mockDate = new Date(2000,1,1);

describe("PlaceOrderUseCase unit test", () => {

    describe("validateProducts method", () => {
        it("should throw error if no products are seleted", async () => {
            const mockCheckoutRepository =  {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }
            const mockFacadeFactory = {
                createInvoiceFacade: jest.fn(),
                createClientAdminFacade: jest.fn().mockReturnValue({
                    findClient: jest.fn().mockResolvedValue(true)
                }),
                createPaymentFacade: jest.fn(),
                createProductAdminFacade: jest.fn(),
                createStoreCatalogFacade: jest.fn(),
            }
            const plaeOrderUseCase = new PlaceOrderUseCase(mockCheckoutRepository, mockFacadeFactory)
            const input = {
                clientId: randomUUID(),
                products: []
            }
            const spy = jest.spyOn(plaeOrderUseCase, 'validateProducts').mockRejectedValue(new Error('No products selected'))
            await expect(plaeOrderUseCase.execute(input)).rejects.toThrowError('No products selected')
            expect(spy).toHaveBeenCalledTimes(1)
        })  

        it("should throw an error when product is out of stock", async () => {
            const mockCheckoutRepository =  {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }
            const mockFacadeFactory = {
                createInvoiceFacade: jest.fn(),
                createClientAdminFacade: jest.fn().mockReturnValue({
                    findClient: jest.fn().mockResolvedValue(true)
                }),
                createPaymentFacade: jest.fn(),
                createProductAdminFacade: jest.fn().mockReturnValue({
                    checkStock: jest.fn(({productId}: {productId: string}) => (
                        Promise.resolve({
                            productId,
                            stock: productId === "1" ? 0 : 1 
                        })
                    ))
                }),
                createStoreCatalogFacade: jest.fn(),
            }
            const plaeOrderUseCase = new PlaceOrderUseCase(mockCheckoutRepository, mockFacadeFactory)
            let input = {
                clientId: randomUUID(),
                products: [{productId: "1"}]
            }
            await expect(plaeOrderUseCase.execute(input)).rejects.toThrowError('Product 1 is not available in stock')
            input = {
                clientId: randomUUID(),
                products: [{productId: "0"}, {productId: "1"}]
            }
            await expect(plaeOrderUseCase.execute(input)).rejects.toThrowError('Product 1 is not available in stock')
            expect(mockFacadeFactory.createProductAdminFacade().checkStock).toHaveBeenCalledTimes(3)
        })
    })

    describe("getProducts method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern" as any)
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        it("should throw error when product not found", async () => {
            const mockCheckoutRepository =  {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }
            const mockFacadeFactory = {
                createInvoiceFacade: jest.fn(),
                createClientAdminFacade: jest.fn(),
                createPaymentFacade: jest.fn(),
                createProductAdminFacade: jest.fn(),
                createStoreCatalogFacade: jest.fn().mockReturnValue({
                    findAllProducts: jest.fn().mockResolvedValue(null),
                    findProduct: jest.fn().mockReturnValue(null)
                }),
            }
            const placeOrderUseCase = new PlaceOrderUseCase(mockCheckoutRepository,mockFacadeFactory)
            await expect(placeOrderUseCase.getProduct({productId: '0'})).rejects.toThrowError('Product not found')
        })

        it("should return a product", async () => {
            const mockCheckoutRepository =  {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }
            const mockFacadeFactory = {
                createInvoiceFacade: jest.fn(),
                createClientAdminFacade: jest.fn(),
                createPaymentFacade: jest.fn(),
                createProductAdminFacade: jest.fn(),
                createStoreCatalogFacade: jest.fn().mockReturnValue({
                    findAllProducts: jest.fn().mockResolvedValue(null),
                    findProduct: jest.fn().mockReturnValue({
                        productId: "1",
                        name: 'product 1',
                        description: 'product 1 description',
                        salesPrice: 10
                    })
                }),
            }
            const placeOrderUseCase = new PlaceOrderUseCase(mockCheckoutRepository,mockFacadeFactory)
            await expect(placeOrderUseCase.getProduct({productId: '0'})).resolves.toEqual(
                new Product({
                    id: new Id('1'),
                    name: 'product 1',
                    description: 'product 1 description',
                    salesPrice: 10
                })
            )
        })
    })

    describe("execute method", () => {
        it("should throw an error when client not found", async () => {
            const mockCheckoutRepository =  {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }
            const mockFacadeFactory = {
                createInvoiceFacade: jest.fn(),
                createClientAdminFacade: jest.fn().mockReturnValue({
                    findClient: jest.fn().mockResolvedValue(null)
                }),
                createPaymentFacade: jest.fn(),
                createProductAdminFacade: jest.fn(),
                createStoreCatalogFacade: jest.fn(),
            }
            const plaeOrderUseCase = new PlaceOrderUseCase(mockCheckoutRepository,mockFacadeFactory)
            const input = {
                clientId: randomUUID(),
                products: []
            }
            await expect(plaeOrderUseCase.execute(input)).rejects.toThrowError('Client not found')
        })

        describe("place an order", () => {
            const clientProps = {
                clientId: new Id("1"),
                name: "Anderson",
                email: "aslap@gmail.com",
                address: "rua quarenta e oito"
            }
            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "product 1",
                    description: 'anyway',
                    salesPrice: 30
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "product 2",
                    description: 'anyway',
                    salesPrice: 30
                }),
                "3": new Product({
                    id: new Id("3"),
                    name: "product 3",
                    description: 'anyway',
                    salesPrice: 70
                })
            }
            const mockFacadeFactory = {
                createInvoiceFacade: jest.fn().mockReturnValue({
                    generateInvoice: jest.fn().mockReturnValue({id: "1"})
                }),
                createClientAdminFacade: jest.fn().mockReturnValue({
                    findClient: jest.fn().mockReturnValue(clientProps)
                }),
                createPaymentFacade: jest.fn().mockReturnValue({
                    addPayment: jest.fn().mockReturnValue({ status: 'approved' })
                }),
                createProductAdminFacade: jest.fn(),
                createStoreCatalogFacade: jest.fn().mockReturnValue({
                    findProduct: jest.fn().mockImplementation(({productId} : {productId: keyof typeof products}) => {
                        return products[productId]
                    })
                }),
            }
            const mockCheckoutRepository =  {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }
            const placeOrderUseCase = new PlaceOrderUseCase(mockCheckoutRepository, mockFacadeFactory)
            
            jest.spyOn(placeOrderUseCase, 'validateProducts').mockResolvedValue()

            it("should not be approved", async () => {
                mockFacadeFactory.createPaymentFacade().addPayment = jest.fn().mockReturnValue(false)
                const input = {
                    clientId: "1",
                    products: [{productId: "1"}, {productId: "2"}]
                }
                const output = await placeOrderUseCase.execute(input)
                expect(output.invoiceId).toBeNull()
                expect(output.total).toBe(60)
            })

            it("should be approved", async () => {
                mockFacadeFactory.createPaymentFacade().addPayment = jest.fn().mockReturnValue({status: 'approved'})
                const input = {
                    clientId: "1",
                    products: [{productId: "1"}, {productId: "2"}, {productId: "3"}]
                }
                const output = await placeOrderUseCase.execute(input)
                expect(output.invoiceId).toBe("1")
                expect(output.total).toBe(130)
            })
        })
    })
})