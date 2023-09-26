import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"
import { FindProductUseCase } from "../../../../src/modules/store-catalog/application/usecase/FindProductUseCase"
import { Product } from "../../../../src/modules/store-catalog/domain/Product"

const product = new Product({id: new Id(), name:'Galaxy s3' ,description: 'Celular', salesPrice: 1000})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("FindProductUseCase test", () => {

    let productRepository = MockRepository()

    it("should find a product", async () => {
        const usecase = new FindProductUseCase(productRepository)
        const output = await usecase.execute({productId: product.id.value})
        expect(productRepository.find).toBeCalled()
        expect(output.productId).toEqual(product.id.value)
    })
})