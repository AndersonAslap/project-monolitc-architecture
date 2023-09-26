import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../../src/modules/store-catalog/infra/repository/sequelize/ProductModel"
import { ProductRepositoryDatabase } from "../../../../src/modules/store-catalog/infra/repository/sequelize/ProductRepositoryDatabase"
import { Product } from "../../../../src/modules/store-catalog/domain/Product"
import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"

describe("ProductRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryProductRepositoryStore',
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
        const productRepository = new ProductRepositoryDatabase()
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
        const findProduct = await productRepository.find(product.id.value)
        expect(findProduct).toBeDefined()
        expect(findProduct?.id.value).toEqual(product.id.value)
        expect(findProduct?.name).toEqual(product.name)
        expect(findProduct?.description).toEqual(product.description)
        expect(findProduct?.salesPrice).toEqual(product.salesPrice)
    })

    it("should find all product", async () => {
        const productRepository = new ProductRepositoryDatabase()
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
        const findAllProduct = await productRepository.findAll()
        expect(findAllProduct.length).toBe(2)
        expect(findAllProduct[0].id.value).toBe(product.id.value)
        expect(findAllProduct[1].id.value).toBe(product2.id.value)
    })
})