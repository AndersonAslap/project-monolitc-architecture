import { Sequelize } from "sequelize-typescript"
import { TransactionModel } from "../../../../src/modules/payment/infra/repository/sequelize/TransactionModel"
import { TransactionFacadeFactory } from "../../../../src/modules/payment/infra/factory/TransactionFacadeFactory"
import { Id } from "../../../../src/modules/@shared/domain/value-object/Id"

describe("ProductFacade test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memory',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should process a payment", async () => {
        const transactionFacade = TransactionFacadeFactory.create()
        const input = {
            orderId: new Id().value,
            amount: 100
        }
        const transaction = await transactionFacade.addPayment(input)
        expect(transaction.orderId).toBe(input.orderId)
    })
})