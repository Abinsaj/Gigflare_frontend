import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useConversation from '../../../zustand/useConverstation'
import axiosInstance from '../../../config/userInstance'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { UserCircle } from 'lucide-react'
import useListenNotification from '../../../hooks/useListenNotification'
import useGetNotification from '../../../hooks/useGetNotification'

const Conversations = () => {

  const { id } = useParams()
  console.log(id)
  const { selectedConversation, setSelectedConversation } = useConversation()
  const user = useSelector((state: RootState) => state.user.userInfo)
  const [conversations, setConversations] = useState<any[]>([]);
  const userId = user?._id
  const isRequestInProgress = useRef(false);
  const { notifications } = useGetNotification()
  useListenNotification()

  console.log(notifications,'this is the notification we got here')

  const fetchConversations = async () => {
    try {
      const { data } = await axiosInstance.get(`/chat/conversations/${userId}`);

      setConversations(data);

      if (!selectedConversation && data.length > 0) {

        const storedConversation = JSON.parse(localStorage.getItem("selectedConversation") || "null");
        if (storedConversation) {
          setSelectedConversation(storedConversation);
        }
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };


  const createAndFetchConversation = async () => {
    if (id && userId) {
      try {
        console.log('its herererererererere')
        isRequestInProgress.current = true;
        console.log(id, userId, 'this is the iddss')
        const data = await axiosInstance.post('/chat/conversation', {
          userId,
          freelancerId: id,
        });

        await fetchConversations();

        setSelectedConversation(data.data);
      } catch (error) {
        console.error('Error creating conversation:', error);
      } finally {
        isRequestInProgress.current = false;
      }
    }
  };


  const handleSelectConversation = (conversation: any) => {
    console.log(conversation, 'this is the conversation')
    setSelectedConversation(conversation)
  }

  useEffect(() => {

    if (userId) {
      fetchConversations()
    }
  }, [userId])

  useEffect(() => {
    if (id && userId) {
      createAndFetchConversation();
    }
  }, [id, userId]);

  const conversationUnreadCounts = conversations.map((conversation: any) => {
    const otherParticipants = conversation.participants.find((p: any) => p._id !== userId)?._id
    console.log(otherParticipants,'this is the list other participants')
    const unreadMessages = notifications.filter(
      (notif: any) =>
        notif.type == 'message' &&
        notif.data.receiver == userId &&
        notif.data.sender == otherParticipants
    )

    console.log(unreadMessages,'this is the unread messages')
    return { participantId: otherParticipants, unreadCount: unreadMessages.length }
  })

  console.log(conversationUnreadCounts,'this is the unread counts')

  return (
    <div className='py-2 flex flex-col space-y-2'>
      {conversations.map((val) => {

        const otherParticipant = val.participants.find((p: any) => p._id !== userId)?._id
        const unreadCount = conversationUnreadCounts.find(
          (c) => c.participantId === otherParticipant
        )?.unreadCount || 0

        return (
          <button
            key={val.id}
            onClick={() => handleSelectConversation(val)}
            className={`w-full p-2 md:p-3 flex items-center space-x-2 md:space-x-3 rounded-md 
            ${selectedConversation?._id === val._id
                ? "bg-[#1AA805] text-gray-900"
                : "bg-gray-200 text-black hover:bg-gray-400"}`
            }

          >
            <UserCircle className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="text-xs md:text-sm font-medium text-gray-800 truncate">
                  {val.participants.map((participant: any) => {
                    if (participant._id !== userId) {
                      return <span key={participant._id}>{participant.name}</span>;
                    }
                    return null;
                  })}
                </p>
                <div className='pl-24'>
                {unreadCount > 0 && (
                  <span className="text-xs font-semibold bg-red-500 text-white rounded-full px-2 py-1">
                    {unreadCount}
                  </span>
                )}
                </div>
                
                <p className="text-xs text-gray-200"></p>
              </div>
              <p className="text-xs md:text-sm text-gray-500 truncate"></p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default Conversations
