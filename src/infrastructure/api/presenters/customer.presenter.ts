import { toXML } from 'jstoxml'
import { OutputListCustomerDTO } from '../../../use-cases/customer/list/list.customer.dto';

export default class CustomerPresenter {
  static toXML(data: OutputListCustomerDTO): string {
    const xmlOption = {
      header: true,
      indent: '  ',
      newLine: '\n',
      allowEmpty: true
    };

    return toXML({
      customers: {
        customer: data.customers.map((customer) => ({ 
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              city: customer.address.city,
              zip: customer.address.zip
            }
        }))
      }
    }, xmlOption);
  }
}