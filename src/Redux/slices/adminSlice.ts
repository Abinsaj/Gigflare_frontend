import { createSlice } from "@reduxjs/toolkit";
import { verifyAdmin } from "../actions/adminAction";

interface admin{
    email: string,
    password: string
};

interface AdminState{
    adminInfo: admin | null,
    loading: boolean,
    error: string | null
};

const initialState: AdminState = {
    adminInfo : null,
    loading : false,
    error: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        clearAdmin(state){
            state.adminInfo = null;
            state.loading = false;
            state.error = null
        },
        setLoading(state,action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(verifyAdmin.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyAdmin.fulfilled,(state, action)=>{
            state.adminInfo = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(verifyAdmin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as string || 'Login Failed'
        })
    }
})
export const {clearAdmin, setLoading, setError} = adminSlice.actions
export default adminSlice.reducer