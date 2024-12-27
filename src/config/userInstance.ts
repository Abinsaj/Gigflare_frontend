import axios from "axios";

const url =  "https://www.gigflare.online"


const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})



export default axiosInstance;