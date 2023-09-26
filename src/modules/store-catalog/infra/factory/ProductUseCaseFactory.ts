import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ProductGateway } from "../../application/gateway/ProductGateway";
import { FindAllProductsUseCase } from "../../application/usecase/FindAllProductsUseCase";
import { FindProductUseCase } from "../../application/usecase/FindProductUseCase";

export class ProductUseCaseFactory {

    constructor(readonly productRepository: ProductGateway){}

    createFindProductUseCase(): UseCase {
        return new FindProductUseCase(this.productRepository)
    }

    createFindAllProductsUseCase(): UseCase {
        return new FindAllProductsUseCase(this.productRepository)
    }
}