import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

const url = 'http://localhost:7070/admin';

export const verifyAdmin = createAsyncThunk(
    'admin/authlogin',
    async({email, password}:{email: string, password: string},thunkAPI)=>{
        try {
            const response = await axios.post(`${url}/verifyAdmin`,{email, password},{withCredentials:true})
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)