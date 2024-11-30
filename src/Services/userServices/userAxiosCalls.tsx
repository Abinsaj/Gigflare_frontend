import axios from 'axios'
import axiosInstance from '../../config/userInstance'
import { FreelanceData } from '../../Types/freelancerInterface';

interface changePassword{
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

interface Jobpost{
  jobTitle: string;
  jobDescription: string;
  category: string;
  skills: string[];  
  duration: string;
  projectType: string;
  experienceLevel?: string;
  budget?: number;
}

export const getUserInfo = async(id: string | undefined)=> {
  try {
    const response = await axiosInstance.get(`/userInfo/${id}`)
    return response.data
  } catch (error:any) {
    return error.response.data
  }
}

export const getFreelancers = async()=>{
  try {
    const response = await axiosInstance.get('/getfreelancers')
    console.log(response,'this is the response we get for freelancers list')
    return response.data

  } catch (error: any) {
    return error.response.data
  }
}

export const changePassword = async(formData: changePassword, id:string|undefined)=>{
  try {
    console.log(formData,'this is the value')
    const response = await axiosInstance.put(`/changePassword`,{formData,id})
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const googleLogin = async(tokenResponse:any)=>{
  try {
    const result = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
            headers:{
                'Authorization':`Bearer ${tokenResponse.access_token}`
            }
        })
        return result.data
  } catch (error) {
    if(error instanceof Error){
      console.log(error)
    }
  }
}

export const getUserJobs = async(id: string | undefined)=>{
  try {
    const result = await axiosInstance.get(`/getsinglejob/${id}`)
    console.log(result, 'this is the result of the single user job')
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const getcategories = async()=>{
  try {
      const result =  await axiosInstance.get('/getcategory')
      console.log(result,'this is the result we got here')
      return result.data
  } catch (error) {
      console.log(error)
  }
}

export const createJob = async(formData: Jobpost, id: string | undefined )=>{
  try {
    const result = await axiosInstance.post('/createjob', { formData, id})
    return result.data
  } catch (error) {
    console.log(error)  
  }
}

export const getProposals = async(id: string | undefined)=>{
  try {
    const result = await axiosInstance.get(`/getproposals/${id}`)
    console.log(result,'the is the result for getting the proposal')
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const userApplication = async(id: string, formData: any)=>{
  try {
    const response = await axiosInstance.post(`/freelancer/application/${id}`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
       },
    })
    console.log(response,'this is the resoponse of the form submision')
    return response.data
  } catch (error) {
    return error
  }
}

export const addAddress = async(id: string | undefined, formData: any)=>{
  try {
    const response = await axiosInstance.post(`/addAddress/${id}`,formData)
    return response.data
  } catch (error) {
    return error
  }
}

export const rejectOrAccept = async(id: string, status: 'rejected' | 'approved')=>{
  try {
    const response = await axiosInstance.put(`/approveproposal/${id}`,{status})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const userLoggedOut = async() =>{
  try {
    const response = await axiosInstance.post(`/userlogout`)
    console.log(response, ' this is the response we got for logout')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const sendOffer = async(offerData: any, freelancerId: string, jobId: string,userId: string)=>{
  try {
   
    const response = await axiosInstance.post('/sendoffer',{offerData, freelancerId, jobId, userId})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getContractList = async(id: string | undefined)=>{
  try {
    const response = await axiosInstance.get(`/getcontracts/${id}`)
    return response.data
  } catch (error:any) {
    return error.response.data
  }
}

export const clientSignContract = async(hash: string, contractId: string, userId: string | undefined)=>{
  try {
    const result = await axiosInstance.post(`/signcontract`,{hash, contractId, userId}) 
    return result.data
 } catch (error: any) {
     return error.response.data
 }
}

export const initialPayment = async(data: {id:string, initialPayment: number, remainingPayment: number})=>{
  try {
    const response = await axiosInstance.post('/create-checkout-session',{data},{
      headers:{
        "Content-Type":'application/json'
      }
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}





