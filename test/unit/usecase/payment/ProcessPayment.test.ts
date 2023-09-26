import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"
import { ProcessPaymentUseCase } from "../../../../src/modules/payment/application/usecase/ProcessPaymentUseCase"

const MockRepository = () => {
    return {
        addPayment: jest.fn()
    }    
}

describe("ProcessPaymentUseCase tests", () => {

    let transactionRepository = MockRepository()

    it("should process payment with declined", async () => {
        const usecase = new ProcessPaymentUseCase(transactionRepository)
        const input = {
            amount: 99,
            orderId: new Id().value
        }
        const transaction = await usecase.execute(input)
        expect(transactionRepository.addPayment).toHaveBeenCalled()
        expect(transaction.status).toBe('declined')
    })

    it("should process payment with approved", async () => {
        const usecase = new ProcessPaymentUseCase(transactionRepository)
        const input = {
            amount: 100,
            orderId: new Id().value
        }
        const transaction = await usecase.execute(input)
        expect(transactionRepository.addPayment).toHaveBeenCalled()
        expect(transaction.status).toBe('approved')
    })
})