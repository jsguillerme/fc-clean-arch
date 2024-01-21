import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequelize/models/product.model";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepository from "../../../infrastructure/product/repositories/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe('Integration Test find product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => {
    const product = ProductFactory.create('a', 'Product A', 10);
    const productEntity = new Product(product.id, product.name, product.price);
    const productRepository = new ProductRepository();

    await productRepository.create(productEntity);

    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id,
    }

    const output = {
      id: product.id,
      name: 'Product A',
      price: 10
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);    
  });
});