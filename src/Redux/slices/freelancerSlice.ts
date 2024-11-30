import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateApplication } from "../actions/adminAction";


interface FreelanceData {
    applicationId: string;
    firstName: string;
    lastName: string;
    photo?: {
        fileurl: string;
        _id: string;
    };
    description: string;
    language: string; 
    experience: {
        categoryId: string;
        expertise: string;
        fromYear: string;
        toYear: string;
    };
    skills: string[];
    education?: Array<{
        collageName: string;
        title: string;
        year: number;
        _id: string;
    }>;
    certification?: Array<{
        name: string;
        year: number;
        _id: string;
    }>;
    certficatImage?: string[]; 
    portfolio?: string;
    email: string;
    phone?: string;
    status?: string; 
    createdAt?: string; 
    updatedAt?: string; 
    userId?: string; 
    _id?: string; 
}


interface FreelancerState {
    freelancerInfo: FreelanceData | null,
    accessToken: string | null,
    refreshToken: string | null,
    loading: boolean,
    error: string | null
}

const initialState: FreelancerState = {
    freelancerInfo : localStorage.getItem('freelancerInfo') ? JSON.parse(localStorage.getItem('freelanerInfo')!) : null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: null,
    loading: false,
    error: null
}

const FreelancerSlice = createSlice({
    name: 'freelancer',
    initialState,
    reducers:{
        clearFreelancer(state){
            state.freelancerInfo = null;
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
    extraReducers: (builder)=>{
        builder
        .addCase(updateApplication.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateApplication.fulfilled,(state, action: PayloadAction<{freelancerInfo: FreelanceData}>)=>{
            console.log('havooo its reached in freelancer slice')
            const {freelancerInfo} = action.payload;
            console.log(freelancerInfo,'its getting here')
            state.freelancerInfo = freelancerInfo;
            state.loading = false;
        })
        .addCase(updateApplication.rejected,(state,action)=>{
            state.loading = false;
            state.error = (action.payload as string) || 'Login failed'
        })
    }
})

export const {clearFreelancer, setLoading, setError} = FreelancerSlice.actions

export default FreelancerSlice.reducer