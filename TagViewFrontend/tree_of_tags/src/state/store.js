// import { applyMiddleware, createStore } from "redux";
// import { thunk } from 'redux-thunk';
// import reducers from "./reducers";

// export const store = createStore(reducers, {}, applyMiddleware(thunk))

import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { thunk } from 'redux-thunk';
import reducers from './reducers'; // Your reducers

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
