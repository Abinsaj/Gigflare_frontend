import React, { useEffect, useState } from 'react'
import { Heart, Star, ChevronLeft, ChevronRight, MessageCircle, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getProposals } from '../../Services/userServices/userAxiosCalls'
import FreelancerModal from '../Common/UserCommon/FreelancerModal'
import ProposalModal from '../Common/UserCommon/ProposalModal'
import LoadingSpinner from '../Common/LoadinSpinner'


const ApprovedProposal = () => {

    const location = useLocation()
    const jobData = location.state
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.user.userInfo)
    const [data, setData] = useState<any[]>([])
    const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)
    const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false)
    const [profileData, setProfileData] = useState<any>()
    const [proposalData, setProposalData] = useState<any>()
    const [status, setStatus] = useState<'submitted' | 'approved' | 'rejected' | ''>('')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProposals(jobData._id)
                console.log(response.data, 'this is the response we expect here')
                setData(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        fetchData()
    }, [])

    const openProfileModal = (data: any) => {
        setIsProfileModalOpen(true)
        setIsProposalModalOpen(false)  // Close proposal modal if it's open
        setProfileData(data)
    }

    const openProposalModal = (data: any) => {
        setIsProposalModalOpen(true)
        setIsProfileModalOpen(false)  // Close profile modal if it's open
        setProposalData(data)
    }

    console.log(data, jobData,'these are the datas we got herer......')

    const closeModal = () => {
        setIsProfileModalOpen(false)
        setIsProposalModalOpen(false)
        setProfileData(null)
        setProposalData(null)
    }

    const handleStatus = (status: 'submitted' | 'approved' | 'rejected') => {
        setStatus(status)
    }

    const handleSendOfferClick = (data: any) => {
        navigate('/sendoffer', { state: { data: data, job: jobData } });
    };


    const filteredData = data.filter(proposal => proposal.status === 'approved')

    if (loading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 min-h-screen py-8">
            <div className="relative flex-1">
                <h1 className="text-3xl font-semibold">Proposals</h1>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                    <button
                        onClick={() => navigate('/proposals', { state: jobData })}
                        className={'border-transparent text-gray-500'}

                    >
                        Proposals
                    </button>
                    <button
                        // onClick={() => setActiveView('approved')}
                        className={'border-green-600 text-green-600'}

                    >
                        Approved proposal
                    </button>
                    <button onClick={() => navigate('/joblist')} className="pb-4 flex text-gray-500 ml-auto">
                        <ArrowLeft /> Go Back
                    </button>
                </div>
            </div>


            {/* Search and Filters */}


            {/* Proposals List */}
            <div className="space-y-4">
                {filteredData.map((proposal: any) => (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start gap-6">
                                <img
                                    src={proposal.freelancer.photo}
                                    alt=""
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {proposal.freelancer.firstName} {proposal.freelancer.lastName}
                                            </h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < proposal.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                                <span className="text-sm text-gray-600 ml-1">
                                                    ({proposal.rating}) - {proposal.reviews}{" "}
                                                    {proposal.reviews === 1 ? "review" : "reviews"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button>
                                                <Heart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                        {proposal.freelancer.description}
                                    </p>
                                    <h4 className="mt-2 text-sm font-medium text-gray-900">
                                        {jobData.title}
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {/* View Profile Button */}
                                    <button
                                        onClick={() => openProfileModal(proposal.freelancer)}
                                        className="w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        View Profile
                                    </button>

                                    {/* Send Offer Button */}
                                    <button
                                        onClick={() => handleSendOfferClick(proposal)}
                                        className="w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Send Offer
                                    </button>

                                    {/* Message Button */}
                                    <button
                                        onClick={() => navigate(`/message/${proposal.userId}`)}
                                        className="w-32 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <MessageCircle className="w-4 h-4 inline-block mr-2" />
                                        Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-end justify-between mt-8">
                <div className="text-sm text-gray-500">
                    {/* 1 - {proposals.length} of {proposals.length} Proposals */}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-600 text-white">
                        1
                    </div>
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {isProfileModalOpen && profileData && (
                <FreelancerModal freelancer={profileData} onClose={closeModal} />
            )}

            {isProposalModalOpen && proposalData && (
                <ProposalModal proposal={proposalData} onClose={closeModal} title={jobData.title} handleStatus={handleStatus} />
            )}

        </div>
    )
}

export default ApprovedProposal