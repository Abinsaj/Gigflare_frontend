import React, { useCallback, useEffect, useState } from 'react'
import { Search, Heart, MoreHorizontal, CheckCircle, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getUserJobs } from '../../Services/userServices/userAxiosCalls'
import JobPost from './JobPost'
import JobPostForm from './JobPostApplication'
import { useNavigate } from 'react-router-dom'
import useNotification from '../../zustand/useNotification'
import useGetNotification from '../../hooks/useGetNotification'
import LoadingSpinner from '../Common/LoadinSpinner'

const Jobs = () => {
    const data = useSelector((state: RootState) => state.user.userInfo)
    const [job, setJob] = useState<any[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { notifications } = useGetNotification()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const [pageSize] = useState(3)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = useCallback(async (page = 1) => {
        if (data?._id) {
            try {
                const jobs = await getUserJobs(data._id, page, pageSize)
                setJob(jobs.jobData)
                setTotalPages(jobs.totalPages)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            }finally{
                setLoading(false)
            }
        }
    }, [data?.userId]) 

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            fetchData(newPage);
        }
    };

    useEffect(() => {
        if (data?.userId) {
            fetchData()
        }
    }, [data?.userId])

    const handleJobAdded = (newJob: any) => {
        if (newJob && newJob._id && newJob.title) {
            setJob((prevJobs: any) => [...prevJobs, newJob]);
        } else {
            console.error('Invalid job data received', newJob);
        }
    }

    const onClose = () => {
        setOpenModal(false)
    }
    const modalOpen = () => {
        setOpenModal(true)
    }

    if(loading){
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 h-screen py-8">
            {/* Tabs */}
            <h1 className="text-3xl font-semibold pb-5">All job posts</h1>
            <div className="flex gap-4 mb-8 justify-end">
              
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={modalOpen}
                >
                    Add Job
                </button>
            </div>

            {/* Job Posts List */}
            {job && job.length > 0 ? (
                <div className="space-y-4">
                    {job.map((val: any) => {
         
                        const proposalCount = notifications?.filter(
                            (notif: any) => notif.type === 'proposal' && notif.data?.jobId === val._id
                        ).length || 0; // Fallback to 0 if notifications are undefined

                        return (
                            <div
                                key={val._id}
                                className="bg-gray-50 p-6 rounded-lg flex items-center justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{val.title || "Untitled Job"}</h2>
                                    <div className="text-gray-500">
                                        Fixed-price - {val.experienceLevel || "N/A"} - Est. Budget: {val.budget || "N/A"}
                                    </div>
                                    <div className="text-gray-500">
                                        {val.description
                                            ? val.description.substring(0, 100)
                                            : "No description available"}
                                        ...
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => navigate(`/proposals`, { state: val })}
                                        className="relative px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
                                        aria-label={`View proposals for ${val.title}`}
                                    >
                                        Proposals
                                        {proposalCount > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                {proposalCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>You don't have any job posts.</p>
            )}


            {job && job.length > 0 && (
                <div className="flex items-end justify-between mt-8">
                    <div className="text-sm text-gray-500">
                        1 - {job.length} of {job.length} Job posts
                    </div>
                    <div className="flex items-center gap-2">
                                        <button
                                            
                                            className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft onClick={()=>handlePageChange(currentPage - 1)} className="h-4 w-4" />
                                        </button>
                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-600 text-white">
                                            {currentPage}
                                        </div>
                                        <button
                                            className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                                            disabled={currentPage === totalPages}
                                            >
                                           
                                            <ChevronRight  onClick={()=>handlePageChange(currentPage + 1)} className="h-4 w-4" />
                                        </button>
                                    </div>
                </div>
            )}

            {openModal && (
                <JobPostForm onClose={onClose} onJobAdded={handleJobAdded} />
            )}
        </div>
    )
}

export default Jobs