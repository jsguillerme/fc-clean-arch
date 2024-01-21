import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/object-values/address";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(
    customerRepository: CustomerRepositoryInterface
  ) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.city, input.address.zip));

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zip: customer.Address.zip
      }
    }
  }
}