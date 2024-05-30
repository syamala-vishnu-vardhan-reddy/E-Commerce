interface LoginRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  userName: string;
  password: string;
}
interface addToCartData {
  products: {
    product: string;
    price: number;
    quantity: number;
  };
}
interface deleteItemFromCart {
  productId: string;
}

export type { LoginRequest, SignUpRequest, addToCartData, deleteItemFromCart };
