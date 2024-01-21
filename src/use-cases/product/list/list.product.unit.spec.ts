import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factories/product.factory"
import ListProductUseCase from "./list.product.usecase";

const productOne = ProductFactory.create('a', 'Product One', 10);
const newProductOne = new Product(productOne.id, productOne.name, productOne.price);
const ProductTwo = ProductFactory.create('a', 'Product Two', 30);
const newProductTwo = new Product(ProductTwo.id, ProductTwo.name, ProductTwo.price);


const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([newProductOne, newProductTwo])),
  }
}

describe('Unit test list product use case', () => {

  it('should list all products', async () => {
    const productRepository = mockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output.products).toHaveLength(2);
    expect(output.products[0]).toEqual({
      id: newProductOne.id,
      name: newProductOne.name,
      price: newProductOne.price
    });

    expect(output.products[1]).toEqual({
      id: newProductTwo.id,
      name: newProductTwo.name,
      price: newProductTwo.price
    });
  });
});