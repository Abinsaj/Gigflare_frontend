import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import {User} from '../../Types/userInterface'

const url = 'http://localhost:7070';

export const registerClient = (userData:{
    name: string;
    email: string;
    phone: string; 
    password: string;
    confirmPassword: string;
}) => {
    return async () =>{
        try {
            const response = await axios.post(`${url}/register`, userData);
            if(response.data.status === true){
                localStorage.setItem('userEmail',userData.email)
                return response
            }
            return response
        } catch (error: any) {
            if(error.response.status === 409){
                console.error('email already in use')
                return false
            }else{
                throw error
            }
        }
    }
}
export const verifyOtp = (otp: string) => {
    return async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const response = await axios.post(`${url}/otpVerification`, { email, otp });
            console.log(response);
            if (response.data.message === 'verified') {
                localStorage.clear();
                return true;
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message;
            if (errorMessage === 'Wrong OTP') {
                return 'wrong';
            } else if (errorMessage === 'OTP has expired' || errorMessage === 'OTP expired or not found') {
                return 'expired';
            }
        }
    };
};


export const verifyLogin = createAsyncThunk<{ accessToken: string; userInfo: User},{email: string; password: string}>(
    'user/authLogin',
    async ({email,password},{rejectWithValue})=>{
        try {
            const response = await axios.post(`${url}/login`,{email,password})
            return response.data.cred
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Login Failed')
        }
    }
)

export const resendOtp = ()=>{
    return  async()=>{
        try {
            const response = await axios.post(`${url}/resendOtp`)
            console.log('the response we get after resend OTP is',response)
            if(response.data === "OTP sended"){
                return true
            }
        } catch (error) {
            return false
        }
    }
}



