import { Id } from "../../../../@shared/domain/value-object/Id"
import { ProductGateway } from "../../../application/gateway/ProductGateway"
import { Product } from "../../../domain/Product"
import { ProductModel } from "./ProductModel"

export class ProductRepositoryDatabase implements ProductGateway {
    
    async find(id: string): Promise<Product> {
        const productData = await ProductModel.findOne({ where: {id}} )
        if (!productData) throw new Error('Product not found')
        return new Product({
            id: new Id(productData.id),
            name: productData.name,
            description: productData.description,
            salesPrice: productData.salesPrice,
            createdAt: productData.createdAt,
            updatedAt: productData.updatedAt
        })
    }

    async findAll(): Promise<Product[]> {
        const productData = await ProductModel.findAll()
        return productData.map((product) => {
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            })
        })  
    }

}