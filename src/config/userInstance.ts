import axios from "axios";

const url =  "http://localhost:7070"

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})

// axiosInstance.interceptors.request.use(
//     (config)=>{
//         const accessToken = localStorage.getItem('AccessToken')

//         if(accessToken){
//             config.headers['Authorization'] = `Bearer${accessToken}`
//         }
//         return config
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )

// axiosInstance.interceptors.response.use(
//     (response)=>{
//         return response;
//     },
//     async(error) => {
//         const originalRequest = error.config;

//         if(error.response && error.response.status === 401 && !originalRequest._retry){
//             originalRequest._retry = true;

//             try {
//                 const response = await axios.post(`${url}/refresh-token`,{},{
//                     withCredentials: true
//                 })
                
//                 const accessToken = response.data

//                 localStorage.setItem('AccessToken',accessToken)
//                 originalRequest.headers['Authorization'] = `Bearer${accessToken}`

//                 return axiosInstance(originalRequest)
//             } catch (error) {
//                 return Promise.reject(error)
//             }
//         }
//         return Promise.reject(error)
//     }
// )

export default axiosInstance;