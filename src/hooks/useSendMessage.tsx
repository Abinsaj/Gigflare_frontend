import React, { useState } from 'react'
import useConversation from '../zustand/useConverstation'
import { toast } from 'sonner';
import axiosInstance from '../config/userInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useFreelancer } from '../context/FreelancerContext/FreelancerData';

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {messages, setMessages, selectedConversation} = useConversation();
  const userId: any= useSelector((state:RootState)=> state.user.userInfo?._id)
  let otherId: any
  selectedConversation.participants.map((val:any)=>{
    if(val._id !== userId){
      otherId = val._id
    }
  })

  const sendMessage = async(message: any)=>{
    setLoading(true)
    try {
        const data = await axiosInstance.post(`/chat/send/${otherId}`,{message, userId})
        console.log(data,'this the send message response we got in the backend')
        if(data){
            setMessages([...messages, data.data])
        }
    } catch (error: any) {
       toast.error(error.Message) 
    }finally{
        setLoading(false) 
    }
  }

  return {loading,sendMessage}

}


const useSendFreelancersMessage = ()=>{
  const [loading, setLoading] = useState<boolean>(false)
  const {messages, setMessages, selectedConversation} = useConversation();
  const {freelancer} = useFreelancer()

  const sendFreelancersMessage = async(message: any)=>{
    setLoading(true)
    try {
      console.log(selectedConversation)
      const id = freelancer?._id
      console.log(id,'this is the freelancer id')
        const data = await axiosInstance.post(`/chat/freelancersend/${selectedConversation.sender._id}`,{message,id})
        console.log(data,'ewe got hte data data data')
        if(data){
            setMessages([...messages, data.data])
        }
    } catch (error: any) {
       toast.error(error.Message) 
    }finally{
        setLoading(false) 
    }
  }

  return {loading,sendFreelancersMessage}

}

export {useSendMessage,useSendFreelancersMessage}
