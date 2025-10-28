interface Product {
  category: string;
  description: string;
  id: number;
  poster: string;
  price: { mrp: number; sale: number };
  title: string;
}

export default Product;
