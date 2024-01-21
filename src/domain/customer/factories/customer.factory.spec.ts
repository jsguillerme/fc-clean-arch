import Address from "../object-values/address"
import CustomerFactory from "./customer.factory"

describe('Customer Factory Unit Test', () => {

  it('should create a customer', () => {
    let customer = CustomerFactory.create('john')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('john')
    expect(customer.Address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address('street 1', 32, 'state 1', '51301301')
    let customer = CustomerFactory.createWithAddress('john', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('john')
    expect(customer.Address).toBe(address)
  })
})