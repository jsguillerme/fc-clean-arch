import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/object-values/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress('John Doe', new Address('Street', 1, 'City', '12345'));
const customerTwo = CustomerFactory.createWithAddress('Jane Doe', new Address('Street Laugh', 2, 'City Laugh', '123456'));

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
  }
}

describe('Unit test list customer use case', () => {

  it('should list all customers', async () => {
    const customerRepository = mockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute({});

    expect(output.customers).toHaveLength(2);
    expect(output.customers[0]).toEqual({
      id: customerOne.id,
      name: customerOne.name,
      address: {
        street: customerOne.Address.street,
        number: customerOne.Address.number,
        city: customerOne.Address.city,
        zip: customerOne.Address.zip
      }
    });
    expect(output.customers[1]).toEqual({
      id: customerTwo.id,
      name: customerTwo.name,
      address: {
        street: customerTwo.Address.street,
        number: customerTwo.Address.number,
        city: customerTwo.Address.city,
        zip: customerTwo.Address.zip
      }
    });
  });
});