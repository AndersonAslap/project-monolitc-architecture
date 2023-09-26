import { TransactionGateway } from "../../../application/gateway/TransactionGateway";
import { Transaction } from "../../../domain/Transaction";
import { TransactionModel } from "./TransactionModel";

export class TransactionRepositoryDatabase implements TransactionGateway {
    
    async addPayment(transaction: Transaction): Promise<void> {
        await TransactionModel.create({
            id: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        })
    }
}