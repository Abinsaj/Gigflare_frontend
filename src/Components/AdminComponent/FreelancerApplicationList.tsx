
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import axios from 'axios'
import { updateApplication } from '../../Redux/actions/adminAction'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/store'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { posted } from '../../config/timeAgo'
import axiosInstance from '../../config/userInstance'

const url = 'http://localhost:7070'

interface Freelancer {
  id: string
  applicationId: string
  firstName: string
  lastName: string
  email: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  isBlocked: boolean
}

export default function FreelancerApplications() {

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [pageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPage] = useState(1)

  const fetchData = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/admin/getfreelancerapplications?page=${page}&limit=${pageSize}`)
      console.log(response.data.data)
      setFreelancers(response.data.data.freelancer)
      setTotalPage(response.data.data.totalPages)
    } catch (error) {
      console.error('Error fetching freelancer applications:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handlePageChange = (currentPage: number)=>{
    if(currentPage > 0 && currentPage <= totalPages){
      setCurrentPage(currentPage)
      fetchData(currentPage)
    }
  }

  const handleStatusChange = async (applicationId: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    try {
      const response =  await dispatch(updateApplication({applicationId, newStatus}))
      console.log(response,'this  is the response')
      setFreelancers(freelancers.map(f => 
        f.applicationId === applicationId ? { ...f, status: newStatus } : f
      ))
    } catch (error:any) {
      toast.error('Error updating freelancer status:', error)
    }
  }

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-2">Freelancer Applications</h1>
      <p className="text-sm text-gray-600 mb-4">Home &gt; Freelancer Applications</p>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {freelancers && freelancers.length > 0 && (

            freelancers.map((freelancer) => (
              <tr key={freelancer.applicationId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${freelancer.firstName} ${freelancer.lastName}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{freelancer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    freelancer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    freelancer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {freelancer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(freelancer.createdAt).toLocaleDateString()}</td>
                <td className=''>
                  <button className='px-4 py-2 border rounded-md bg-[#003F62] text-white' onClick={()=>navigate(`/admin/freelancerdetails`,{state:{freelancer}})}>View Details</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    className="mt-1  w-4/5 py-2 px-3   bg-gray-50 rounded-2xl shadow-sm focus:outline-none "
                    value={freelancer.status}
                    onChange={(e) => handleStatusChange(freelancer.applicationId, e.target.value as 'pending' | 'accepted' | 'rejected')}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
                <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center px-4 py-2 border ${
                                currentPage === 1 ? "bg-gray-300" : "bg-white"
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Previous
                        </button>
                    <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center px-4 py-2 border ${
                                currentPage === totalPages ? "bg-gray-300" : "bg-white"
                            }`}
                        >
                            Next
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                </div>
    </div>
  )
}