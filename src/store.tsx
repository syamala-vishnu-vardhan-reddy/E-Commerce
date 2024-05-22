import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherReducer from '../src/features/slices/slices';
import rootSaga from '../src/features/sagas/sagas';
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  weather: weatherReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;

