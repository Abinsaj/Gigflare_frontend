import axios from 'axios'
import axiosInstance from '../../config/userInstance'

interface changePassword{
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
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




