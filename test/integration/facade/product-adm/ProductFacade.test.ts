import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../../src/modules/product-adm/infra/repository/sequelize/ProductModel"
import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"
import { ProductFacadeFactory } from "../../../../src/modules/product-adm/infra/factory/ProductFacadeFactory"

describe("ProductFacade test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memory',
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
        const productFacade = ProductFacadeFactory.create()
        const input = {
            id: new Id(),
            name: 'Celular',
            description: 'Iphone 15',
            purchasePrice: 5000,
            stock:7
        }
        await productFacade.addProduct(input)
        const productFind = await ProductModel.findOne({where: {id: input.id.value}})
        expect(productFind?.id).toBe(input.id.value)
        expect(productFind?.name).toBe(input.name)
        expect(productFind?.stock).toBe(input.stock)
    })

    it("should check stock of product", async () => {
        const productFacade = ProductFacadeFactory.create()
        const input = {
            id: new Id(),
            name: 'Celular',
            description: 'Iphone 15',
            purchasePrice: 5000,
            stock:7
        }
        await productFacade.addProduct(input)
        const productCheckStock = await productFacade.checkStock({productId: input.id.value})
        expect(productCheckStock?.productId).toEqual(input.id.value)
        expect(productCheckStock?.stock).toEqual(7)
    })
})