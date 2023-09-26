import { AddPaymentFacadeInput, AddPaymentFacadeOutput, TransactionFacadeInterface } from "../../application/facade/TransactionFacadeInterface";
import { TransactionUseCaseFactory } from "../factory/TransactionUseCaseFactory";

export class TransactionFacade implements TransactionFacadeInterface {
    
    constructor(readonly transactionUseCaseFactory: TransactionUseCaseFactory) {}

    async addPayment(input: AddPaymentFacadeInput): Promise<AddPaymentFacadeOutput> {
        return await this.transactionUseCaseFactory.createProcessPaymentUseCase().execute(input)
    }
}