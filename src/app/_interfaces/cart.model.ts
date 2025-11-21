
// Root response
export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

// Cart main object
export interface CartData {
  status: string,
    numOfCartItems: number,
    cartId:string,
    data:{
      _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
    }
  
}

// Each product in the cart
export interface CartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

// Product details
export interface Product {
  subcategory: SubCategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

// Subcategory
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

