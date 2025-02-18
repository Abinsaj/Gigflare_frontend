import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import axios from 'axios'
// import axiosInstance from '../../config/userInstance'
import { User } from '../../Types/userInterface'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { posted } from '../../config/timeAgo'
import axiosInstance from '../../config/userInstance'

const url = 'http://localhost:7070'

const UsersList = () => {

  const admin = useSelector((state:RootState)=>state.admin.adminInfo)
  console.log(admin,'qwertyui')
  const [currentPage,setCurrentPage] = useState(1)
  const [ totalPage, setTotalPage] = useState(1)
  const [pageSize] = useState(7)
  const [userData, setUserData] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<"block" | "unblock">("block")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const fetchData = async (page = 1) => {
    try {
      const userList = await axiosInstance.get(`/admin/getUsers?page=${page}&limit=${pageSize}`,{withCredentials:true})
      console.log(userList.data, ' this is the users list') 
      const data = userList.data
      setUserData(data.user)
      setTotalPage(data.totalPages)
    } catch (error) {
      toast.error('Failed to fetch user data')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handlePageChange = (newPage: number)=>{
    console.log('its herereerererererereerer')
    if(newPage > 0 && newPage <= totalPage){
      console.log('its inside the function')
      setCurrentPage(newPage)
      fetchData(newPage)
    }
  }

  const handleBlockUnblock = (user: User, action: "block" | "unblock") => {
    setSelectedUser(user)
    setModalAction(action)
    setShowModal(true)
  }

  const handleConfirmAction = async () => {
    if (!selectedUser) return

    try {
      console.log(selectedUser)
      const response = await axiosInstance.put(`/admin/blockUser/${selectedUser.email}`, {
        isBlocked: modalAction === "block"
      },{withCredentials:true})

      if (response.data.success) {
        setUserData(userData.map(user => 
          user.email === selectedUser.email 
            ? { ...user, isBlocked: modalAction === "block" } 
            : user
        ))
        toast.success(`User ${modalAction === "block" ? "blocked" : "unblocked"} successfully`)
      } else {
        toast.error(`Failed to ${modalAction} user`)
      }
    } catch (error) {
      toast.error(`Error: Failed to ${modalAction} user`)
    }

    setShowModal(false)
    setSelectedUser(null)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Users</h1>
      <p className="text-sm text-gray-600 mb-4">Home &gt; Users</p>
      <div className="flex justify-end items-center mb-4">
        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
        <span className="text-sm text-gray-600">{posted(new Date())}</span>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.NO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          {userData && userData.length > 0 && (

          <tbody className="bg-white divide-y divide-gray-200">
            {userData?.map((user,index) => (
              <tr key={user.userId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isBlocked ? 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-black">
                      Blocked
                    </span> : 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-gray-700">
                      Active
                    </span>
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="bg-[#003F62] hover:bg-[#002E62] text-white font-bold py-1 px-3 rounded mr-2">
                    View Details
                  </button>
                </td>
                <td className='items-end justify-end'>
                  {user.isBlocked ?
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleBlockUnblock(user, "unblock")}
                    >
                      Unblock
                    </button> :
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleBlockUnblock(user, "block")}
                    >
                      Block
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={()=>handlePageChange(currentPage - 1)}
          className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
            currentPage == 1 ? 'text-white bg-[#003F62] hover:bg-[#002E62]':'text-white bg-[#003F62]'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPage} of {totalPage}</span>
        <button
          onClick={()=>handlePageChange(currentPage + 1)}
          className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
          currentPage == 1 ? 'text-white bg-[#003F62] hover:bg-[#002E62]':'text-white bg-[#003F62]'
        }`}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalAction === "block" ? "Block User" : "Unblock User"}
            </h2>
            <p className="mb-4">
              Are you sure you want to {modalAction} this user?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 ${
                  modalAction === "block"
                    ? "bg-gradient-to-r from-rose-400 to-red-500 text-white"
                    : "bg-gradient-to-r from-lime-400 to-lime-500 text-white"
                } rounded`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersList