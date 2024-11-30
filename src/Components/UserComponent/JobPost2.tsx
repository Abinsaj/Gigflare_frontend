import React from 'react'
import { X } from 'lucide-react'

interface JobPostPage2Props {
  formData: {
    skills: string[]
    duration: string

  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSkillChange: (skills: string[]) => void
}

export default function JobPostPage2({ formData, handleChange, handleSkillChange }: JobPostPage2Props) {

  const [newSkill, setNewSkill] = React.useState('')

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      handleSkillChange([...formData.skills, newSkill])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    handleSkillChange(formData.skills.filter(skill => skill !== skillToRemove))
  }
  return (
    <div className="space-y-8">
      <div>
      <div className='pb-3'>
                    <h2 className='font-semibold text-lg'>What are the main skills required for you work</h2>
                    {/* <h6 className='text-xs text-gray-400'>This help your job post stand out the right candidates It's the first thing they'll see, so make it count</h6> */}
                </div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Add the skills required</label>
        <div className="flex mt-1 h-10">
          <input
            type="text"
            id="skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="block w-full rounded-l-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
          />
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex h-10 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#1AA803] hover:bg-[#1AA803] focus:outline-none focus:ring-2  focus:ring-[#1AA803]"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gray-500">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="flex-shrink-0 ml-1.5 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div>
      <div className='pb-3'>
                    <h2 className='font-semibold text-lg'>Your expecting time period for the work done</h2>
                    {/* <h6 className='text-xs text-gray-400'>This help your job post stand out the right candidates It's the first thing they'll see, so make it count</h6> */}
                </div>
 
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Project Duration</label>
        <select
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
        >
          <option value="">Select duration</option>
          <option value="less-than-1-month">Less than 1 month</option>
          <option value="1-3-months">1-3 months</option>
          <option value="3-6-months">3-6 months</option>
          <option value="more-than-6-months">More than 6 months</option>
        </select>
      </div>

    </div>
  )
}