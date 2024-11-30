import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import useConversation from "../zustand/useConverstation"

const useListenMessages = () => {
    const {socket} = useSocket()
    const {messages, setMessages} = useConversation();

    useEffect(()=>{
        socket?.on('newMessage',(newMessages)=>{
            setMessages([...messages,newMessages])
        })


        return ()=>{
            socket?.off('newMessage')
        }
    },[socket,setMessages,messages])

}

export default useListenMessages
