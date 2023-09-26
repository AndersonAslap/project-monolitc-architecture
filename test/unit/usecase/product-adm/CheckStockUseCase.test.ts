import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"
import { CheckStockUseCase } from "../../../../src/modules/product-adm/application/usecase/CheckStockUseCase"
import { Product } from "../../../../src/modules/product-adm/domain/Product"

const product = new Product({
    id: new Id(),
    name: 'Computador',
    description:'Mac Pro',
    purchasePrice: 10000,
    stock: 7
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("Check Stock Product usecase unit test", () => {

    it("should check stock of product", async () => {
        const productRepository = MockRepository()
        const checkStockUseCase = new CheckStockUseCase(productRepository)
        const productCheckStock = await checkStockUseCase.execute({productId: product.id.value})
        expect(productRepository.find).toHaveBeenCalled()
        expect(productCheckStock?.productId).toEqual(product.id.value)
        expect(productCheckStock?.stock).toEqual(7) 
    })
})