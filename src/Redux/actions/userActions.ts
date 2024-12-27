import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import {User} from '../../Types/userInterface'
import axiosInstance from "../../config/userInstance";

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
            const response = await axiosInstance.post(`/register`, userData);
            console.log(response,'this is the actual reponse')
            if (response.status === 200 && response.data.success) {
                localStorage.setItem('userEmail', userData.email);
                localStorage.setItem('userName', userData.name);
            }
            return response
        } catch (error: any) {
            console.error('Error in registerClient action:', error);
            throw error;
        }
    }
}
export const verifyOtp = (otp: string) => {
    return async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const response = await axiosInstance.post(`/otpVerification`, { email, otp });
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
            console.log('its hereeererrere')
            const response = await axios.post(`https://www.gigflare.online/login`,{email,password})
            
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

export const verifyForgotEmail = (email: string)=>{
    return async()=>{
        try {
            console.log(email,'this this')
            const response = await axios.post(`${url}/forgotEmail`, {email})
            console.log(response,'this is it')
            if(response.data == 'Email verified otp has sent'){
                return true
            }else if(response.data == 'Email verification failed'){
                return false
            }
        } catch (error) {
            throw error
        }
    }
}

// export const verifyForgotOtp = async(otp: string)=>{
//     try {
//         console.log('kjfklaad')
//         const response = await axios.post(`${url}/verifyforgototp`,{otp})
//         console.log(response,' this is the reponse we get')
//         if(response.data === 'verified'){
//             return true
//         }else{
//             return false
//         }
//     } catch (error: any) {
//         throw error
//     }
// }



