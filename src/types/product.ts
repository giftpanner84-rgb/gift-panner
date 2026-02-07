export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  asin: string;
  quantity: number;
  image: string;
  amazon_image: string;
  rating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  productId: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
