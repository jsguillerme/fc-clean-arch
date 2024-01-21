import { randomUUID } from 'node:crypto'
import Customer from '../entity/customer';
import Address from '../object-values/address';

export default class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(randomUUID(), name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(randomUUID(), name);

    customer.changeAddress(address);

    return customer;
  }
}