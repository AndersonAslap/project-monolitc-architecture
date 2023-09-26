import { Transaction } from "../../domain/Transaction";

export interface TransactionGateway {
    addPayment(input: Transaction): Promise<void>
}