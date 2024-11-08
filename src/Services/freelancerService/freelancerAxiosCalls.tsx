import axiosInstance from "../../config/userInstance";

export const getDetails = async(id: string)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getDetails/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getJobList = async()=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getJobDetails`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}