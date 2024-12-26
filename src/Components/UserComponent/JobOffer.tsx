import React, { useState, useEffect } from 'react'
import { Calendar, IndianRupee, Info } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendOffer } from '../../Services/userServices/userAxiosCalls'
import { toast } from 'sonner'

export interface OfferData {
  jobId?: string
  freelancerId?: string
  proposalId?: string
  budget: number
  fromDate: string
  toDate: string
  jobTitle: string
  description: string
  upfrontAmount: number
  completionAmount: number
  platformFeeAmount: number
  termsAccepted?: boolean
  attachment?: File | null 

}

interface FormErrors {
  budget: string
  fromDate: string
  toDate: string

}

export default function JobOffer() {
  const location = useLocation()
  const { data } = location.state
  const { job } = location.state


  const [offerData, setOfferData] = useState<OfferData>({
    budget: job.budget,
    fromDate: '',
    toDate: '',
    jobTitle: job.title,
    description: job.description,
    upfrontAmount: 0,
    completionAmount: 0,
    platformFeeAmount: 0,
    attachment: null,
  })

  const [errors, setErrors] = useState<FormErrors>({
    budget: '',
    fromDate: '',
    toDate: ''
  })

  const [upfrontPercentage, setUpfrontPercentage] = useState(25)
  const [completionPercentage, setCompletionPercentage] = useState(75)

  useEffect(() => {
    const upfrontAmount = (offerData.budget * upfrontPercentage) / 100
    const completionAmount = (offerData.budget * completionPercentage) / 100
    const platformFeeAmount = (offerData.budget * 5) / 100

    setOfferData(prev => ({
      ...prev,
      upfrontAmount,
      completionAmount,
      platformFeeAmount
    }))
  }, [offerData.budget, upfrontPercentage, completionPercentage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, attachment: 'Only PDF files are allowed.' }))
    } else {
      setOfferData(prev => ({ ...prev, attachment: file }))
      setErrors(prev => ({ ...prev, attachment: '' }))
    }
  }

  

  const handleChange = (field: keyof OfferData, value: any) => {
    setOfferData((prev) => ({ ...prev, [field]: value }))

    let error = ''
    if (field === 'budget' && (value <= 0 || value === '')) {
      error = 'Budget must be greater than 0'
    }
    if (field === 'fromDate') {
      const fromDate = new Date(value)
      if (fromDate < new Date()) {
        error = 'Start date must be in the future'
      }
    }
    if (field === 'toDate') {
      const toDate = new Date(value)
      const fromDate = new Date(offerData.fromDate)
      if (toDate <= fromDate) {
        error = 'End date must be after the start date'
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      budget: offerData.budget <= 0 ? 'Budget must be greater than 0' : '',
      fromDate: new Date(offerData.fromDate) < new Date() ? 'Start date must be in the future' : '',
      toDate:
        new Date(offerData.toDate) <= new Date(offerData.fromDate) ? 'End date must be after the start date' : '',
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const formData = new FormData()
      formData.append('budget', offerData.budget.toString())
      formData.append('fromDate', offerData.fromDate)
      formData.append('toDate', offerData.toDate)
      formData.append('jobTitle', offerData.jobTitle)
      formData.append('description', offerData.description)
      formData.append('upfrontAmount', offerData.upfrontAmount.toString())
      formData.append('completionAmount', offerData.completionAmount.toString())
      formData.append('platformFeeAmount', offerData.platformFeeAmount.toString())
      if (offerData.attachment) {
        formData.append('attachment', offerData.attachment)
      }

      const response = await sendOffer(formData, data.freelancer._id, job._id, job.createdBy)
      if (response.success === true) {
        toast.success(response.message)
        window.history.back()
      }
    } else {
      console.log('Form has validation errors')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Send an Offer</h1>
      </div>

      {/* Freelancer Info */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={data.freelancer.photo}
            alt="Freelancer"
            className="w-20 h-20 rounded-full"
          />
          <div className='space-y-2'>
            <h2 className="text-lg font-semibold">{data.freelancer.firstName} {data.freelancer.lastName}</h2>
            <p className="text-gray-600">{data.freelancer.description}</p>
            <p className="text-sm text-gray-400">{data.freelancer.skills}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Contract Terms */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Contract Terms</h2>

          <div className="space-y-6">
            {/* Payment Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Option
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="h-4 w-4 text-green-600 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-900">Fixed price</span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={offerData.budget}
                  onChange={(e) => handleChange('budget', Number(e.target.value))}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter budget amount"
                />
              </div>
              {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              <label htmlFor="totalBid" className="block pt-1 text-xs font-medium text-gray-700 mb-1">
                A 5% from the total amount will go to GIGFLARE as service charge
              </label>
            </div>

            {/* Project Timeline */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={offerData.fromDate}
                      onChange={(e) => handleChange('fromDate', e.target.value)}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  {errors.fromDate && <p className="text-red-500 text-xs mt-1">{errors.fromDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={offerData.toDate}
                      onChange={(e) => handleChange('toDate', e.target.value)}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  {errors.toDate && <p className="text-red-500 text-xs mt-1">{errors.toDate}</p>}
                </div>
              </div>
              <div>
                <div className='mt-5'>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Attachment (PDF only)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                  />
                  {/* {errors.attachment && <p className="text-red-500 text-xs mt-1">{errors.attachment}</p>} */}
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Schedule</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Upfront Payment ({upfrontPercentage}%)</span>
                    <span className="text-sm font-semibold text-gray-900">₹{offerData.upfrontAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-500">Paid at the start of the project</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Payment ({completionPercentage}%)</span>
                    <span className="text-sm font-semibold text-gray-900">₹{offerData.completionAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-500">Paid upon project completion</div>
                </div>
              </div>
              <div className="mt-4 bg-green-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">GIGFLARE Platform Fee (5% of advance)</span>
                  <span className="text-sm font-semibold text-green-900">₹{offerData.platformFeeAmount.toFixed(2)}</span>
                </div>
                <div className="text-xs text-green-600 mt-1">Deducted from the upfront payment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Description */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Work Description</h2>
          <div className="whitespace-pre-line text-sm text-gray-700">
            {job.description}
          </div>
        </div>

        {/* Terms Agreement */}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {/* <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

