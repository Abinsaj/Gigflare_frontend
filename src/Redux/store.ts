import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import adminSlice from "./slices/adminSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store