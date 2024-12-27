import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import axiosInstance from '../../config/userInstance'
import { getDetails } from '../../Services/freelancerService/freelancerAxiosCalls'

  
  export interface Experience {
    categoryId: string;
    expertise: string;
    fromYear: string;
    toYear: string;
  }
  
  export interface Education {
    collageName: string;
    title: string;
    year: number;
    _id: string;
  }
  
  export interface Certification {
    name: string;
    year: number; 
    _id: string;
  }
  
  export interface Freelancer {
    _id: string;
    userId: string;
    applicationId: string;
    firstName: string;
    lastName: string;
    description: string;
    language: string;
    experience: Experience;
    skills: string[];
    education: Education[];
    certification: Certification[];
    certficatImage: string[]; 
    portfolio: string;
    email: string;
    profile: string;
    status: string;
    createdAt: string; 
    updatedAt: string;
    
  }

  interface FreelancerProviderProps {
    children: ReactNode;
  }
  export interface FreelancerContextType {
    freelancer: Freelancer | null;
  }
  

const FreelancerContext = createContext<FreelancerContextType|undefined>(undefined)

const FreelancerProvider:React.FC<FreelancerProviderProps>  = ({children})=>{

    const user = useSelector((state: RootState)=>state.user.userInfo)
    console.log(user)
    const [freelancer, setFreelancer] = useState<Freelancer | null>(null)
    const id = user?._id

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                if(id){
                  const response = await getDetails(id) 
                  console.log(response,'this is the response we got in the context')
                  setFreelancer(response)
                }
            } catch (error) {
                console.error('Error fetching freelancer details:', error);
            }
        }
        if(id !== null){
          fetchData()
        }
    },[user])

    return (
        <FreelancerContext.Provider value={{freelancer}}>
            {children}
        </FreelancerContext.Provider>
    )
}

export default FreelancerProvider

export const useFreelancer = () => {
    const context = useContext(FreelancerContext)
    if (!context) {
        throw new Error('useFreelancer must be used within a FreelancerProvider');
    }
    return context;
}