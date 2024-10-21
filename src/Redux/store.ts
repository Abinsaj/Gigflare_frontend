import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import adminSlice from "./slices/adminSlice";
import { persistStore,persistReducer } from "redux-persist";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'root',
    storage,
    whitelist: ['user','admin']
};

const persistedUserReducer = persistReducer(persistConfig,userSlice);
const persistedAdminReducer = persistReducer(persistConfig,adminSlice)

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        admin: persistedAdminReducer
    }
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store