import ProductFactory from "../../../domain/product/factories/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create('a', 'Product A', 10);

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find product use case', () => {

  it('should find a product', async () => {
    const productRepository = mockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id
    }

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});