import axiosInstance from "../../config/userInstance";

interface IMilestone{ 
    _id?: string | undefined,
    title: string,
    description: string,
    price: string;
    status?: 'pending' | 'in_progress' | 'completed' | 'approved' | 'paid' | undefined
  }
  
  interface IProposal {
    coverLetter: String;
    timeLine: String;
    milestones?: IMilestone[];
    totalBudget: String;
  }
  

export const getDetails = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getDetails/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getJobList = async(id: string|undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getJobDetails/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const createProposal = async(data: IProposal, userId: string | undefined, jobId: string, freelancerId: string | undefined)=>{
    try {
        const response = await axiosInstance.post('/freelancer/proposal',{ data, userId, jobId, freelancerId })
        console.log(response,'this is the response we got for creating the proposal')
        return response.data
    } catch (error) {
        console.log(error)
    }
}  

export const getProposals = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getproposals/${id}`)
        console.log(response,'this is the respponse for proposals')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getJobOffers = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getjoboffer/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}   

export const acceptRejectOffer = async(data:any)=>{
    try {
        const response = await axiosInstance.post('/freelancer/acceptjoboffer',{data})
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getContracts = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getcontracts/${id}`)
        console.log(response.data.data,'this is what we got as the actual response')
        return response.data.data
    } catch (error: any) {
        return error.response
    }
}

export const freelancerSignContract = async(hash: any, contractId: string, freelancerId: string | undefined)=>{
    try {
       const result = await axiosInstance.post(`/freelancer/signcontract`,{hash, contractId, freelancerId}) 
       return result.data
    } catch (error: any) {
        return error.response.data
    }
}

export const statusUpdate = async(id: string, status: 'submitted' | 'termination_requested')=>{
    try {
        const result = await axiosInstance.post(`/freelancer/statuschange/${id}`,{status})
        return result.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const updateFreelancer = async(data: any)=>{
    try {
        
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const deleteProposal = async(id: string)=>{
    try {
        const response = await axiosInstance.post(`/freelancer/deleteproposal/${id}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getFreelancerNotification = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/notifications/${id}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const updateFreelancerProfile = async(id: string, formData: any)=>{
    try {
        const response = await axiosInstance.post( `/freelancer/updateprofile/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
             },
          })
        console.log(response)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getWorkHistory = async(id: string)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getworkhistory/${id}`)
        console.log(response)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getSkillsByCategory = async(id: string)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/getskills/${id}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getFilteredJobList = async(userId: string, filter: { category?: string; experience?: string; duration?: string }, query?: string)=>{
    try {
        const params = new URLSearchParams({userId,...filter, ...(query && {query})}).toString()
        const response = await axiosInstance.get(`/freelancer/filteredjob?${params}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getFreelancerDashDetails = async(id: string | undefined)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/dashboarddata/${id}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}

export const getRatingAndReview = async(id: string)=>{
    try {
        const response = await axiosInstance.get(`/freelancer/ratingreview/${id}`)
        return response.data
    } catch (error: any) {
        if(error.response.data){
            return error.response.data
        }
        console.log(error)
    }
}