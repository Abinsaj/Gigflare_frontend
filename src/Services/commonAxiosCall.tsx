import axiosInstance from "../config/userInstance"

export const getSingleContract = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/getsinglecontract/${id}`)
        return response.data
    } catch (error: any) {
        if (error.response.data) {
            return error.response.data
        }
        console.log(error)
    }
}