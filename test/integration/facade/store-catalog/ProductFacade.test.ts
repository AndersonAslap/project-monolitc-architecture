import { Sequelize } from "sequelize-typescript"
import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"
import { ProductModel } from "../../../../src/modules/store-catalog/infra/repository/sequelize/ProductModel"
import { ProductFacadeFactory } from "../../../../src/modules/store-catalog/infra/factory/ProductFacadeFactory"
import { Product } from "../../../../src/modules/store-catalog/domain/Product"

describe("ProductFacade test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryProductFacade',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a product", async () => {
        const productFacade = ProductFacadeFactory.create()
        const product = new Product({
            id: new Id(),
            name: 'computador',
            description: 'Mac PRO',
            salesPrice: 10000,
        })
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
        const productFind = await productFacade.findProduct({productId: product.id.value})
        expect(productFind?.productId).toBe(product.id.value)
        expect(productFind?.name).toBe(product.name)
    })

    it("should find all products", async () => {
        const productFacade = ProductFacadeFactory.create()
        const product = new Product({
            id: new Id(),
            name: 'computador',
            description: 'Mac PRO',
            salesPrice: 10000,
        })
        const product2 = new Product({
            id: new Id(),
            name: 'celular',
            description: 'Galaxy s5',
            salesPrice: 10000,
        })
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
        await ProductModel.create({
            id: product2.id.value,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice,
            createdAt: product2.createdAt,
            updatedAt: product2.updatedAt
        })
        const productsFind = await productFacade.findAllProducts()
        expect(productsFind.length).toBe(2)
        expect(productsFind[0].productId).toBe(product.id.value) 
        expect(productsFind[1].productId).toBe(product2.id.value) 
    })
})