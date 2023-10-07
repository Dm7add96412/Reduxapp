import { AnyAction, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist"
import { PersistConfig } from "redux-persist/lib/types"

import productsReducer from "./reducers/productsReducer"
import userReducer from "./reducers/userReducers"
import cartReducer from './reducers/cartReducer'
import productReducer from './reducers/productReducer';
import categoriesReducer from "./reducers/categoriesReducer"

const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    // whitelist: ['cartReducer']
    blacklist: ['userReducer', 'productsReducer', 'productReducer', 'categoriesReducer']
}

const rootReducer = combineReducers({
    productsReducer,
    userReducer,
    cartReducer,
    productReducer,
    categoriesReducer
})

const persistedReducer: Reducer<AppState, AnyAction> = persistReducer(persistConfig, rootReducer)

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})
}
// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

const store = createStore()

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

export default store