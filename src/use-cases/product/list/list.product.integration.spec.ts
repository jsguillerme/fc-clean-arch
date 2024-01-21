import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequelize/models/product.model";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepository from "../../../infrastructure/product/repositories/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe('Integration Test list product use case', () => {
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

  it('should list a product', async () => {
    const productOne = ProductFactory.create('a', 'Product One', 10);
    const productEntityOne = new Product(productOne.id, productOne.name, productOne.price);
    const productTwo = ProductFactory.create('a', 'Product Two', 40);
    const productEntityTwo = new Product(productTwo.id, productTwo.name, productTwo.price);


    const productRepository = new ProductRepository();

    await productRepository.create(productEntityOne);
    await productRepository.create(productEntityTwo);


    const usecase = new ListProductUseCase(productRepository);

    const input = {}

    const output = await usecase.execute(input);

    expect(output.products).toHaveLength(2);
    expect(output.products[0]).toEqual({
      id: productOne.id,
      name: 'Product One',
      price: 10
    });
    expect(output.products[1]).toEqual({
      id: productTwo.id,
      name: 'Product Two',
      price: 40
    });
  });
});