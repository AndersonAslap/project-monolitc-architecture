import { TransactionFacadeInterface } from "../../application/facade/TransactionFacadeInterface";
import { TransactionFacade } from "../facade/TransactionFacade";
import { TransactionRepositoryDatabase } from "../repository/sequelize/TransactionRepositoryDatabase";
import { TransactionUseCaseFactory } from "./TransactionUseCaseFactory";

export class TransactionFacadeFactory {

    static create(): TransactionFacadeInterface {
        const transactionRepository = new TransactionRepositoryDatabase()
        const transactionUseCaseFactory = new TransactionUseCaseFactory(transactionRepository)
        const facade = new TransactionFacade(transactionUseCaseFactory)
        return facade
    }
}