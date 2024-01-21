import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
  id: string
  customerId: string
  items: {
    id: string,
    name: string,
    productId: string,
    quantity: number,
    price: number
  }[]
}

export default class OrderFactory {
  static create({ customerId, id, items }: OrderFactoryProps): Order {
    const orderItems = items.map((item) => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))

    const order = new Order(id, customerId, orderItems)

    return order
  }
}