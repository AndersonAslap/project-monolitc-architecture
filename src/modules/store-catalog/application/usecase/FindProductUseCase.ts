import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ProductGateway } from "../gateway/ProductGateway";

export class FindProductUseCase implements UseCase {

    constructor(readonly productRepository: ProductGateway){}
    
    async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.find(input.productId)
        return {
            productId: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }
}

type Input  = {
    productId: string
}

type Output = {
    productId: string
    name: string
    description: string
    salesPrice: number
    createdAt: Date 
    updatedAt: Date 
}