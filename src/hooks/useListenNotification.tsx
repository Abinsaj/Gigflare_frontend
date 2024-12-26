import { useEffect } from "react"
import { useSocket } from "../context/SocketContext"
import useNotification from "../zustand/useNotification"

const useListenNotification = ()=>{
    const {socket} = useSocket()
    const {notifications,setNotifications} = useNotification()

    useEffect(()=>{
        socket?.on('notifications',(data)=>{
            setNotifications([...notifications,data])
        })

        return ()=>{
            socket?.off('notifications')
        }
    },[socket,notifications,setNotifications])
}

export default useListenNotification