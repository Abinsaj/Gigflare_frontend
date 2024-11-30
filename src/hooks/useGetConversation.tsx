// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../config/userInstance';
// import { toast } from 'sonner';
// import { useSelector } from 'react-redux';
// import { RootState } from '../Redux/store';

// const useGetConversation = () => {

//     const [loading, setLoading] = useState<boolean>(false);
//     const [conversations, setConversations] = useState([]);
//     const user = useSelector((state: RootState)=>state.user.userInfo)
//     const id = user?._id

//     useEffect(()=>{
//         const getConversation = async () => {
//             setLoading(true)
//             try {
//                 const data: any = await axiosInstance.get(`/chat/conversations/${id}`)
//                 console.log(data,'this is what we got from the backend')
//                 setConversations(data.data)
//             } catch (error:any) {
//                 toast.error(error.message)
//             }finally{
//                 setLoading(false)
//             }
//         }
//         getConversation()
//     },[])

//   return {loading, conversations}
// }

// export default useGetConversation
