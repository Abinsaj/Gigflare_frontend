import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react'
import axios from 'axios'
import axiosInstance from '../../config/userInstance'
import { useNavigate } from 'react-router-dom'
import { posted } from '../../config/timeAgo'

const url = 'http://localhost:7070'

interface Freelancer {
  id: string
  name: string
  email: string
  status: 'pending' | 'accepted' | 'rejected'
  date: string
  isBlocked: boolean
}

export default function Freelancers() {
  const [freelancers, setFreelancers] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null)
  const [modalType, setModalType] = useState<'status' | 'block'>('status')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/getFreelancers`)
        console.log(response,'this is the response we get after fetching the freelancer')
        setFreelancers(response.data)
      } catch (error) {
        console.error('Error fetching freelancers:', error)
      }
    }
    fetchData()
  }, [])

  const openModal = (freelancer: Freelancer, type: 'status' | 'block') => {
    setSelectedFreelancer(freelancer)
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFreelancer(null)
  }

  

  const handleBlockToggle = async () => {
    if (freelancers) {
      try {
        let newBlockedStatus:any
        let email:any
        freelancers.map((freelancer)=>{
          newBlockedStatus = freelancer.isBlocked
          email = freelancer.email
        })
        
        await axiosInstance.put(`/admin/blockUser/${email}`, { isBlocked: newBlockedStatus })
        setFreelancers(freelancers.map(f =>
          f.email === email ? { ...f, isBlocked: newBlockedStatus } : f
        ))
        closeModal()
      } catch (error) {
        console.error('Error toggling freelancer block status:', error)
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Freelancers</h1>
      <p className="text-sm text-gray-600 mb-4">Home &gt; Freelancers</p>
      <div className="flex justify-end items-center mb-4">
        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
        <span className="text-sm text-gray-600">{posted(new Date())}</span>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {freelancers.map((freelancer) => (
              <tr key={freelancer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{freelancer.firstName} {freelancer.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{freelancer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                {freelancer.isBlocked ? 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-black">
                      Blocked
                    </span> : 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  bg-green-200 text-gray-600">
                      Active
                    </span>
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={()=>navigate(`/admin/freelancerdetails`,{state:{freelancer}})} className="bg-[#003F62] hover:bg-[#002E62] text-white font-bold py-1 px-3 rounded mr-2">
                    View Details
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                 
                  <button
                    className={`${freelancer.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-1 px-3 rounded`}
                    onClick={() => openModal(freelancer, 'block')}
                  >
                    {freelancer.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled>
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        {/* <span className="text-sm text-gray-700">Page 1 of 3</span> */}
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-[#003F62] hover:bg-[#002E62] text-white">
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>

      {isModalOpen && freelancers && (
        freelancers.map((freelancer)=>(
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            < div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modalType === 'status'
                  ? 'Change Status'
                  : `${freelancer.isBlocked ? 'Unblock' : 'Block'} Freelancer`}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

             
              <div>
                <p className="mb-4">
                  Are you sure you want to {freelancer.isBlocked ? 'unblock' : 'block'} this freelancer?
                </p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 ${freelancer.isBlocked
                        ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-white'
                        : 'bg-gradient-to-r from-rose-400 to-red-500 text-white'
                      } rounded`}
                    onClick={handleBlockToggle}
                  >
                    Confirm
                  </button>
                </div>
              </div>

          </div>
        </div>
        ))
        
      )}

    </div>
  )
}