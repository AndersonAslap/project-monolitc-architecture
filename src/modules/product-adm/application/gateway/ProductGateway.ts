import { Product } from "../../domain/Product";

export interface ProductGateway {
    add(product: Product): Promise<void>
    find(id: string): Promise<Product>
}