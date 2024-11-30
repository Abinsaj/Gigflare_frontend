import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const MessageLayout=()=> {
  return (
    <div className='flex flex-col md:flex-row h-screen w-full rounded-lg overflow-hidden bg-white'>
    <Sidebar />
    <MessageContainer />
  </div>
  )
}

export default MessageLayout
