import React, { useEffect, useRef } from 'react'
import { Phone, Video,MessageSquareCodeIcon } from 'lucide-react'
import MessageInput from './MessageInput'
import useConversation from '../../../zustand/useConverstation'
import Message from './Message'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'

interface Message {
    id: string
    text: string
    sender: string
    timestamp: string
  }
  
  interface MessageDisplayProps {
    messages: Message[]
    currentUser: {
      name: string
      avatar: string
    }
  }


const MessageContainer=()=> {

  const {selectedConversation, setSelectedConversation} = useConversation()
  const user = useSelector((state: RootState)=> state.user.userInfo)
  const userId = user?._id

  useEffect(()=>{
    return ()=> setSelectedConversation(null)
  },[])

    return (
      <div className="flex-1 flex flex-col shadow-lg border border-gray-200 rounded-md mt-2 mb-4 md:mt-5 mx-2 md:mr-5">
      {selectedConversation ? (
        <>
          <div className="h-16 px-4 border-b border-gray-300 flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-4">
              <img
                src=""
                alt=""
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
              />
              <h2 className="text-base md:text-lg font-medium truncate">
                {selectedConversation.participants.map((user: any) => {
                  if (user._id === userId) {
                    return null;
                  }
                  return user.name;
                })}
              </h2>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-1 md:p-2 hover:bg-gray-100 rounded-full">
                {/* Placeholder for an icon */}
              </button>
              <button className="p-1 md:p-2 hover:bg-gray-100 rounded-full">
                {/* Placeholder for an icon */}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <Message />
          </div>

          <MessageInput />
        </>
      ) : (
        <NoMessageSelected />
      )}
    </div>
    );
    
}

export default MessageContainer

const NoMessageSelected = ()=>{
  const user = useSelector((state: RootState)=> state.user.userInfo)
    return(
      <div className='flex items-center justify-center w-full h-full p-4'>
      <div className='text-center text-sm md:text-lg text-gray-900 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome {user?.name}</p>
        <p>Select a chat to start messaging</p>
        <MessageSquareCodeIcon className='text-2xl md:text-4xl lg:text-6xl'/>
      </div>
    </div>
    )
}
