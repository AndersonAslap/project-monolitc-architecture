import { Id } from "../../../../@shared/domain/value-object/Id";
import { ProductGateway } from "../../../application/gateway/ProductGateway";
import { Product } from "../../../domain/Product";
import { ProductModel } from "./ProductModel";

export class ProductRepositoryDatabase implements ProductGateway {
    
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
    }
    
    async find(id: string): Promise<Product> {
        const productData = await ProductModel.findOne({ where: {id}} )
        if (!productData) throw new Error('Product not found')
        return new Product({
            id: new Id(productData.id),
            name: productData.name,
            description: productData.description,
            purchasePrice: productData.purchasePrice,
            stock: productData.stock,
            createdAt: productData.createdAt,
            updatedAt: productData.updatedAt
        })
    }

}