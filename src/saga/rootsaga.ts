import { all } from "redux-saga/effects";
import {
  watchAddToCart,
  watchCartDeletion,
  watchCartSummary,
  watchLogin,
  watchSearch,
  watchSignup,
  watchcategories,
  watchcategoryById,
  watchproductById,
  watchproducts,
} from "../features/home/sagas/sagas";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchcategories(),
    watchproducts(),
    watchproductById(),
    watchAddToCart(),
    watchCartSummary(),
    watchCartDeletion(),
    watchcategoryById(),
    watchSearch(),
  ]);
}
