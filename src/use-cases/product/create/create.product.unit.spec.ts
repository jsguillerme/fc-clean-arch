import { InputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: 'a',
  name: 'Product A',
  price: 10
} as InputCreateProductDTO

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe('Unit Test create product use case', () => {

  it('should create a new product a', async () => {
    const productRepository = mockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });
});