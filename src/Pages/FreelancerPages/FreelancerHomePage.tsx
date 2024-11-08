import React, { useEffect, useState } from 'react'
import FreelancerHome from '../../Components/FreelancerComponent/FreelancerHome'
import Navbar from '../../Components/FreelancerComponent/Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getUserInfo } from '../../Services/userServices/userAxiosCalls'
import { User } from '../../Types/userInterface'

const FreelancerHomePage = ()=> {

    const [ userData, setUserData] = useState<User | null>(null)
    const data: any = useSelector((state:RootState)=>state.user.userInfo)

    useEffect(()=>{
        const fetch = async()=>{
            let response = await getUserInfo(data?.userId)
            setUserData(response.data)
        }
    
       fetch()
    },[])   

  return (
    <>
    <Navbar />
    <FreelancerHome data = {userData}/>
    </>
  )
}

export default FreelancerHomePage
