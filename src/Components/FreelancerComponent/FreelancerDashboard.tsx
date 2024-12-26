import React, { useContext, useEffect, useState } from 'react'
import BlockChecker from '../../Services/userServices/blockChecker'
import { useLocation } from 'react-router-dom'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import { getFreelancerDashDetails } from '../../Services/freelancerService/freelancerAxiosCalls'
import { posted } from '../../config/timeAgo'

interface IFreelancerDashboard {
  earnings: number,
  totalProject: number,
  activeContract: number
  recentProjects: any
  ratingReview: any
}

export default function Dashboard() {

  BlockChecker()
  const location = useLocation()
  const [freelancerData, setFreelancerData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IFreelancerDashboard | null>(null)
  const { freelancer } = useFreelancer()
  console.log(freelancer, ' this is the freelancer data in dashboard')

  const fetchContractDetails = async () => {
    try {
      const response = await getFreelancerDashDetails(freelancer?._id)
      console.log(response, 'The response')
      if (response.success) {
        setData(response.data)
      }
    } catch (error) {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchContractDetails()
    setFreelancerData(freelancer)

  }, [freelancer])

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="p-5">
          <div className="relative mb-20">
            
            <div
              className="h-60 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
            ></div>
            <div className="absolute bottom-[-70px] left-0 right-0 flex flex-col justify-center items-center">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, <span className="text-gray-50"> {freelancerData?.firstName}</span>
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 w-4/5 gap-6 mb-6">
                <div className="bg-white rounded-md p-6 shadow-sm text-black">
                  <h2 className="text-2xl font-bold mb-4">Earnings</h2>
                  <p className="text-4xl font-bold">₹{data?.earnings}</p>
                  <p className="text-sm mt-2"></p>
                </div>
                <div className="bg-white rounded-md p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Total Projects</h3>
                    <p className="text-gray-500">Since Joined</p>
                  </div>
                  <div className="text-4xl font-bold text-gray-800">{data?.totalProject}</div>
                </div>
                <div className="bg-white rounded-md p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Active Contracts</h3>
                    <p className="text-gray-500"></p>
                  </div>
                  <div className="text-4xl font-bold text-gray-800">{data?.activeContract}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional content */}
          <div className="mt-24 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {data?.recentProjects && data.recentProjects.length > 0 && (
                data?.recentProjects.map((project: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                    {/* Left side: Job title and duration */}
                    <div>
                      <h3 className="font-medium">{project.jobId.title}</h3>
                      <p className="text-sm text-gray-500">
                        Duration: {posted(project.startDate)} to {posted(project.endDate)}
                      </p>
                    </div>

                    {/* Right side: Status */}
                    <div className={`ml-auto text-sm font-medium px-3 py-1 rounded-full ${project.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {project.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Ratings and Reviews</h2>
            <div className="space-y-4">
              {data?.ratingReview && data.ratingReview.length > 0 ? (
                data.ratingReview.map((review: any, index: number) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-md">
                    {/* <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4" /> */}
                    <div className="flex-1">
                      <h3 className="font-medium">{review.clientId.name}</h3>
                      <div className="flex items-center space-x-1 text-yellow-400 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={i < review.rating ? 'currentColor' : 'none'}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{review.review}</p>
                    </div>
                  </div>
                ))
              ):(
                <p>No review till now</p>
              )}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}