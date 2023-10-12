export type AddProductFacadeInputDTO = {
    name: string
    description: string
    purchasePrice: number
    salesPrice: number
    stock: number
}

export type CheckStockFacadeInputDTO = {
    productId: string
}

export type CheckStockFacadeOutputDTO = {
    productId: string,
    stock: number
}

export interface ProductFacadeInterface {
    addProduct(input: AddProductFacadeInputDTO): Promise<void>
    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO>
}