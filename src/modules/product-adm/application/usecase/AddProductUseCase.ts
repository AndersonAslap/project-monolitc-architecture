import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { Product } from "../../domain/Product";
import { ProductGateway } from "../gateway/ProductGateway";

export class AddProductUseCase implements UseCase {
    
    constructor(readonly productRepository: ProductGateway){}

    async execute(input: Input): Promise<void> {
        const product = new Product(input)
        await this.productRepository.add(product)
    }
}

type Input = {
    name: string
    description: string
    purchasePrice: number
    stock: number
}