import React from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversations'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="w-full md:w-80 bg-white border-gray-200 flex flex-col h-full md:h-screen">
      <div className="p-4 border-b border-gray-200 h-full">
        <div className='flex items-center'>
          <button onClick={handleGoBack} className="p-2"><ArrowLeft /></button>
          <h1 className="text-xl md:text-2xl pl-2 md:pl-4 font-bold">Messages</h1>
        </div>

        <Searchinput />
        <div className='divider px-3 my-4'></div>
        <div className="p-2 border shadow-lg mt-5 rounded-lg h-[calc(200vh-300px)] md:h-[calc(100vh-240px)] overflow-y-auto">
          <button className="w-full text-center px-4 py-2 rounded-md text-sm font-medium mb-4">
            All conversations
          </button>
          <Conversations />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
