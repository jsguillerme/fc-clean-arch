import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repositories/sequelize/models/customer.model';
import { customerRouter } from './routes/customer.route';
import { productRouter } from './routes/product.route';
import ProductModel from '../product/repositories/sequelize/models/product.model';

export const app: Express = express();

app.use(express.json());
app.use('/customer', customerRouter);
app.use('/product', productRouter);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb();