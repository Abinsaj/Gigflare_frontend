import React, { useEffect, useState } from 'react'
import { ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getFreelancers } from '../../Services/userServices/userAxiosCalls'
import FreelancerModal from '../Common/UserCommon/FreelancerModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import LoadingSpinner from '../Common/LoadinSpinner'

export default function FreelancerListing() {
    const [freelancers, setFreelancers] = useState<any[]>([])
    const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageSize]= useState(4)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const userId = useSelector((state: RootState)=> state.user.userInfo?._id)
    const [loading, setLoading] = useState<boolean>(true)

    
    const fetchFreelancers = async (page = 1) => {
        try {
            const data = await getFreelancers(userId,page, pageSize)
            console.log(data, 'this is the data')
            setFreelancers(data.freelancerData)
            setTotalPage(data.totalPage)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }
    
    const handlePageChange = (page: number)=>{
        if(page > 0 && page <= totalPage){
            setCurrentPage(page)
            fetchFreelancers(page)
        }
    }

    useEffect(() => {
        
        fetchFreelancers()
    }, [])

    const openModal = (freelancer: any) => {
        setSelectedFreelancer(freelancer)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedFreelancer(null)
    }

    if(loading){
        return(
            <LoadingSpinner/>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1 className="text-2xl font-semibold mb-6">Explore some of GIGFLARE Freelancers</h1>

            {/* <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Filters:</span>
                    <div className="relative inline-block text-left">
                        <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Any Country
                            <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="relative inline-block text-left">
                        <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Any hourly rate
                            <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort By:</span>
                    <div className="relative inline-block text-left">
                        <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Most Relevant
                            <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {freelancers.map((freelancer: any, index: any) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col justify-between h-full"
                    >
                        <div className="p-4 flex-grow">
                            <div className="flex items-start space-x-4">
                                <img
                                    src={freelancer.profile}
                                    alt={freelancer.firstName}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {freelancer.firstName} {freelancer.lastName}
                                    </h2>
                                    <p className="text-sm text-gray-600">{freelancer.language}</p>

                                </div>
                            </div>
                            <div className="mt-4">
                                {freelancer.skills && freelancer.skills.length > 0 ? (
                                    freelancer.skills.map((skill: any, skillIndex: any) => (
                                        <span
                                            key={skillIndex}
                                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                        >
                                            {skill.name} 
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No skills have added.</p> 
                                )}
                            </div>
                            <div className="mt-4">
                                <p>{freelancer.description.substring(0,200)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-between items-end">
                            <button
                                className="text-green-600 font-semibold hover:text-green-700 focus:outline-none"
                                onClick={() => openModal(freelancer)}
                            >
                                View Profile
                            </button>
                            {freelancer.isTopRated && (
                                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="text-xs font-semibold text-yellow-800">TOP RATED</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-end justify-between mt-8">
                <div className="text-sm text-gray-500">
                    {currentPage} - {totalPage} page
                </div>
                <div className="flex items-center gap-2">
                    <button
                        
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft onClick={()=>handlePageChange(currentPage - 1)} className="h-4 w-4" />
                    </button>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-600 text-white">
                        1
                    </div>
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled={currentPage === totalPage}
                        >
                       
                        <ChevronRight  onClick={()=>handlePageChange(currentPage + 1)} className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {isModalOpen && selectedFreelancer && (
                <FreelancerModal freelancer={selectedFreelancer} onClose={closeModal} />
            )}
        </div>
    )
}