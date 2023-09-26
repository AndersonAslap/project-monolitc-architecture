import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../../src/modules/product-adm/infra/repository/sequelize/ProductModel"
import { Product } from "../../../../src/modules/product-adm/domain/Product"
import { ProductRepositoryDatabase } from "../../../../src/modules/product-adm/infra/repository/sequelize/ProductRepositoryDatabase"

describe("ProductRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryProductRepository',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepositoryDatabase()
        const product = new Product({
            name: 'computador',
            description: 'Mac PRO',
            purchasePrice: 10000,
            stock: 7
        })
        await productRepository.add(product)
        const findProduct = await ProductModel.findOne({ where: {id: product.id.value} })
        expect(findProduct).toBeDefined()
        expect(findProduct?.id).toEqual(product.id.value)
        expect(findProduct?.name).toEqual(product.name)
        expect(findProduct?.description).toEqual(product.description)
        expect(findProduct?.purchasePrice).toEqual(product.purchasePrice)
        expect(findProduct?.stock).toEqual(product.stock)
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepositoryDatabase()
        const product = new Product({
            name: 'computador',
            description: 'Mac PRO',
            purchasePrice: 10000,
            stock: 7
        })
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
        const findProduct = await productRepository.find(product.id.value)
        expect(findProduct).toBeDefined()
        expect(findProduct?.id.value).toEqual(product.id.value)
        expect(findProduct?.name).toEqual(product.name)
        expect(findProduct?.description).toEqual(product.description)
        expect(findProduct?.purchasePrice).toEqual(product.purchasePrice)
        expect(findProduct?.stock).toEqual(product.stock)
    })
})