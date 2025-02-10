import React, { useEffect, useState } from 'react'
import { Search, ChevronDown, Trash2 } from 'lucide-react'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import { getJobOffers } from '../../Services/freelancerService/freelancerAxiosCalls'
import ViewOffer from './ViewOffer'
import { OfferData } from '../UserComponent/JobOffer'
import { viewedNotification } from '../../Services/userServices/userAxiosCalls'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'


export default function JobOffers() {

    const { freelancer } = useFreelancer()
    const [offers,setOffers] = useState<OfferData[]>([])
    const [modalData, setModalData] = useState<any>(null)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const user = useSelector((state: RootState)=> state.user.userInfo)

    useEffect(()=>{
        
        const fetchData = async()=>{
            const response = await getJobOffers(freelancer?._id)
            setOffers(response)

            const result = await viewedNotification(user?._id, 'offer')
            console.log(result,' this is the result')
        }
        if(freelancer !== null){
            fetchData()
        }
    },[freelancer])

    const openModal = (value: any)=>{
        setModalOpen(true)
        setModalData(value)
    }
    const closeModal = ()=>{
        setModalOpen(false)
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">All Offers</h1>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4 sm:mb-6">
                    <div className="flex gap-4 sm:gap-8">
                        {/* <button className="pb-2 sm:pb-4 border-b-2 border-green-600 text-green-600 font-medium text-sm sm:text-base">
                            Active
                        </button> */}
                        {/* <button className="pb-2 sm:pb-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base">
                            Inactive
                        </button> */}
                    </div>
                </div>

                {/* Search and Sort */}
                {/* <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-4">
                
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">Sort by</span>
                        <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-sm">
                            Start date
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div> */}

                {/* Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full"> 
                            <thead className="bg-gray-50">
                                <tr className="text-xs sm:text-sm text-gray-500">
                                   
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">WORK</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">DESCRIPTION</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">BUDGET</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">FROM-DATE</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">TO-DATE</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">STATUS</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {offers.map((value: any)=>(

                                    <tr  className="border-b border-gray-200">
                                        <td className="py-3 px-5 sm:px-6  text-sm">{value.jobId.title.substring(0,20)}...</td>
                                        <td className="py-3 line-clamp-1 px-4 sm:px-6 text-sm">{value.jobId.description.substring(0,30)}...</td>
                                        <td className="py-3 px-1 sm:px-6 text-sm">₹{value.budget} </td>
                                        <td className="py-3 px-4 sm:px-3 text-sm">{new Date(value.fromDate).toLocaleDateString()}</td>
                                        <td className="py-3 px-4 sm:px-3 text-sm">{new Date(value.toDate).toLocaleDateString()}</td>
                                        <td className="py-3 px-4 sm:px-6">
                                            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                                              {value.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 sm:px-6">
                                            <button onClick={()=>openModal(value)} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm hover:bg-gray-100 flex items-center gap-1">
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                             
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {modalOpen && (

                <ViewOffer offer={modalData} closeModal = {closeModal}/>

            )}

        </div>
    )
}