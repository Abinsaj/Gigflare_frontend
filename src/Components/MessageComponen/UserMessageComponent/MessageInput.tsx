import React, { useState } from 'react'
import { Paperclip,ImageIcon, Send } from 'lucide-react'
import {useSendMessage} from '../../../hooks/useSendMessage'
import useConversation from '../../../zustand/useConverstation'

const MessageInput=()=> {

    const [message, setMessage] = useState<any>("")
    const {loading, sendMessage} = useSendMessage()

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        if(!message)return;
        try {
          console.log(message,'yeah we got the message here')
          await sendMessage(message);
          setMessage("")
        } catch (error) {
          console.error("Failed to send message:", error);
        }
        
    }

  return (
    <div className="p-2 md:p-4 bg-gray-200 border-b rounded-t-md border-gray-200">
      <form className="flex items-center space-x-2 md:space-x-4" onSubmit={handleSubmit}>
        <button
          type="button"
          className="p-1 md:p-2 hover:bg-gray-200 rounded-full"
        >
        </button>
        <button
          type="button"
          className="p-1 md:p-2 hover:bg-gray-200 rounded-full"
        >
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name='message'
          placeholder="Write a message..."
          className="flex-1 px-3 py-1 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-full focus:outline-none focus:border-[#1AA803]"
        />
        <button
          type="submit"
          className="p-2 bg-[#1AA803] text-white rounded-full hover:bg-[#1AA803] disabled:opacity-50"
        >
          <Send className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
