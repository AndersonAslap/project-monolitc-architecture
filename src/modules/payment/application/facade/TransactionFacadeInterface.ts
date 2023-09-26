export type AddPaymentFacadeInput = {
    orderId: string
    amount: number
}

export type AddPaymentFacadeOutput = {
    transactionId: string
    orderId: string
    amount: number
    status: string
    createdAt: Date
    updatedAt: Date
}

export interface TransactionFacadeInterface {
    addPayment(input: AddPaymentFacadeInput): Promise<AddPaymentFacadeOutput>
}