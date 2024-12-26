import React, { useState } from 'react'
import { Calendar, IndianRupee, Info, Check, HelpCircle,X } from 'lucide-react'
import { acceptRejectOffer } from '../../Services/freelancerService/freelancerAxiosCalls'
import { toast } from 'sonner'


interface ViewOfferProps{
    work: any
    closeModal: ()=>void
}

const ViewWork = ({work, closeModal}:ViewOfferProps) => {


  return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white rounded-lg w-11/12 max-w-6xl h-screen overflow-y-auto">
    <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-bold">{work.jobId.title}</h1>
      <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
        <X className="h-6 w-6" />
      </button>
    </div>

    <div className="p-6">
      <div className="space-y-8">

        {/* Job Description */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <p>{work.jobId.description}</p>
        </div>

        {/* Freelancer and Client Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Freelancer Information</h2>
          <p>
            <strong>Name:</strong> {work.freelancerId.firstName} {work.freelancerId.lastName}
          </p>
          <p>
            <strong>Email:</strong> {work.freelancerId.email}
          </p>
          <p>
            <strong>Phone:</strong> {work.freelancerId.phone}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Client Information</h2>
          <p>
            <strong>Name:</strong> {work.clientId.name}
          </p>
          <p>
            <strong>Email:</strong> {work.clientId.email}
          </p>
        </div>

        {/* Budget and Payment */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Budget and Payment</h2>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="text-gray-700 font-medium">Total Payment</h3>
              <p className="text-sm text-gray-500">Total amount for the project</p>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-medium">₹{work.totalBudget}</span>
            </div>
          </div>
          <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg mt-4">
            <div>
              <h3 className="text-gray-700 font-medium">You Received</h3>
              <p className="text-sm text-gray-500">The amount after platform fee</p>
            </div>
            <span className="text-xl font-semibold text-green-600">₹{work.totalEarnings}</span>
          </div>
          <p className="text-gray-700 mt-6">
            <strong>Payment Status:</strong> {work.paymentStatus}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Timeline</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Started Date:</p>
              <div className="flex items-center mt-1">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>{new Date(work.startDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <p className="font-medium">End Date:</p>
              <div className="flex items-center mt-1">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>{new Date(work.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
          <ul className="list-disc list-inside space-y-2">
            {work.terms.map((term: , index) => (
              <li key={index} className="text-gray-600">
                {term}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default ViewWork
