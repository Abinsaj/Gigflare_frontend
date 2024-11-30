import React, { useCallback, useEffect, useState } from 'react'
import { Search, Heart, MoreHorizontal, CheckCircle, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getUserJobs } from '../../Services/userServices/userAxiosCalls'
import JobPost from './JobPost'
import JobPostForm from './JobPostApplication'
import { useNavigate } from 'react-router-dom'

const Jobs = () => {
    const data = useSelector((state:RootState)=>state.user.userInfo)
    const [job,setJob] = useState<any[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        if (data?._id) {
            try {
                const jobs = await getUserJobs(data._id)
                setJob(jobs)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            }
        }
    }, [data?.userId])

    useEffect(() => {
        if (data?.userId) {
            fetchData()
        }
    }, [data?.userId])

    const handleJobAdded = (newJob: any)=>{
        if (newJob && newJob._id && newJob.title) {
            setJob((prevJobs: any) => [...prevJobs, newJob]);
          } else {
            console.error('Invalid job data received', newJob);
          }    
    }

    const onClose = ()=>{
        setOpenModal(false)
    }
    const modalOpen = ()=>{
        setOpenModal(true)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 h-screen py-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                    <button className="pb-4 border-b-2 border-green-600 text-green-600">
                        All job posts
                    </button>
                    
                    <button onClick={()=>navigate('/contracts')} className="pb-4 text-gray-500">
                        All contracts
                    </button>
                </div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold">All job posts</h1>
                <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={modalOpen}
                >
                    Add Job
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search job postings"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </button>
            </div>

            {/* Job Posts List */}
            <div className="space-y-4">
                {job?.map((val: any) => (
                    <div key={val._id} className="bg-gray-50 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{val.title}</h2>
                            <div className="text-gray-500">
                                Fixed-price - {val.experienceLevel} - Est. Budget: {val.budget}
                            </div>
                            <div className="text-gray-500">
                                {val.description.substring(0, 100)}...
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={()=>navigate(`/proposals`,{state: val})} className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50">
                                Proposals
                            </button>
                            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50">
                                Edit
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-end justify-between mt-8">
                <div className="text-sm text-gray-500">
                    1 - {job?.length} of {job?.length} Job posts
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-600 text-white">
                        1
                    </div>
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {openModal && (
                <JobPostForm onClose={onClose} onJobAdded={handleJobAdded} />
            )}
        </div>
    )
}

export default Jobs