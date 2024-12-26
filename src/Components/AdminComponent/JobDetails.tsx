import React, { useEffect, useState } from 'react'
import { Calendar, DollarSign, Globe, Tag, Users, Clock, ChevronLeft, IndianRupeeIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { blockUnblockJob } from '../../Services/adminServices/adminAxiosCall'
import {posted, timeAgo} from '../../config/timeAgo'
import { activatejob } from '../../Services/adminServices/adminAxiosCall'
import { toast } from 'sonner'

interface JobDetailsProps {
  _id: string
  title: string
  description: string
  skillsRequired: any[]
  budget: number
  category: any
  deadLine: string
  status: 'open' | 'closed' | 'in-progress'
  isActive?: boolean
  isBlocked: boolean
  createdAt: string
  duration?: string
  projectType?: string
  
}

export default function JobDetails() {


  const location = useLocation()
  const navigate = useNavigate();
  // const job = location.state?.job;
  const [job, setJob] = useState<JobDetailsProps | null>(location.state?.job || null)
  console.log(job, 'this is the job')

  useEffect(()=>{

  },[job])

  console.log('afhasfhalasfhalfh')

  const handleBlockJob = async (id: string, status: string | 'block' | 'unblock') => {
    const response = await blockUnblockJob(id, status)
    if (response.isBlocked == true) {

    }
  }

  const handleJobAvtivation = async (id: string | undefined) => {
    const response = await activatejob(id)
    if (response.success == true) {
      toast.success('job activated')
      setJob((prevJob) => prevJob ? { ...prevJob, isActive: true } : prevJob)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Jobs
          </button>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{job?.title}</h1>
                <p className="text-sm text-gray-500"> {posted(job?.createdAt)}</p>
              </div>
              {/* <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                job.status === 'open' ? 'bg-green-100 text-green-800' :
                job.status === 'closed' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {job.status}
              </span> */}
              {job?.isActive == true ? (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>Active</span>
              ): (
                  <button
                className = " mt-4 px-6 py-3 bg-[#003F62] text-white rounded-lg hover:bg-[#002E62] transition-colors"
                onClick = { () => handleJobAvtivation(job?._id)}
              >
              Activate
            </button>
              )}

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Job Details */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{job?.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job?.skillsRequired.map((skill: any, index: any) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-gray-500 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Job Overview */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <IndianRupeeIcon className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">₹{job?.budget}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Tag className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{job?.category.name}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{job?.duration}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Globe className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Project Type</p>
                  <p className="font-medium">{job?.projectType}</p>
                </div>
              </div>

              {/* <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Total Applicants</p>
                    <p className="font-medium">{job.proposals.length}</p>
                  </div>
                </div> */}

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{job?.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* {job.isBlocked === false && (
            <button
              className="w-full mt-4 px-6 py-3 bg-[#003F62] text-white rounded-lg hover:bg-[#002E62] transition-colors"
              onClick={() => handleBlockJob(job._id, 'block')}
            >
              Block Job
            </button>
          )}

          {job.isBlocked === true && (
            <button
              className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => handleBlockJob(job._id, 'unblock')}
            >
              Unblock Job
            </button>
          )} */}

        </div>
      </div>
    </div>
    </div >
  )
}