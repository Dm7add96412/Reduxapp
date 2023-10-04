import { combineReducers, configureStore } from "@reduxjs/toolkit"
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

const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    // whitelist: ['cartReducer']
    blacklist: ['userReducer', 'productsReducer', 'productReducer']
}

const rootReducer = combineReducers({
    productsReducer,
    userReducer,
    cartReducer,
    productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

export default store