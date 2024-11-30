import axiosInstance from "../../config/userInstance"

export const getFreelancerDetails = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/admin/getFreelancerDetails/${id}`)
        console.log(response,'this is the response we got')
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const removeCategory = async(name: string)=>{
    try {
        const response = await axiosInstance.delete(`/admin/deletecategory/${name}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getJobList = async()=>{
    try {
      const result = await axiosInstance.get('/admin/joblist')
      console.log(result,'this is the result')
      return result.data
    } catch (error) {
      console.log(error)
    }
}

export const blockUnblockJob = async(id: string, status: string)=>{
    try {
        const result = await axiosInstance.post(`/admin/blockjob/${id}`,{status})
        return result.data
    } catch (error) {
        console.log(error) 
    }
}

export const activatejob = async(id: string | undefined)=>{
    try {
        const result = await axiosInstance.post('/admin/activatejob',{id})
        return result.data
    } catch (error) {
        console.log(error) 
    }
}






