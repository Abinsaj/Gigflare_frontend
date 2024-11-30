import React from 'react'
import { IndianRupee, Trash2, Plus } from 'lucide-react'


interface JobPostPage3Props {
  formData: {
    projectType: string
    budget?: number
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
 
}

export default function JobPostPage3({ formData, handleChange}: JobPostPage3Props) {
  return (
    <div className="space-y-4">
      <div>
      <div className='pb-3'>
                    <h2 className='font-semibold text-lg'>Estimate the scope of your work</h2>
                    {/* <h6 className='text-xs text-gray-400'>This help your job post stand out the right candidates It's the first thing they'll see, so make it count</h6> */}
                </div>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
        >
          <option value="">Select project type</option>
          <option value="low">Low complexity</option>
          <option value="medium">Medium complexity</option>
          <option value="high">High complexity</option>
        </select>
      </div>
      <div>
        <h2 className='font-semibold text-lg'>Tell us about your Budget</h2>
        <h5 className='font-normal text-sm text-gray-400'>This will help us match you to talent within you range</h5>
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Maximum Project Budget</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter budget in USD"
          className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
        />
      </div>
    </div>
  )
}