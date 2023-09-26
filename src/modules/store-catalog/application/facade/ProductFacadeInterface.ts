export type FindProductFacadeInput = {
    productId: string
}

export type FindProductFacadeOutput = {
    productId: string
    name: string
    description: string
    salesPrice: number
    createdAt: Date 
    updatedAt: Date 
}

export type FindAllProductsFacadeOutput = Array<{
    productId: string
    name: string
    description: string
    salesPrice: number
    createdAt: Date 
    updatedAt: Date 
}>

export interface ProductFacadeInterface {
    findProduct(input: FindProductFacadeInput): Promise<FindProductFacadeOutput>
    findAllProducts(): Promise<FindAllProductsFacadeOutput>
}