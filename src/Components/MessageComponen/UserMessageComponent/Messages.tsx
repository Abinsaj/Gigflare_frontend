import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import useConversation from '../../../zustand/useConverstation'
import { extractTime } from '../../../config/extractTime'

const Messages = ({ chat }: { chat: any }) => {


  const user = useSelector((state: RootState)=> state.user.userInfo)
  const formattedTime = extractTime(chat.createdAt)
  const {selectedConversation} = useConversation()
  const fromMe = chat.sender === user?._id

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[80%] px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md text-sm md:text-base
          ${fromMe ? "bg-green-100 mr-2 rounded-br-none" : "bg-gray-100 ml-2 rounded-bl-none"}
          before:absolute before:bottom-0
          ${fromMe ? "before:right-[-8px] before:border-l-green-100" : "before:left-[-8px] before:border-r-gray-100"}
          before:border-b-transparent before:border-l-[8px] before:border-r-[8px] before:border-b-[8px]
        `}
      >
        <p className="text-gray-800 break-words">
          {chat.message}
        </p>
        <span className="text-gray-500 text-xs mt-1 float-right">
          {formattedTime}
        </span>
      </div>
    </div>
  )
}

export default Messages
