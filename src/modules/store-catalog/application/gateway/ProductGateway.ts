import { Product } from "../../domain/Product";

export interface ProductGateway {
    find(id: string): Promise<Product>
    findAll(): Promise<Product[]>
}