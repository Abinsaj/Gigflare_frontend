// import React, { useEffect, useState } from 'react'
// import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react'
// import axios from 'axios'

// const url = 'http://localhost:7070'

// interface Freelancer {
//   id: string
//   name: string
//   email: string
//   status: 'pending' | 'accepted' | 'rejected'
//   date: string
//   isBlocked: boolean
// }

// export default function Freelancers() {
//   const [freelancers, setFreelancers] = useState<Freelancer[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null)
//   const [modalType, setModalType] = useState<'status' | 'block'>('status')

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${url}/admin/getfreelancer`)
//         setFreelancers(response.data)
//       } catch (error) {
//         console.error('Error fetching freelancers:', error)
//       }
//     }
//     fetchData()
//   }, [])

//   const openModal = (freelancer: Freelancer, type: 'status' | 'block') => {
//     setSelectedFreelancer(freelancer)
//     setModalType(type)
//     setIsModalOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setSelectedFreelancer(null)
//   }

//   const handleStatusChange = async (newStatus: 'pending' | 'accepted' | 'rejected') => {
//     if (selectedFreelancer) {
//       try {
//         await axios.put(`${url}/admin/updatefreelancerstatus/${selectedFreelancer.id}`, { status: newStatus })
//         setFreelancers(freelancers.map(f => 
//           f.id === selectedFreelancer.id ? { ...f, status: newStatus } : f
//         ))
//         closeModal()
//       } catch (error) {
//         console.error('Error updating freelancer status:', error)
//       }
//     }
//   }

//   const handleBlockToggle = async () => {
//     if (selectedFreelancer) {
//       try {
//         const newBlockedStatus = !selectedFreelancer.isBlocked
//         await axios.put(`${url}/admin/togglefreelancerblock/${selectedFreelancer.id}`, { isBlocked: newBlockedStatus })
//         setFreelancers(freelancers.map(f => 
//           f.id === selectedFreelancer.id ? { ...f, isBlocked: newBlockedStatus } : f
//         ))
//         closeModal()
//       } catch (error) {
//         console.error('Error toggling freelancer block status:', error)
//       }
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-2">Freelancers</h1>
//       <p className="text-sm text-gray-600 mb-4">Home &gt; Freelancers</p>
//       <div className="flex justify-end items-center mb-4">
//         <Calendar className="w-4 h-4 mr-2 text-gray-600" />
//         <span className="text-sm text-gray-600">Oct 11,2023 - Nov 11,2022</span>
//       </div>
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {freelancers.map((freelancer) => (
//               <tr key={freelancer.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{freelancer.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{freelancer.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     freelancer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     freelancer.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {freelancer.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{freelancer.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button 
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
//                     onClick={() => openModal(freelancer, 'status')}
//                   >
//                     Change Status
//                   </button>
//                   <button 
//                     className={`${freelancer.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-1 px-3 rounded`}
//                     onClick={() => openModal(freelancer, 'block')}
//                   >
//                     {freelancer.isBlocked ? 'Unblock' : 'Block'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled>
//           <ChevronLeft className="w-5 h-5 mr-2" />
//           Previous
//         </button>
//         <span className="text-sm text-gray-700">Page 1 of 3</span>
//         <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
//           Next
//           <ChevronRight className="w-5 h-5 ml-2" />
//         </button>
//       </div>

//       {isModalOpen && selectedFreelancer && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//           <div className="bg-white p-5 rounded-lg shadow-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">
//                 {modalType === 'status' ? 'Change Status' : `${selectedFreelancer.isBlocked ? 'Unblock' : 'Block'} Freelancer`}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             {modalType === 'status' ? (
//               <div>
//                 <p className="mb-4">Current status: <span className="font-semibold">{selectedFreelancer.status}</span></p>
//                 <div className="flex justify-around">
//                   <button 
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleStatusChange('pending')}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleStatusChange('accepted')}
//                   >
//                     Accept
//                   </button>
//                   <button 
//                     className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleStatusChange('rejected')}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <p className="mb-4">Are you sure you want to {selectedFreelancer.isBlocked ? 'unblock' : 'block'} this freelancer?</p>
//                 <div className="flex justify-end">
//                   <button 
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     className={`${selectedFreelancer.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white font-bold py-2 px-4 rounded`}
//                     onClick={handleBlockToggle}
//                   >
//                     Confirm
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }