import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequelize/models/product.model";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepository from "../../../infrastructure/product/repositories/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDTO } from "./create.product.dto";

describe('Integration Test create product use case', () => {
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

  it('should create a product', async () => {
    const input = {
      type: 'a',
      name: 'Product A',
      price: 10
    } as InputCreateProductDTO;

    const productRepository = new ProductRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  });
});