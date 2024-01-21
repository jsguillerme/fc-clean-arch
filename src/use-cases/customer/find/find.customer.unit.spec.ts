import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/object-values/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer('1', 'John Doe');
const address = new Address('Street', 1, 'City', '12345');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  }
};

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '1'
    }

    const output = {
      id: '1',
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: '12345'
      }
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not find a customer', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    })
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '2'
    }

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});