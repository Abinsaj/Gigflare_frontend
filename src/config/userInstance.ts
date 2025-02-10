import axios from "axios";
import { toast } from "sonner";

const url =  "https://www.gigflare.online"


const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.response){
            const status = error.response.status
            const message = error.response.data?.message

            if(status === 403 || message === "Access Denied, You are blocked"){
                localStorage.removeItem('userInfo');
                localStorage.removeItem('accessToken');
                toast.error(message)
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;