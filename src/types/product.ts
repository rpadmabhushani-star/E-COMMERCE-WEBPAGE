
export type ProductAvailability =
  | "Available"
  | "Few Available"
  | "Soon to Be Out of Stock"
  | "Out of Stock";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  availability: string ; // { status: ProductAvailability };
}