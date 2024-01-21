import { randomUUID } from "crypto"
import OrderFactory from "./order.factory"

describe('Order Factory Unit Test', () => {

  it('should create an order', () => {
    
    const orderProps = {
      id: randomUUID(),
      customerId: randomUUID(),
      items: [{
        id: randomUUID(),
        name: `Item ${randomUUID()}`,
        productId: randomUUID(),
        quantity: 1,
        price: 100
      }]
    }

    const order = OrderFactory.create(orderProps)

    expect(order.id).toEqual(orderProps.id)
    expect(order.customerId).toEqual(orderProps.customerId)
    expect(order.items).toHaveLength(1)

  })
})