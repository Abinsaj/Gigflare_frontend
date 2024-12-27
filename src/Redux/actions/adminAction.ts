import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 
import { string } from "yup";
import axiosInstance from "../../config/userInstance";

const url = 'http://localhost:7070/admin';

export const verifyAdmin = createAsyncThunk(
    'admin/authlogin',
    async({email, password}:{email: string, password: string},thunkAPI)=>{
        try {
            const response = await axiosInstance.post(`/admin/verifyAdmin`,{email, password},{withCredentials:true})
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const updateApplication = createAsyncThunk(
    'user/updateApplcation',
    async({applicationId,newStatus}:{applicationId: string | undefined, newStatus: any},thunkAPI)=>{
       try {
        console.log(applicationId,'thish',newStatus)
            const response =  await axiosInstance.put(`/admin/updatefreelancerstatus/${applicationId}`, { status: newStatus })
            console.log(response,'this is the actual response')
            return response.data
       } catch (error: any) {
            return (error.response.data || error.message)
       }
    }
)