import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/object-values/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John Doe', new Address('Street', 1, 'City', '12345'));

const input = {
  id: customer.id,
  name: 'John Updated Doe',
  address: {
    street: 'Updated Street',
    number: 2,
    city: 'Updated City',
    zip: '54321'
  }
}

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  }
}

describe('Unit test update customer use case', () => {

  it('should update a customer', async () => {
    const customerRepository = mockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});