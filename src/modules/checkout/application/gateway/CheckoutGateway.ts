import { Order } from "../../domain/Order"

export default interface CheckoutGateway {
    addOrder(order: Order): Promise<void>
    findOrder(id: string): Promise<Order | null>
}