import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { ProductGateway } from "../../application/gateway/ProductGateway";
import { AddProductUseCase } from "../../application/usecase/AddProductUseCase";
import { CheckStockUseCase } from "../../application/usecase/CheckStockUseCase";

export class ProductUseCaseFactory {

    constructor(readonly productRepository: ProductGateway) {}

    createAddProductUseCase(): UseCase {
        return new AddProductUseCase(this.productRepository)
    }

    createCheckStockUseCase(): UseCase {
        return new CheckStockUseCase(this.productRepository)
    }
}