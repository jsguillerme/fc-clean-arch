export interface InputCreateProductDTO {
  type: 'a' | 'b' | 'default';
  name: string;
  price: number;
}

export interface OutputCreateProductDTO {
  id: string;
  name: string;
  price: number;
}