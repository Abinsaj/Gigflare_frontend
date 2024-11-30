import { useEffect, useState } from "react"
import useConversation from "../zustand/useConverstation"
import axiosInstance from "../config/userInstance"
import { useSelector } from "react-redux"
import { RootState } from "../Redux/store"
import { toast } from "sonner"
import { useFreelancer } from "../context/FreelancerContext/FreelancerData"

const useGetMessage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {messages, setMessages, selectedConversation} = useConversation()
    const user = useSelector((state:RootState)=>state.user.userInfo)

    useEffect(()=>{
        const getMessage = async()=>{
            setLoading(true)
            try {
                const userId = user?._id
                const conversationId = selectedConversation._id
                const data = await axiosInstance.get(`/chat/message/${conversationId}`)
                console.log(data,'this is the data we got after senidng the messsages')
                setMessages(data.data)
            } catch (error: any) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id)getMessage()
    },[selectedConversation?._id, setMessages])

    return {messages,loading}
}

const useGetFreelancerMessage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {messages, setMessages, selectedConversation} = useConversation()
    const {freelancer} = useFreelancer()

    useEffect(()=>{
        const getMessage = async()=>{
            setLoading(true)
            try {
                const userId =  selectedConversation.sender._id
                const freelancerId = freelancer?._id
                const data = await axiosInstance.post(`/chat/freelancermessage`,{freelancerId,userId})
                console.log(data,'we got he message like this')
                setMessages(data.data)
            } catch (error: any) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id)getMessage()
    },[selectedConversation?._id, setMessages])

    return {messages,loading}
}

export { useGetMessage, useGetFreelancerMessage }
