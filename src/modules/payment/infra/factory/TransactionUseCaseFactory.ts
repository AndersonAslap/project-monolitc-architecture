import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { TransactionGateway } from "../../application/gateway/TransactionGateway";
import { ProcessPaymentUseCase } from "../../application/usecase/ProcessPaymentUseCase";

export class TransactionUseCaseFactory {

    constructor(readonly transactionRepository: TransactionGateway) {}

    createProcessPaymentUseCase(): UseCase {
        return new ProcessPaymentUseCase(this.transactionRepository)
    }
}