export interface InputListProductDTO {}

export interface OutputListProductDTO {
  products: Product[];
}

type Product = {
  id: string;
  name: string;
  price: number;
}