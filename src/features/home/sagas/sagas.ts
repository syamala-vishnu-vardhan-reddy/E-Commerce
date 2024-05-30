// sagas.ts (Redux sagas)
import { call, put, select, takeEvery } from "redux-saga/effects";
import AuthService from "../services/services";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  loginRequest,
  signupRequest,
  authState,
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  getProductsSuccess,
  getProductsFailure,
  getProducts,
  getProductByIdSuccess,
  getProductByIdFailure,
  getProductById,
  addToCartRequestSuccess,
  addToCartRequestFailure,
  addToCartRequest,
  fetchCartSummarySuccess,
  fetchCartSummaryFailure,
  fetchCartSummary,
  deleteCartRequestSuccess,
  deleteCartRequestFailure,
  deleteCartRequest,
  getCategoryByIdFailure,
  getCategoryByIdSuccess,
  getCategoryById,
  searchProductsSuccess,
  searchProductsFailure,
  searchProducts,
} from "../slices/slices";

function* handleLogin(): any {
  try {
    const { loginRequest: requestData } = yield select(authState);
    const response = yield call(AuthService.loginUser, requestData);
    localStorage.setItem("user", JSON.stringify(response));
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* handleSignup(): any {
  try {
    const { signupRequest: requestData } = yield select(authState);
    const response = yield call(AuthService.signUp, requestData);

    yield put(signupSuccess(response.data));
  } catch (error: any) {
    yield put(signupFailure(error.message));
  }
}
function* actionHandleCategories(): any {
  try {
    const response = yield call(AuthService.catergoriesInfo);

    yield put(getCategoriesSuccess(response));
  } catch (error: any) {
    yield put(getCategoriesFailure(error.message));
  }
}
function* actionHandleProducts(): any {
  try {
    const response = yield call(AuthService.productsInfo);

    yield put(getProductsSuccess(response));
  } catch (error: any) {
    yield put(getProductsFailure(error.message));
  }
}
function* actionHandleProductById(action: any): Generator<any, void, any> {
  try {
    const productId = action.payload;
    const response = yield call(AuthService.productInfoById, productId);
    yield put(getProductByIdSuccess(response));
  } catch (error: any) {
    yield put(getProductByIdFailure(error.message));
  }
}
function* handleAddtoCart(): any {
  try {
    const { addToCartRequest: requestData } = yield select(authState);
    const response = yield call(AuthService.AddToCart, requestData);

    yield put(addToCartRequestSuccess(response));
  } catch (error: any) {
    yield put(addToCartRequestFailure(error.message));
  }
}
function* actionHandleCartSummary(): any {
  try {
    const response = yield call(AuthService.cartSummary);

    yield put(fetchCartSummarySuccess(response));
  } catch (error: any) {
    yield put(fetchCartSummaryFailure(error.message));
  }
}
function* actionHandleCartItemDelete(): any {
  try {
    const { deleteItemFromCart: requestData } = yield select(authState);
    console.log(requestData);
    const response = yield call(AuthService.deleteItem, requestData);

    yield put(deleteCartRequestSuccess(response));
  } catch (error: any) {
    yield put(deleteCartRequestFailure(error.message));
  }
}
function* actionHandleCatergoryById(action: any): Generator<any, void, any> {
  try {
    const categoryId = action.payload;
    const response = yield call(AuthService.categoryInfoById, categoryId);
    yield put(getCategoryByIdSuccess(response));
  } catch (error: any) {
    yield put(getCategoryByIdFailure(error.message));
  }
}
function* actionHandleSearch(action: any): Generator<any, void, any> {
  try {
    const searchRequest = action.payload;
    const response = yield call(AuthService.searchText, searchRequest);
    yield put(searchProductsSuccess(response));
  } catch (error: any) {
    yield put(searchProductsFailure(error.message));
  }
}
export function* watchLogin() {
  yield takeEvery(loginRequest, handleLogin);
}

export function* watchSignup() {
  yield takeEvery(signupRequest, handleSignup);
}
export function* watchcategories() {
  yield takeEvery(getCategories, actionHandleCategories);
}
export function* watchproducts() {
  yield takeEvery(getProducts, actionHandleProducts);
}
export function* watchproductById() {
  yield takeEvery(getProductById, actionHandleProductById);
}
export function* watchAddToCart() {
  yield takeEvery(addToCartRequest, handleAddtoCart);
}
export function* watchCartSummary() {
  yield takeEvery(fetchCartSummary, actionHandleCartSummary);
}
export function* watchCartDeletion() {
  yield takeEvery(deleteCartRequest, actionHandleCartItemDelete);
}
export function* watchcategoryById() {
  yield takeEvery(getCategoryById, actionHandleCatergoryById);
}
export function* watchSearch() {
  yield takeEvery(searchProducts, actionHandleSearch);
}
