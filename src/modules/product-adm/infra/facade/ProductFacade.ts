import { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO, ProductFacadeInterface } from "../../application/facade/ProductFacadeInterface";
import { ProductUseCaseFactory } from "../factory/ProductUseCaseFactory";

export class ProductFacade implements ProductFacadeInterface {

    constructor(readonly usecaseFactory: ProductUseCaseFactory){}

    async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        return await this.usecaseFactory.createAddProductUseCase().execute(input)
    }

    async checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return await this.usecaseFactory.createCheckStockUseCase().execute(input)
    }
}