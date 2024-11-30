import React, { useState } from 'react'
import { Calendar, IndianRupee, Info, Check, HelpCircle,X } from 'lucide-react'
import { acceptRejectOffer } from '../../Services/freelancerService/freelancerAxiosCalls'
import { toast } from 'sonner'

interface OfferData {
    
    termsAccepted: boolean
}
interface ViewOfferProps{
    offer: any
    closeModal: ()=>void
}

const ViewOffer = ({offer, closeModal}:ViewOfferProps) => {

    const [offerData, setOfferData] = useState<OfferData>({
        termsAccepted: false
    })
    const [offerStatus, setOfferStatus] = useState(offer.status);
    
    
    
    
    const handleSubmit = async( status: 'accepted' | 'rejected') => {
        

        const payload = {
            ...offer,
            termsAccepted: offerData.termsAccepted,
            termsAndConditions: [
                "Confidentiality: You must keep all project details and information confidential.",
                "Ownership: All deliverables will become the property of the client upon receipt of final payment.",
                "Termination: Either party may terminate the contract with prior written notice.",
                "Communication: Weekly updates are required."
            ],
            status,
        };
        try {
            const data = await acceptRejectOffer(payload)
            if(data.success == true){
                toast.success(data.message)
                setOfferStatus(status)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            
        }
    }

  return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-6xl h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
              <h1 className="text-2xl font-bold">{offer.jobId.title}</h1>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <form  className="space-y-8">
                {/* Job Description */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <p className="mb-4">{offer.jobId.description}</p>
                  {/* <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Building front-end features using React.js.</li>
                    <li>Developing back-end services with Node.js.</li>
                    <li>Integrating payment gateways and ensuring robust security measures.</li>
                  </ul>
                  <p className="font-semibold">Out of Scope:</p>
                  <ul className="list-disc list-inside">
                    <li>Marketing and promotion of the platform.</li>
                  </ul> */}
                </div>

                {/* Budget and Payment */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Budget and Payment</h2>
                  
                  {/* Payment Terms */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Option</h3>
                      <div className="space-y-4">
                        <label className="flex items-start space-x-3">
                          
                          <div>
                            <span className="text-gray-700 font-medium">By project</span>
                            <p className="text-gray-500 text-sm">Get your entire payment at the end, when all work has been delivered.</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="space-y-4 mt-8">
                      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                        <div>
                          <h3 className="text-gray-700 font-medium">Total Payment</h3>
                          <p className="text-sm text-gray-500">Total amount for the project</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-medium">₹{offer.budget}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-gray-700 font-medium">Platform Fee</span>
                          <HelpCircle className="h-4 w-4 text-gray-400 ml-2" />
                        </div>
                        <span className="text-gray-700">-₹{offer.platformFee}</span>
                      </div>

                      <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                        <div>
                          <h3 className="text-gray-700 font-medium">You'll Receive</h3>
                          <p className="text-sm text-gray-500">The estimated amount you'll receive after service fees</p>
                        </div>
                        <span className="text-xl font-semibold text-green-600">₹{offer.budget-offer.platformFee}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="font-medium mb-2">Payment Schedule:</p>
                      <ul className="list-disc list-inside pl-4 space-y-2 text-gray-600">
                        <li>Upfront Payment: 25% (While contract signing)</li>
                        <li>Final Delivery Payment: 75% (project completion day)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Timeline</h2>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Start Date:</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{new Date(offer.fromDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">End Date:</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{new Date(offer.toDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li><span className="font-medium">Confidentiality:</span> You must keep all project details and information confidential.</li>
                    <li><span className="font-medium">Ownership:</span> All deliverables will become the property of the client upon receipt of final payment.</li>
                    <li><span className="font-medium">Termination:</span> Either party may terminate the contract with prior written notice.</li>
                    <li><span className="font-medium">Communication:</span> Weekly updates are required.</li>
                  </ul>
                </div>

                {/* Acceptance */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Offer Acceptance</h2>
                  <p className="mb-4">Please acknowledge acceptance of this offer by November 24, 2024.</p>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={offerData.termsAccepted}
                      onChange={(e) => setOfferData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I have read and agree to the terms and conditions
                    </span>
                  </label>
                  {offerStatus == 'pending' ? (
                    <>
                    <button
                    type="submit"
                    onClick={()=>handleSubmit('accepted')}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={!offerData.termsAccepted}
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Accept Offer
                  </button>
                  <button
                    type="submit"
                    onClick={()=>handleSubmit('rejected')}
                    className="w-full px-6 py-3 mt-3 bg-red-600 text-black rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                
                  >
                    <X  className="h-5 w-5 mr-2" />
                    Reject Offer
                  </button>
                    </>
                  ):(
                    <button
                    disabled
                    className={`w-full px-6 py-3 ${
                      offerStatus === 'accepted' ? 'bg-green-500' : 'bg-red-500'
                    } text-white rounded-md flex items-center justify-center`}
                  >
                    {offerStatus === 'accepted' ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Offer Accepted
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 mr-2" />
                        Offer Rejected
                      </>
                    )}
                  </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default ViewOffer
