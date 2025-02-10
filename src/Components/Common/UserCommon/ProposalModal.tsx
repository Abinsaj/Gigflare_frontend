import React, { useEffect } from 'react'
import { X, MapPin, Clock, Camera, Star, CheckCircle, IndianRupeeIcon } from 'lucide-react'
import {timeAgo} from '../../../config/timeAgo'
import { rejectOrAccept } from '../../../Services/userServices/userAxiosCalls'
import { toast } from 'sonner'

interface Milestone {
    title: string
    description: string
    price: number
    status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'paid'
  }
  
  interface Proposal {
    _id: string
    jobId: string
    freelancerId: string
    coverLetter: string
    timeLine: string
    milestones: Milestone[]
    status: 'submitted' | 'approved' | 'rejected'
    totalBudget: number
    createdAt: string
    updatedAt: string
  }

  interface ProposalModalProps{
    proposal: Proposal,
    onClose: ()=>void,
    title: string,
    handleStatus: any
  }

const ProposalModal=({proposal, onClose ,title, handleStatus}:ProposalModalProps)=> {

    const getStatusColor = (status: Proposal['status']) => {
        switch (status) {
          case 'submitted':
            return 'text-yellow-600 bg-yellow-100'
          case 'approved':
            return 'text-green-600 bg-green-100'
          case 'rejected':
            return 'text-red-600 bg-red-100'
        }
      }
      useEffect(()=>{

      },[proposal.status])
    
    //   const getMilestoneStatusIcon = (status: Milestone['status']) => {
    //     switch (status) {
    //       case 'pending':
    //         return <Clock className="w-4 h-4 text-yellow-500" />
    //       case 'in_progress':
    //         return <Clock className="w-4 h-4 text-gray-500" />
    //       case 'completed':
    //         return <CheckCircle className="w-4 h-4 text-green-500" />
    //       case 'approved':
    //         return <CheckCircle className="w-4 h-4 text-green-700" />
    //       case 'paid':
    //         return <IndianRupeeIcon className="w-4 h-4 text-green-600" />
    //     }
    //   }

    console.log(proposal,'this is the proposal we got in the modal')

    const handleRejectApproval = async(id: string, status: 'rejected' | 'approved')=>{
        const result = await rejectOrAccept(id, status)
        if(result.success == true){
            toast.success(result.message)
            onClose()
            proposal.status = 'approved'
        }else{
            toast.success(result.message)
            onClose()
            handleStatus('rejected')
            proposal.status = 'rejected'
        }
    }

  return (
    <>
    {/* // Wrap the whole modal container with flex and h-full to make it fill the viewport height. */}
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white rounded-lg w-11/12 max-w-6xl flex flex-col h-full"> {/* Changed here */}
    {/* Modal Header */}
    <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
      <h2 className="text-2xl font-bold">Freelancer Proposal</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <X className="w-6 h-6" />
      </button>
    </div>

    {/* Modal Content: Made it scrollable */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6"> {/* Changed here */}
      {/* Proposal Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">Proposal for Job: {title}</h3>
          <p className="text-gray-600">Freelancer ID: {proposal.freelancerId}</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${getStatusColor(proposal.status)}`}>
          <span className="text-sm font-semibold">{proposal.status}</span>
        </div>
      </div>

      {/* Cover Letter */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Cover Letter</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{proposal.coverLetter}</p>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Timeline</h3>
        <p className="text-gray-700">{proposal.timeLine}</p>
      </div>

      {/* Total Budget */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Total Budget</h3>
        <p className="text-2xl font-bold text-green-600">₹{proposal.totalBudget}</p>
      </div>

      {/* Timestamps */}
      <div className="text-sm text-gray-500">
        <p>Last Updated: {timeAgo(proposal.updatedAt)}</p>
      </div>
    </div>

    {/* Footer Buttons */}
    <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end items-center space-x-4"> {/* Changed here */}
      {proposal.status === 'approved' && (
        <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          Sent Offer
        </button>
      )}
      {proposal.status === 'rejected' && (
        <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Rejected
        </button>
      )}
      {proposal.status === 'submitted' && (
        <>
          <button onClick={() => handleRejectApproval(proposal._id, 'rejected')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            Reject Proposal
          </button>
          <button onClick={() => handleRejectApproval(proposal._id, 'approved')} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Accept Proposal
          </button>
        </>
      )}
    </div>
  </div>
</div>

    </>
  )
}

export default ProposalModal
