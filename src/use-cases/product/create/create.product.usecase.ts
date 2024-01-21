import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(
    productRepository: ProductRepositoryInterface
  ) {
    this.productRepository = productRepository;
  };

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create(input.type, input.name, input.price);
    const newProduct = new Product(product.id, product.name, product.price);


    await this.productRepository.create(newProduct);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}