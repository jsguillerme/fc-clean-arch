import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factories/product.factory"
import UpdateProductUseCase from "./update.product.usecase";

const input = {
  id: '1',
  name: 'Product Updated A',
  price: 20
}

const product = ProductFactory.create('a', 'Product A', 10);
const productUpdated = new Product('1', product.name, product.price);

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(productUpdated)),
    findAll: jest.fn(),
  }
}

describe('Unit Test update product use case', () => {

  it('should update a product a', async () => {
    const productRepository = mockRepository();

    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price
    });
  });
});