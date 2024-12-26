import { useEffect, useState } from "react"
import { getUserNotification } from "../Services/userServices/userAxiosCalls"
import { useSelector } from "react-redux"
import { RootState } from "../Redux/store"
import useNotification from "../zustand/useNotification"

const useGetNotification = () =>{

    const {notifications, setNotifications} = useNotification()
    const userInfo = useSelector((state: RootState)=>state.user.userInfo)

    useEffect(()=>{
        const getNotifications = async () => {
            try {
              const notif = await getUserNotification(userInfo?._id)

              let data = notif.data.filter((value: any)=>value.isRead == false)
              setNotifications(data)
            } catch (error) {
              console.log(error)
            }
        }
        if(userInfo)getNotifications()        
    },[userInfo])
      
    return {notifications}
}

export default useGetNotification