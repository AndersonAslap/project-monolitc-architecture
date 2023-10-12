import { FindAllProductsFacadeOutput, FindProductFacadeInput, FindProductFacadeOutput, ProductStoreCatalogFacadeInterface } from "../../application/facade/ProductFacadeInterface";
import { ProductUseCaseFactory } from "../factory/ProductUseCaseFactory";

export class ProductFacade implements ProductStoreCatalogFacadeInterface {
    
    constructor(readonly productUsecaseFactory: ProductUseCaseFactory){}

    async findProduct(input: FindProductFacadeInput): Promise<FindProductFacadeOutput> {
        return await this.productUsecaseFactory.createFindProductUseCase().execute(input)
    }
    
    async findAllProducts(): Promise<FindAllProductsFacadeOutput> {
        return await this.productUsecaseFactory.createFindAllProductsUseCase().execute()
    }
}