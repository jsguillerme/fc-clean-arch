import { randomUUID } from 'node:crypto'
import Product from "../entity/product"
import ProductInterface from "../entity/product.interface"
import ProductB from '../entity/product-b'

export default class ProductFactory {
  static create(type: 'a' | 'b' | 'default', name: string, price: number): ProductInterface {
    const productTypes = {
      'a': () => new Product(randomUUID(), name, price),
      'b': () => new ProductB(randomUUID(), name, price),
      'default': () => { throw new Error('Invalid product type') }
    }

    return (productTypes[type] || productTypes['default'])()
  }
}