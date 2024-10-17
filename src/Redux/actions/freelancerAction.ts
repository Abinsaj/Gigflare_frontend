import axios from "axios";
import { FreelancerData } from "../../Types/freelancerInterface";

const url = 'http://localhost:7070/freelancer';

export const freelancerApplication = async(freelancerData: FreelancerData)=>{
    try {
        console.log('the data of the freelancer is ',freelancerData)
        const response = await axios.post(`${url}/application`,freelancerData)
        if(response){
            return true
        }
    } catch (error: any) {
        throw new Error(error)
    }
}