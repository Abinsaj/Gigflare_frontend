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
        return result.data.data
    } catch (error) {
        console.log(error) 
    }
}

export const getContractList = async()=>{
    try {
        const response = await axiosInstance.get('/admin/getcontracts')
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getSkills = async(page: number, pageSize: number)=>{
    try {
        const response = await axiosInstance.get(`/admin/getskills?page=${page}&limit=${pageSize}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const createSkills = async(data: any)=>{
    try {
        const response = await axiosInstance.post('/admin/skills',{data})
        console.log(response)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const blockUnblockSkills = async(id: string | undefined, status: 'unblock' | 'block')=>{
    try {
        const response = await axiosInstance.put('/admin/blockunblockskill',{id, status})
        console.log(response,'block unblock response')
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getAllTransactions = async()=>{
    try {
        const response = await axiosInstance.get('/admin/getalltransactions')
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getDashboardData = async()=>{
    try {
        const response = await axiosInstance.get('/admin/getdashboarddata')
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getGraphData = async(timeframe: "WEEKLY" | "MONTHLY" | "YEARLY")=>{
    try {
        const response = await axiosInstance.get(`/admin/getgraphdata/${timeframe}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}






