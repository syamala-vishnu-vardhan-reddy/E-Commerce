import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  error: string | null;
  loginRequest: any;
  signupRequest: any;
  isLoading: boolean;
  categories: any;
  products: any;
  productById: any;
  addToCartRequest: any;
  addTocartDetails: any;
  cartSummary: any;
  deleteItemFromCart: any;
  DeleteFromcartDetails: any;
  categoryById: any;
  searchResults: any;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loginRequest: null,
  signupRequest: null,
  isLoading: false,
  categories: null,
  products: null,
  productById: null,
  addToCartRequest: null,
  addTocartDetails: null,
  cartSummary: null,
  deleteItemFromCart: null,
  DeleteFromcartDetails: null,
  categoryById: null,
  searchResults: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action) {
      state.loginRequest = action.payload;
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    signupRequest(state, action) {
      state.signupRequest = action.payload;
      state.isLoading = true;
    },
    signupSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    signupFailure(state, action) {
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    getCategories(state) {
      state.isLoading = true;
    },
    getCategoriesSuccess(state, action) {
      state.categories = action.payload;
      state.isLoading = false;
    },
    getCategoriesFailure(state, action) {
      state.categories = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    getProducts(state) {
      state.isLoading = true;
    },
    getProductsSuccess(state, action) {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductsFailure(state, action) {
      state.products = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    getProductById(state) {
      state.isLoading = true;
    },
    getProductByIdSuccess(state, action) {
      state.productById = action.payload;
      state.isLoading = false;
    },
    getProductByIdFailure(state, action) {
      state.productById = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCartRequest(state, action) {
      state.addToCartRequest = action.payload;
      state.isLoading = true;
    },
    addToCartRequestSuccess(state, action) {
      state.addTocartDetails = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    addToCartRequestFailure(state, action: PayloadAction<string>) {
      state.addTocartDetails = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchCartSummary(state) {
      state.isLoading = true;
    },
    fetchCartSummarySuccess(state, action) {
      state.cartSummary = action.payload;
      state.isLoading = false;
    },
    fetchCartSummaryFailure(state, action) {
      state.cartSummary = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteCartRequest(state, action) {
      state.deleteItemFromCart = action.payload;
      state.isLoading = true;
    },
    deleteCartRequestSuccess(state, action) {
      state.DeleteFromcartDetails = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    deleteCartRequestFailure(state, action: PayloadAction<string>) {
      state.DeleteFromcartDetails = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    getCategoryById(state) {
      state.isLoading = true;
    },
    getCategoryByIdSuccess(state, action) {
      state.categoryById = action.payload;
      state.isLoading = false;
    },
    getCategoryByIdFailure(state, action) {
      state.categoryById = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    searchProducts(state) {
      state.isLoading = true;
    },
    searchProductsSuccess(state, action) {
      state.searchResults = action.payload;
      state.isLoading = false;
    },
    searchProductsFailure(state, action) {
      state.searchResults = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  getCategories,
  getCategoriesFailure,
  getCategoriesSuccess,
  getProducts,
  getProductsFailure,
  getProductsSuccess,
  getProductById,
  getProductByIdFailure,
  getProductByIdSuccess,
  addToCartRequest,
  addToCartRequestFailure,
  addToCartRequestSuccess,
  fetchCartSummary,
  fetchCartSummaryFailure,
  fetchCartSummarySuccess,
  deleteCartRequest,
  deleteCartRequestFailure,
  deleteCartRequestSuccess,
  getCategoryById,
  getCategoryByIdFailure,
  getCategoryByIdSuccess,
  searchProducts,
  searchProductsFailure,
  searchProductsSuccess,
} = authSlice.actions;

export const authState = (state: any) => state.auth;

export default authSlice.reducer;
