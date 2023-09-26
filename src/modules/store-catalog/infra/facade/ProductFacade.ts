import { FindAllProductsFacadeOutput, FindProductFacadeInput, FindProductFacadeOutput, ProductFacadeInterface } from "../../application/facade/ProductFacadeInterface";
import { ProductUseCaseFactory } from "../factory/ProductUseCaseFactory";

export class ProductFacade implements ProductFacadeInterface {
    
    constructor(readonly productUsecaseFactory: ProductUseCaseFactory){}

    async findProduct(input: FindProductFacadeInput): Promise<FindProductFacadeOutput> {
        return await this.productUsecaseFactory.createFindProductUseCase().execute(input)
    }
    
    async findAllProducts(): Promise<FindAllProductsFacadeOutput> {
        return await this.productUsecaseFactory.createFindAllProductsUseCase().execute()
    }
}