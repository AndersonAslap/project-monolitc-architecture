import { AddProductUseCase } from "../../../../src/modules/product-adm/application/usecase/AddProductUseCase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add Product usecase unit test", () => {

    it("should add a product", async () => {
        const productRepository = MockRepository()
        const usecase = new AddProductUseCase(productRepository)
        const input = {
            name: 'Computador',
            description:'Mac Pro',
            purchasePrice: 10000,
            stock: 7
        }
        await usecase.execute(input)
        expect(productRepository.add).toHaveBeenCalled()
    })
})