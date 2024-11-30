import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import adminSlice from "./slices/adminSlice";
import { persistStore,persistReducer } from "redux-persist";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import freelancerSlicer from './slices/freelancerSlice'

const persistConfig = {
    key : 'root',
    storage,
    whitelist: ['user','admin','freelancer']
};

const persistedUserReducer = persistReducer(persistConfig,userSlice);
const persistedAdminReducer = persistReducer(persistConfig,adminSlice)
const persistedFreelancerReducer = persistReducer(persistConfig,freelancerSlicer)

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        admin: persistedAdminReducer,
        freelancer: persistedFreelancerReducer
    }
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store