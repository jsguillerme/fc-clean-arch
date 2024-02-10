import { Router, Request, Response } from 'express';
import CreateCustomerUseCase from '../../../use-cases/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repositories/sequelize/customer.repository';
import ListCustomerUseCase from '../../../use-cases/customer/list/list.customer.usecase';
import CustomerPresenter from '../presenters/customer.presenter';

export const customerRouter = Router();

customerRouter.post('/', async (req: Request, res: Response) => {
  try {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip
      }
    };

    const output = await usecase.execute(customerDTO);

    res.status(201).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRouter.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});
    
    res.format({
      json: async () => res.status(200).json({
        customers: output.customers
      }),
      xml: async () => res.status(200).send(CustomerPresenter.toXML(output)) 
    })
  } catch (error) {
    res.status(500).send(error);
  }
});
