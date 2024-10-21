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
            localStorage.removeItem('adminInfo')
            state.loading = false;
            state.error = null
        },
        setLoading(state,action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        setAdmin(state,action){
            state.adminInfo = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(verifyAdmin.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyAdmin.fulfilled,(state, action)=>{
            console.log('its hererereerererrrer')
            const {cred} = action.payload
            state.adminInfo = cred;
            state.loading = false;
            state.error = null;

            localStorage.setItem('adminInfo',JSON.stringify(cred))
        })
        .addCase(verifyAdmin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as string || 'Login Failed'
        })
    }
})
export const {clearAdmin, setLoading, setError,setAdmin} = adminSlice.actions
export default adminSlice.reducer