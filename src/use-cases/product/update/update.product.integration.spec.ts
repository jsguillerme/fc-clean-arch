import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequelize/models/product.model";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepository from "../../../infrastructure/product/repositories/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe('Integration Test update product use case', () => {
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

  it('should update a product', async () => {
    const product = ProductFactory.create('a', 'Product A', 10);
    const productEntity = new Product(product.id, product.name, product.price);
    const productRepository = new ProductRepository();

    await productRepository.create(productEntity);
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: productEntity.id,
      name: 'Product Updated',
      price: 20 
    }

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    })    
  });
});