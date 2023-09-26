import { Sequelize } from "sequelize-typescript"
import { TransactionModel } from "../../../../src/modules/payment/infra/repository/sequelize/TransactionModel"
import { TransactionRepositoryDatabase } from "../../../../src/modules/payment/infra/repository/sequelize/TransactionRepositoryDatabase"
import { Transaction } from "../../../../src/modules/payment/domain/Transaction"
import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"

describe("ClientRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryTransactionRepository',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should add a payment", async () => {
        const transactionRepository = new TransactionRepositoryDatabase()
        const spy = jest.spyOn(transactionRepository, 'addPayment')
        const transaction = new Transaction({
            orderId: new Id().value,
            amount: 100
        })
        transaction.process()
        await transactionRepository.addPayment(transaction)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(transaction)
    })
})