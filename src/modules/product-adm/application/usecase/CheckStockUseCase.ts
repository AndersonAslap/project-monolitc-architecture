import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ProductGateway } from "../gateway/ProductGateway";

export class CheckStockUseCase implements UseCase {
    
    constructor(readonly productRepository: ProductGateway){}

    async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.find(input.productId)
        const output = {
            productId: product.id.value,
            stock: product.stock
        }
        return output
    }
}

type Input = {
    productId: string
}

type Output = {
    productId: string,
    stock: number
}