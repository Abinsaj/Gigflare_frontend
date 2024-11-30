
import { FreelanceData } from "../../Types/freelancerInterface";
import axiosInstance from "../../config/userInstance";

const url = 'http://localhost:7070/freelancer';

export const freelancerApplication = async(freelancerData: FreelanceData,id: string)=>{
    try {
        console.log('the data of the freelancer is ',freelancerData)
        const response = await axiosInstance.post(`${url}/application/${id}`,freelancerData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        if(response){
            return true
        }
    } catch (error: any) {
        throw new Error(error)
    }
}