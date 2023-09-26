import { ProductFacadeInterface } from "../../application/facade/ProductFacadeInterface";
import { ProductFacade } from "../facade/ProductFacade";
import { ProductRepositoryDatabase } from "../repository/sequelize/ProductRepositoryDatabase";
import { ProductUseCaseFactory } from "./ProductUseCaseFactory";

export class ProductFacadeFactory {

    static create() : ProductFacadeInterface {
        const productRepository = new ProductRepositoryDatabase()
        const productUseCaseFactoty = new ProductUseCaseFactory(productRepository)
        const facade = new ProductFacade(productUseCaseFactoty)
        return facade
    }
}