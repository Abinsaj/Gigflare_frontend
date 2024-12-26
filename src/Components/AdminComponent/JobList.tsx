import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { getJobList } from '../../Services/adminServices/adminAxiosCall'
import { useNavigate } from 'react-router-dom'
import { posted } from '../../config/timeAgo'


export default function JobLists() {

    const navigate = useNavigate()
    const [jobData, setJobData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getJobList()
            console.log(response)
            setJobData(response)
        }
        fetchData()
    }, [])
    console.log(jobData,'this is the job data')

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Job Listings</h1>
            <p className="text-sm text-gray-600 mb-4">Home &gt; Job Listings</p>
            <div className="flex justify-end items-center mb-4">
                <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm text-gray-600">{posted(new Date())}</span>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            {/* <th></th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jobData.map((job) => (
                        
                            <tr key={job.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title.substring(0,35)}....</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{job.budget}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {job.isActive ?(
                                        <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.isActive === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        active
                                    </span>
                                    ):(
                                        <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.isActive === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        inactive
                                    </span>
                                    )}
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.isActive === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        
                                    </span>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(job.duration)}</td>
                                <td className="">
                                    <button
                                        className="px-4 py-2 border rounded-md bg-[#003F62] text-white"
                                        onClick={() => navigate('/admin/jobdetails', { state: { job } })}
                                    >
                                        View Details
                                    </button>
                                </td>
                                {/* <td>
                                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">block</button>
                                </td> */}
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    className="mt-1 w-4/5 py-2 px-3 bg-gray-50 rounded-2xl shadow-sm focus:outline-none"
                    value={job.status}
                    onChange={() => {}}
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                </button>
                <span className="text-sm text-gray-700">Page 1 of 1</span>
                <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003F62] hover:bg-[#002E62]">
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
    )
}