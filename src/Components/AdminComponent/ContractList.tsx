import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { User } from '../../Types/userInterface'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getContractList } from '../../Services/adminServices/adminAxiosCall'
import { useNavigate } from 'react-router-dom'
import { posted } from '../../config/timeAgo'



const ContractList = () => {

  const admin = useSelector((state:RootState)=>state.admin.adminInfo)
  console.log(admin,'qwertyui')
  const navigate = useNavigate()

  const [contractData, setContractData] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<"block" | "unblock">("block")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contracts = await getContractList()
        console.log(contracts.data,'yeah we got')
        setContractData(contracts.data)
      } catch (error) {
        toast.error('Failed to fetch user data')
      }
    }
    fetchData()
  }, [])

 
 

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
             
              <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contractData.map((value: any)=>(

              <tr >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{value.jobId.title.substring(0,30)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value.clientId.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value.freelancerId.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{posted(value.startDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{posted(value.endDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className='bg-green-300 text-gray-700 rounded-full py-1 px-1'>
                    {value.status}
                    </button>
                </td>
                
                <td className="px-6 py-4 text-end whitespace-nowrap text-sm font-medium">
                  <button onClick={()=>navigate('/viewcontract')} className="bg-[#003F62] hover:bg-[#002E62] text-white font-bold py-1 px-3 rounded ">
                    View Details
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
        <span className="text-sm text-gray-700">Page 1 of 3</span>
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003F62] hover:bg-[#002E62]">
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
             
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
                // onClick={handleConfirmAction}
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

export default ContractList