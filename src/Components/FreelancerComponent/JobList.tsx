import React, { useEffect, useState } from 'react'
import { Search, ChevronDown, ChevronUp, Heart, MoreHorizontal, CheckCircle, MapPin } from 'lucide-react'
import { getJobList } from '../../Services/freelancerService/freelancerAxiosCalls'
import { useNavigate } from 'react-router-dom'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import LoadingSpinner from '../Common/LoadinSpinner'


export default function JobListing() {

    const [data,setData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const {freelancer} =  useFreelancer()
    const id = freelancer?.userId

useEffect(()=>{
    const fetchData = async()=>{
      if(!id)return
      try {
        const jobData = await getJobList(id)
        setData(jobData)
      } catch (error) {
        console.error('Error fetching job data:', error);
      }finally{
        setLoading(false)
      }
    }
    fetchData()
},[id])

if(!id || loading){
  return <LoadingSpinner/>
}


  return (
    <div className="flex pl-10 bg-white">
      <div className="w-64 p-4 border-r  overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-semibold mb-4">Filter By</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Category</h3>
            <ChevronDown size={20} className="text-gray-500" />
          </div>
          <div className="relative">
            <select className="w-full p-2 border rounded-md appearance-none pr-8 text-gray-600">
              <option>Select categories</option>
            </select>
            <ChevronDown size={20} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {[
          { name: 'Experience level', options: ['Entry Level', 'Intermediate', 'Expert'] },
        //   { name: 'Job type', options: ['Hourly', 'Fixed-price'] },
          { name: 'Number of proposals', options: ['Less than 5', '5 to 10', '10 to 15'] },
        //   { name: 'Budget (fixed price)', options: ['Less than $100', '$100 to $500', '$500 to $1K', '$1K to $5K', '$5K+'] },
          { name: 'Project length', options: ['Less than one month', '1 to 3 months', '3 to 6 months', 'More than 6 months'] }
        ].map((filter, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{filter.name}</h3>
              <ChevronUp size={20} className="text-gray-500" />
            </div>
            {filter.name === 'Job type' ? (
              <div>
                <div className="flex justify-between mb-2">
                  {filter.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center">
                      <input type="radio" name="jobType" className="mr-2" />
                      {option}
                    </label>
                  ))}
                </div>
                <input type="range" className="w-full" />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>$0</span>
                  <span>$160+</span>
                </div>
              </div>
            ) : (
              filter.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  {option}
                </label>
              ))
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-y-auto scrollbar-hide">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            
            <div className="flex items-center">
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Search for jobs"
                  className="w-full p-2 border rounded-l-md pl-10"
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-r-md whitespace-nowrap">
                Save search
              </button>
            </div>
          </div>
          <p className="text-green-500 text-sm mb-4">Advanced search</p>

          {/* Job Listings */}
          {data.map((job, index) => (
            <div key={index} onClick={()=>navigate('/freelancer/viewjobdetials',{state:{data:job}})} className="border-b border-t py-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <div className="flex space-x-2">
                  <button className="p-2 border rounded-full">
                    <Heart size={20} className="text-gray-400" />
                  </button>
                  <button className="p-2 border rounded-full">
                    <MoreHorizontal size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">Fixed-price - Entry level - Est. Budget: {job.budget}</p>
              <p className="mb-2">{job.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <CheckCircle size={16} className="text-blue-500 mr-1" />
                <span className="mr-4">Payment verified</span>
                <span className="mr-4">$$$</span>
                <MapPin size={16} className="mr-1" />
                <span>India</span>
              </div>
              <p className="text-sm text-gray-500">Proposals: {job.proposal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}