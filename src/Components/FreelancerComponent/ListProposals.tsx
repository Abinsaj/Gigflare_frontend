import React, { useEffect, useState } from 'react'
import { Search, ChevronDown, Trash2 } from 'lucide-react'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import { getProposals } from '../../Services/freelancerService/freelancerAxiosCalls'


export default function ProposalsList() {

    const { freelancer } = useFreelancer()
    const id = freelancer?._id
    const [proposals, setProposals] = useState<any[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getProposals(id)
            setProposals(response)
        }
        if(id !== undefined){
            fetchData()
        }
    },[id])

    const deleteProposal = async(id: string)=>{
        if(id == null) return
        try {
            const response = await deleteProposal(id)
        } catch (error) {
            
        }
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">All Proposals</h1>

                {/* Tabs */}
                {/* <div className="border-b border-gray-200 mb-4 sm:mb-6">
                    <div className="flex gap-4 sm:gap-8">
                        <button className="pb-2 sm:pb-4 border-b-2 border-green-600 text-green-600 font-medium text-sm sm:text-base">
                            Active
                        </button>
                        <button className="pb-2 sm:pb-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base">
                            Inactive
                        </button>
                    </div>
                </div> */}

                {/* Search and Sort */}
                {/* <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-4">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search by client or company name"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
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
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">PROPOSAL</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">BUDGET</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">TIMELINE</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">STATUS</th>
                                    <th className="text-left py-3 px-4 sm:px-6 font-medium">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposals.length > 0 &&
                                proposals.map((proposal: any) => (
                                    <tr key={proposal.id} className="border-b border-gray-200">
                                        <td className="py-3 px-4 sm:px-6 text-sm">{proposal.jobId.title.substring(0,30)}...</td>
                                        <td className="py-3 line-clamp-1  px-4 sm:px-6 text-sm">{proposal.coverLetter.substring(0,35)}....</td>
                                        <td className="py-3 px-4 sm:px-6 text-sm">₹ {proposal.totalBudget}</td>
                                        <td className="py-3 px-4 sm:px-3 text-sm">{proposal.timeLine}</td>
                                        <td className="py-3 px-4 sm:px-6">
                                            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                                                {proposal.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 sm:px-6">
                                            <button onClick={()=>deleteProposal(proposal._id)} className="px-2 sm:px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm hover:bg-red-200 flex items-center gap-1">
                                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}