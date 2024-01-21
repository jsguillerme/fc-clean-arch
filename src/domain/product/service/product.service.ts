import Product from "../entity/product"

// DOMAIN SERVICE
export default class ProductService {

  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach(product => {
      product.changePrice((product.price * percentage) / 100 + product.price)
    })

    return products
  }
}