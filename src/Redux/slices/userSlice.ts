import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verifyLogin } from "../actions/userActions";
import { updateApplication } from "../actions/adminAction";


interface User {
    userId: string;
    name: string;
    email: string;
    phone?: string;
    password?: string;
    isFreelancer?: boolean;
    isBlocked: boolean;
    freelancerCredentials?: {};
    profile?:string
}

interface UserState {
    userInfo: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null
}

const initialState: UserState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state){
            state.userInfo = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userInfo');
        },
        setLoading(state,action){
            state.loading = action.payload
        },
        setError(state,action){
            state.error = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(verifyLogin.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyLogin.fulfilled,(state, action: PayloadAction<{accessToken: string; userInfo: User}>)=>{
            const { accessToken, userInfo } = action.payload
            state.userInfo = userInfo;
            console.log(state.userInfo,'this is the user info in slice')
            state.accessToken = accessToken;
            state.loading = false;

            localStorage.setItem('accessToken',accessToken)
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
        })
        .addCase(verifyLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = (action.payload as string) || 'Login failed'
        })
    }
})

export const { clearUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer