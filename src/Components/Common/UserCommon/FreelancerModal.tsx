import React from 'react'
import { X, MapPin, Clock, Camera, Star } from 'lucide-react'

interface FreelancerModalProps {
  freelancer: any
  onClose: () => void
}



export default function FreelancerModal({ freelancer, onClose }: FreelancerModalProps) {
  console.log(freelancer, 'this is the freelancer data in porposa profile')
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 h-3/4 overflow-y-auto">
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
              <img src={freelancer.photo}  className="w-24 h-24 rounded-full" />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                {/* <Camera className="w-4 h-4" /> */}
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{freelancer.firstName} {freelancer.lastName}</h1>
              <p className="text-gray-600">{freelancer.email}</p>
              <div className="flex items-center mt-2">
                {/* <MapPin className="w-4 h-4 mr-2 text-gray-500" /> */}
                {/* <span className="text-gray-600">Kozhikode, India</span> */}
              </div>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Joined in {new Date(freelancer.createdAt).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-gray-700">{freelancer.description}</p>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Languages</h3>
            <p><span className="font-medium">{freelancer.language}:</span> Fluent</p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            {freelancer.education.map((edu: any, index: number) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{edu.title}</p>
                <p className="text-gray-600">{edu.collageName}</p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            {freelancer.certification.map((cert: any, index: number) => (
              <div key={index} className="mb-2">
                <p className="font-medium text-green-600">{cert.name}</p>
                <p className="text-gray-600">{cert.year}</p>
              </div>
            ))}
            {freelancer.certificateImage && (
              <img src={freelancer.certificateImage} alt="Certificate" className="mt-2 max-w-full h-auto rounded-lg" />
            )}
          </div>

          {/* Work History */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Work History</h3>
            <p className="text-gray-600">No items</p>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
            <p className="text-gray-600">No clients till now</p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center">
          <div>
            {/* <span className="text-2xl font-bold">₹:1000/hr</span> */}
          </div>
          {freelancer.isTopRated && (
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-semibold text-yellow-800">TOP RATED</span>
            </div>
          )}
          {/* <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Hire Freelancer
          </button> */}
        </div>
      </div>
    </div>
  )
}