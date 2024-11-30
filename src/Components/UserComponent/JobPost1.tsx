import React from 'react'
import { X } from 'lucide-react'

interface Category {
    _id: string
    name: string,
    description: string,
    isBlocked: boolean
}

interface JobPostPage1Props {
    formData: {
        jobTitle: string
        jobDescription: string
        category: string
        
    }
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    category: Category[]
}

export default function JobPostPage1({ formData, handleChange, category }: JobPostPage1Props) {
    
console.log(category,'this is the category we got in add job post')

    return (
        <div className="space-y-4">
            <div>
                <div className='pb-3'>
                    <h2 className='font-semibold text-lg'>Lets start with a strong title</h2>
                    <h6 className='text-xs text-gray-400'>This help your job post stand out the right candidates It's the first thing they'll see, so make it count</h6>
                </div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-600">Write a title for your job post</label>
                <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
                />
            </div>
            <div>
            <div className='pb-3'>
                    <h2 className='font-semibold text-lg'>Describe what you need</h2>
                    {/* <h6 className='text-xs text-gray-400'>This help your job post stand out the right candidates It's the first thing they'll see, so make it count</h6> */}
                </div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 h-20 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
                ></textarea>
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
                >
                    <option value="" disabled className="text-gray-400">Add Category</option>
                    {category.map((data) => (
                        <option key={data._id} value={data.name}>{data.name}</option>
                    ))}
                </select>
            </div>

            
        </div>
    )
}