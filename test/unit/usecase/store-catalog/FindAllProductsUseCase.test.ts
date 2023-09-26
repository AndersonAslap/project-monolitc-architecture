import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"
import { FindAllProductsUseCase } from "../../../../src/modules/store-catalog/application/usecase/FindAllProductsUseCase"
import { Product } from "../../../../src/modules/store-catalog/domain/Product"

const products = [
    new Product({id: new Id(), name:'Galaxy s3' ,description: 'Celular', salesPrice: 1000}),
    new Product({id: new Id(), name:'Galaxy s5' ,description: 'Celular', salesPrice: 1000})
]

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products))
    }
}

describe("FindAllProductsUseCase", () => {

    let productRepository = MockRepository()

    it("should get all products", async () => {
        const usecase = new FindAllProductsUseCase(productRepository)
        const output = await usecase.execute()
        expect(productRepository.findAll).toBeCalled()
        expect(output.length).toBe(2)
        expect(output[0].productId).toBe(products[0].id.value)
        expect(output[1].productId).toBe(products[1].id.value)
    })
})