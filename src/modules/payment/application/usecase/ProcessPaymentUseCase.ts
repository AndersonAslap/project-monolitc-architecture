import { UseCase } from "../../../@shared/application/usecase/UseCase";
import { Transaction } from "../../domain/Transaction";
import { TransactionGateway } from "../gateway/TransactionGateway";

export class ProcessPaymentUseCase implements UseCase {

    constructor(readonly transactionRepository: TransactionGateway){}
    
    async execute(input: Input): Promise<Output> {
        const transaction = new Transaction({amount: input.amount, orderId: input.orderId})
        transaction.process()
        await this.transactionRepository.addPayment(transaction)
        return {
            transactionId: transaction.id.value,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        }
    }
}

type Input = {
    orderId: string
    amount: number
}

type Output = {
    transactionId: string
    orderId: string
    amount: number
    status: string
    createdAt: Date 
    updatedAt: Date
}