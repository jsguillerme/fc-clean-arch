export interface InputListCustomerDTO {}

export interface OutputListCustomerDTO {
  customers: Customer[]
}

type Customer = {
  id: string,
  name: string,
  address: {
    street: string,
    number: number,
    city: string,
    zip: string
  }
}