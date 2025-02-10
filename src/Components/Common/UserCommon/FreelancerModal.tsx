import React, { useEffect, useState } from 'react'
import { X, Clock, Star } from 'lucide-react'
import RatingAndReview from '../ReviewRating'
import { posted } from '../../../config/timeAgo'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { getContractList, addRatingAndReview, ReviewRating, getRatingAndReview } from '../../../Services/userServices/userAxiosCalls'
import { toast } from 'sonner'


interface FreelancerModalProps {
  freelancer: any
  onClose: () => void

}

export default function FreelancerModal({ freelancer, onClose }: FreelancerModalProps) {

  console.log(freelancer, 'this is the freelancer data in porposal profile')
  const userId: any = useSelector((state: RootState)=>state.user.userInfo?._id)

  const [reviews, setReviews] = useState<{ name: string, eamil: string,rating: number; review: string }[]>([]);
  const [contract, setContract] = useState<any[]>([])

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await getContractList(userId)
      console.log(response,'this is the response of the contract list fo the user')  
        setContract(response)
      const data = await getRatingAndReview(freelancer._id)
      console.log(data)
      if(data.data){
        setReviews(data.data)
      }
    }
    if(userId){
      fetchData()
    }
  },[userId])

  let contracts = []
  if(contract && contract.length > 0){
      contracts = contract.filter((val: any)=> val.status !== 'draft')
  }

  const handleReviewSubmit = async(rating: number, review: string) => {
    const data: ReviewRating = {
      rating,
      review,
      userId,
      freelancerId:freelancer._id,
    }
    console.log(data)
      const saveReview = await addRatingAndReview(data)
      console.log(saveReview,'this is the response')
      if(saveReview.success ==true){
        if(saveReview.data){
          setReviews((prev) => Array.isArray(prev) ? [...prev, saveReview.data] : [saveReview.data]);
        }
        toast.success(saveReview.message)
      }else{
        toast.error(saveReview.message)
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-8xl h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Freelancer Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img src={freelancer.photo} className="w-24 h-24 rounded-full" />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                {/* <Camera className="w-4 h-4" /> */}
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{freelancer.firstName} {freelancer.lastName}</h1>
              <p className="text-gray-600">{freelancer.email}</p>
              <div className="flex items-center mt-2">
               
              </div>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Joined in {posted(freelancer.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
            {freelancer.skills && freelancer.skills.length > 0 ? (
            freelancer.skills.map((skill: any, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {skill.name}
                </span>
              ))
            ):(
              <p>No skills added</p>
            )}
              
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-gray-700">{freelancer.description}</p>
          </div>


          <div className="flex flex-col md:flex-row gap-6 justify-between bg-green-50 p-2">
            {/* Languages */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Languages</h3>
              <div className="flex gap-4">
                <span className="font-medium">{freelancer.language}:</span>
                <span>Fluent</span>
              </div>
            </div>

            {/* Education */}
            <div className="flex-1 justify-center">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <div>
                {freelancer.education.map((edu: any, index: number) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">{edu.title}</p>
                    <p className="text-gray-600">{edu.collageName}</p>
                    <p className="text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex-1 justify-end">
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <div>
                {freelancer.certification.map((cert: any, index: number) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium text-green-600">{cert.name}</p>
                    <p className="text-gray-600">{cert.year}</p>
                  </div>
                ))}
                {freelancer.certificateImage && (
                  <img
                    src={freelancer.certificateImage}
                    alt="Certificate"
                    className="mt-2 max-w-full h-auto rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Work History */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Work History</h3>
            <p className="text-gray-600">No items</p>
          </div>

          {/* Testimonials */}
          <div className='w-full flex border-t '>
            <div className='w-6/12 pt-4 pl-3'>
              <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
              
              {reviews && reviews.length > 0 ? (
                <div>
                  {reviews.map((review, index) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <div className="flex items-center space-x-2 text-yellow-400 mt-1">
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
                      <p className="mt-2 text-gray-700">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 font-medium">No Review till now</p>
              )}
            </div>
            <div className='border mt-4'></div>
            <div className='py-2 space-y-2 w-6/12 pt-4 pl-3'>
              <p className='font-semibold text-xl'>Add Rating and Review</p>
              <RatingAndReview onSubmit={handleReviewSubmit} contracts={contracts}/>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center">
          {/* {freelancer.isTopRated && (
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-semibold text-yellow-800">TOP RATED</span>
            </div>
          )}


          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Hire Freelancer
          </button> */}
        </div>
      </div>
    </div>
  )
}