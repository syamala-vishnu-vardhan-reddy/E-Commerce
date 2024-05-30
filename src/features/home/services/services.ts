// services.ts
import * as BaseService from "../../../apiconfig/baseServices";
import {
  LoginRequest,
  SignUpRequest,
  addToCartData,
  deleteItemFromCart,
} from "../header/homeTypes";

export default class AuthService {
  static async loginUser(request: LoginRequest) {
    return BaseService.postData("/auth/signIn", request);
  }

  static async signUp(request: SignUpRequest) {
    return BaseService.postData("/auth/signup", request);
  }
  static async catergoriesInfo() {
    return BaseService.getData("/category/");
  }
  static async productsInfo() {
    return BaseService.getData("/products/");
  }
  static async productInfoById(productId: string) {
    return BaseService.getData(`/products/${productId}`);
  }

  static async AddToCart(request: addToCartData) {
    return BaseService.postData("/cart/addToCart", request);
  }
  static async cartSummary() {
    return BaseService.getData("/cart/summary");
  }
  static async deleteItem(request: deleteItemFromCart) {
    return BaseService.updateData("/cart/removeFromCart", request);
  }
  static async categoryInfoById(categoryId: string) {
    return BaseService.getData(`/category/${categoryId}`);
  }
  static async searchText(searchId: string) {
    return BaseService.getData(`/products/searchProducts/${searchId}`);
  }
}
