"use client"

import { useEffect, useState } from "react"
import { Camera, CalendarDays, IndianRupee, User } from "lucide-react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import BlockChecker from "../../Services/userServices/blockChecker"
import { getDetails, getWorkHistory, getRatingAndReview } from "../../Services/freelancerService/freelancerAxiosCalls"
import { useSelector } from "react-redux"
import type { RootState } from "../../Redux/store"
import { useNavigate } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import { posted } from "../../config/timeAgo"

const FreelancerProfile = () => {
  BlockChecker()
  const [freelancerData, setFreelancerData] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [works, setWorks] = useState<any[]>([])
  const [review, setReview] = useState<any>([])
  const navigate = useNavigate()

  const userData: any = useSelector((state: RootState) => state.user.userInfo)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getDetails(userData._id)
        setFreelancerData(data)
        const work = await getWorkHistory(data._id)
        setWorks(work.data)
        const review = await getRatingAndReview(data._id)
        console.log(review, "this is the review and rating we got in the frontend")
        setReview(review.data)
      } catch (error) {
        console.error("Error fetching freelancer details:", error)
      } finally {
        setIsLoading(false) // Set loading to false once data is fetched
      }
    }
    fetch()
  }, [userData._id])

  console.log(review, " this is the review we got in the freelancer profile")

  console.log(works, "this is the data we go in freelancer details")
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    )
  }

  return (
    <>
      {/* Main Content */}
      <div className="space-y-10">
        {/* Profile Card Section */}
        <div className="relative">
          <div
            className="h-40 sm:h-60 bg-cover bg-center mx-4 sm:m-8 rounded-lg"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            }}
          ></div>
          <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center">
            <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-6 w-11/12 max-w-4xl overflow-hidden">
              <div className="relative flex flex-col sm:flex-row items-center">
                <div className="relative mb-4 sm:mb-0">
                  {freelancerData.profile ? (
                    <img
                    src={freelancerData?.profile }
                    alt=""
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-full"
                  />
                  ):(
                    <User className="w-20 h-20 sm:w-28 sm:h-28"/>
                  )}
                  
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="ml-0 sm:ml-4 text-center sm:text-left">
                  <h1 className="text-lg sm:text-xl font-bold">
                    {freelancerData?.firstName} {freelancerData?.lastName}{" "}
                  </h1>
                  <p className="text-sm text-gray-400">{freelancerData?.email}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col items-center sm:items-end text-sm text-gray-600">
                  <button
                    onClick={() => navigate("/freelancer/editprofile", { state: { freelancerData } })}
                    className="px-3 py-2 bg-[#1AA803] text-white rounded-md mb-3"
                  >
                    Update Profile
                  </button>

                  <div className="flex items-center space-x-1 text-yellow-400 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < review.rating ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-16 rounded-lg mx-4 sm:m-8 shadow-md bg-white gap-8">
          {/* Left Column */}
          <div className="space-y-10 p-6 lg:border-r-4 border-gray-100">
            <div>
              <h3 className="text-lg font-semibold mb-2">Web Design</h3>
              <p className="text-gray-700">Ecommerce Website Development</p>
              <button className="mt-4 w-full py-2 bg-[#1AA803] text-white rounded-md flex items-center justify-between px-4">
                All works
                <span>→</span>
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">{freelancerData?.language}:</span> Fluent
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Education</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{freelancerData?.education[0].title}</p>
                  <p className="text-gray-600">{freelancerData?.education[0].collageName}</p>
                </div>
                <div>
                  <p className="text-gray-600">{freelancerData?.education[0].year}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 p-5 space-y-8">
            <div className="border-b-2 pb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Web Developer</h2>
                <span className="text-xl sm:text-2xl font-bold"></span>
              </div>
              <p className="text-gray-700">{freelancerData?.description}</p>
            </div>

            <div className="border-b-2 pb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Work History</h3>
              {works && works.length > 0 ? (
                works.map(
                  (
                    work,
                    index, // Added index as key
                  ) => (
                    <Card key={index} className="w-full p-4 sm:p-5 border-t border-b border-gray-100 mb-4">
                      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-2 flex-grow">
                          <h2 className="text-md font-medium text-[#1AA803]">{work.jobId.title}</h2>
                          <p className="text-gray-500 text-sm line-clamp-2">{work.jobId.description}</p>
                        </div>
                        <button className="bg-lime-500 rounded-2xl text-white px-2 py-1 text-sm">{work.status}</button>
                      </CardHeader>
                      <CardBody>
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="grid gap-4 sm:gap-20 pt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              <div className="text-sm">
                                <p className="text-gray-500">Starts From</p>
                                <p>{posted(work.startDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              <div className="text-sm">
                                <p className="text-gray-500">Deadline</p>
                                <p>{posted(work.endDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4 text-gray-500" />
                              <div className="text-sm">
                                <p className="text-gray-500">Total Budget</p>
                                <p className="font-medium">{work.totalBudget}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ),
                )
              ) : (
                <p>No work till now</p>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {freelancerData.skills && freelancerData?.skills.length > 0 ? (
                freelancerData?.skills.map((skill: any) => (
                  <span key={skill.name} className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm">
                    {skill.name}
                  </span>
                ))
              ) : (
                <p>No skills have been added</p>
              )}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="p-4 sm:p-8">
          <div className="p-4 sm:p-6 mb-5 shadow-lg bg-white rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Testimonials</h3>
            <p className="text-gray-600 mb-6">Endorsements from past clients</p>
            {review && review.length > 0 ? (
              review.map((val: any) => (
                <div key={val.clientId._id} className="border-t pt-6">
                  <div className="flex items-start space-x-4">
                    <img src="/api/placeholder/48/48" alt="Client" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{val.clientId.name}</h4>
                      </div>
                      <p className="mt-2 text-gray-500 font-normal text-sm sm:text-base">{val.review}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Endorsements</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FreelancerProfile

