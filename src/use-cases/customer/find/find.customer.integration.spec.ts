import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repositories/sequelize/models/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repositories/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/object-values/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 1, 'City', '12345');
    customer.changeAddress(address);
    
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

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
});