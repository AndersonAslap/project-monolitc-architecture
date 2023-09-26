import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ProductGateway } from "../gateway/ProductGateway";

export class FindAllProductsUseCase implements UseCase {

    constructor(readonly productRepository: ProductGateway) {}
    
    async execute(input?: any): Promise<Output> {
        const products = await this.productRepository.findAll()
        const output = products.map((product) => {
            return {
                productId: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }
        })
        return output
    }
}

type Output = Array<{
    productId: string
    name: string
    description: string
    salesPrice: number
    createdAt: Date 
    updatedAt: Date 
}>