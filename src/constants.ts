export type Product = {
  id: number;
  name: string;
};

export const productsUrl = 'http://localhost:5173/api/products';

export const products = Array.from<number, Product>({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Product${i + 1}`,
}));
