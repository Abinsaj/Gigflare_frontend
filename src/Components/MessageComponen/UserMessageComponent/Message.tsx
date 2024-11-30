import React, { useState, useRef, useEffect } from 'react'
import { Skeleton } from "@nextui-org/react"
import { useGetMessage } from '../../../hooks/useGetMessage'
import Messages from './Messages'
import useListenMessages from '../../../hooks/useListenMessages'
import useConversation from '../../../zustand/useConverstation'

export default function Message() {

  const { messages, loading } = useGetMessage()
  console.log(messages, 'this is the messages we got here')
  const { selectedConversation } = useConversation()
  useListenMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedConversation])

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-4">
      <div className="max-w-5xl mx-auto space-y-2 md:space-y-4">
        {loading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!loading && messages.length === 0 && (
          <p className="text-center text-gray-500 text-sm md:text-base">
            Send a message to start a conversation
          </p>
        )}
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <Messages key={message._id} chat={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>
    </div>

  )
}

const MessageSkeleton = () => {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-2 md:gap-3">
      <div>
        <Skeleton className="flex rounded-full w-8 h-8 md:w-12 md:h-12" />
      </div>
      <div className="w-full flex flex-col gap-1 md:gap-2">
        <Skeleton className="h-2 md:h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-2 md:h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
}