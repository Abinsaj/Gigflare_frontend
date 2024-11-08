import React, { useEffect, useState } from 'react'
import { ChevronLeft, Mail, Phone, Globe, Download, Check } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFreelancerDetails } from '../../Services/adminServices/adminAxiosCall'
import { useDispatch } from 'react-redux'
import { updateApplication } from '../../Redux/actions/adminAction'
import { toast } from 'sonner'
import { AppDispatch } from '../../Redux/store'

// Mock data for the freelancer


export default function FreelancerDetails() {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const data = location.state?.freelancer;

    const [freelancerData, setFreelancerData] = useState<any>()
    const [profileImg, setProfileImg] = useState<string>()
    const [certImage, setCertImage] = useState<string>()
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [currentCertImage, setCurrentCertImage] = useState<string | undefined>('')

    const handleclick = (certImage: string | undefined)=>{
        setCurrentCertImage(certImage)
        setIsOpen(true)
    }

    const handleClose = ()=>{
        setIsOpen(false)
        setCurrentCertImage('')
    }

    useEffect(()=>{
        const fetchData = async()=>{
            let response: any = await getFreelancerDetails(data.userId)
            console.log(response?.freelancerData,' this is the actual response we got from the backend')
            setFreelancerData(response?.freelancerData)
            setProfileImg(response?.profileImg)
            setCertImage(response?.certImage)
        }
        fetchData()
    },[])

    const handleStatusChange = async (applicationId: string, newStatus: 'accepted' | 'rejected') => {
      try {
        const response =  await dispatch(updateApplication({applicationId, newStatus}))
        if(response.payload.success){
          toast.success(response.payload.message)
        }
      } catch (error:any) {
        toast.error('Error updating freelancer status:', error)
      }
    }
    
    
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-2 p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft onClick={()=>navigate('/admin/applications')} className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Freelancer Details</h1>
            </div>
            <div className="flex space-x-2">
              <button onClick={()=>handleStatusChange(data.applicationId,"rejected")} className="px-4 py-2 border bg-red-500 rounded-md text-white hover:bg-rose-600">
                Reject
              </button>
              <button onClick={()=>handleStatusChange(data.applicationId,"accepted")} className="px-4 py-2 bg-[#003F62] text-white rounded-md hover:bg-[#002E62]">
                Approve
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column */}
            <div className="md:w-1/3 ">
              <div className="bg-white  shadow rounded-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-28 w-28">
                      <img
                        src={profileImg}
                        alt='freelancerapplication/photo'
                        className="h-full w-full rounded-full object-cover"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner"></div>
                    </div>
                    <div className='space-y-2'>
                      <h2 className="text-xl font-semibold">{freelancerData?.firstName} {freelancerData?.lastName}</h2>
                      <p className="text-gray-500">{freelancerData?.experience[0].expertise} </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-500 mb-4">{freelancerData?.description} </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{freelancerData?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{freelancerData?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a href={freelancerData?.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        Portfolio
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="md:w-2/3 space-y-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                   {freelancerData?.skills.map((skill:any,index:any)=>(
                      <span  key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2">Experience</h3>
                  <ul className="space-y-4">
                    {freelancerData?.experience.map((exp:any,index:any)=>(
                      <li key={index} className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{exp.expertise}</p>
                          <p className="text-sm text-gray-500">{exp.fromYear} - {exp.toYear}</p>
                        </div>
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                        {exp.toYear - exp.fromYear} years
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <ul className="space-y-4">
                    {freelancerData?.education.map((edu: any, index: any)=>(
                      <li key={index}>
                        <p className="font-semibold">{edu.title}</p>
                        <p className="text-sm text-gray-500">{edu.collageName}, {edu.year}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <ul className="space-y-2">
                    {freelancerData?.certification.map((cert: any,index: any)=>(
                      <li key={index} className="flex flex-col items-start space-x-2">
                        {/* <Check className="h-4 w-4 text-green-500" /> */}
                        <span className='px-2'>{cert.name} {cert.year}</span>
                        <img
                         className="cursor-pointer w-48 pt-4"
                         onClick={()=>handleclick(certImage)}
                         src={certImage} 
                         alt="" 
                         />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    
                      <span className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm">
                        {freelancerData?.language}
                      </span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={handleClose}
        />
        <img
            src={currentCertImage} 
            alt="certificate Image"
            className="max-w-[90%] max-h-[90%] rounded-lg z-10 border-none"
        />
    </div>
      )}

    </div>
  )
}
