import React, { useEffect, useState } from 'react'
import { Camera, UserCircle, MapPin, Clock } from 'lucide-react';
import BlockChecker from '../../Services/userServices/blockChecker';
import { getDetails } from '../../Services/freelancerService/freelancerAxiosCalls';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';

const FreelancerProfile = () => {

    BlockChecker()
    const [freelancerData,setFreelancerData] = useState<any>()
    const navigate = useNavigate()

    let userData: any = useSelector((state: RootState)=>state.user.userInfo)
    
    useEffect(()=>{
        const fetch = async()=>{
            const data = await getDetails(userData.userId)
            setFreelancerData(data)
        }
        fetch()
    },[])

    console.log(freelancerData,'this is the data we go in freelancer details')

    return (
        <>
            {/* Main Content */}
            <div className="space-y-10">
                {/* Profile Card Section */}
                <div className="relative">
                    <div
                        className="h-60 bg-cover bg-center m-8 rounded-lg"
                        style={{ backgroundImage: `url('https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
                    ></div>
                    <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center">
                        <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl overflow-hidden">
                            <div className="relative flex items-center">
                                <div className="relative">
                                    {/* <UserCircle className="h-24 w-24 text-gray-300" aria-hidden="true" /> */}
                                    <img src={freelancerData?.profile} alt="" className='w-28 h-28 rounded-full'/>
                                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-xl font-bold">{freelancerData?.firstName} {freelancerData?.lastName} </h1>
                                    <p className='text-sm text-gray-400'>{freelancerData?.email}</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end text-sm text-gray-600">
                                    <button
                                    onClick={()=>navigate('/freelancer/editprofile',{state:{freelancerData:freelancerData}})}
                                    className='px-3 py-2 bg-green-500 text-white rounded-md mb-3'
                                    >Update Profile</button>
                                    <div className="flex items-center">
                                        <MapPin className='w-4 h-4 mr-2' />
                                        <span>Kozhikode, India</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <Clock className='w-4 h-4 mr-2' />
                                        <span>Joined in </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-3 mt-16 rounded-lg m-8  shadow-md bg-white gap-8">
                    {/* Left Column */}
                    <div className="space-y-10 p-6 border-r-4 border-gray-100">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Web Design</h3>
                            <p className="text-gray-700">Ecommerce Website Development</p>
                            <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-md flex items-center justify-between px-4">
                                All works
                                <span>→</span>
                            </button>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Hours per week</h3>
                            <p>No work history</p>
                            <p className="text-gray-600 text-sm">No contract-to-hire preference set</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Languages</h3>
                            <div className="space-y-1">
                                <p><span className="font-medium">{freelancerData?.language}:</span> Fluent</p>
                                {/* <p><span className="font-medium">Malayalam:</span> Native or Bilingual</p>
                                <p><span className="font-medium">Hindi:</span> Fluent</p> */}
                            </div>
                        </div>

                        {/* <div>
                            <h3 className="font-semibold mb-2">Verifications</h3>
                            <p>ID: Verified ✓</p>
                            <p>Military veteran</p>
                        </div> */}

                        <div>
                            <h3 className="font-semibold mb-2">Education</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium">{freelancerData?.education[0].title}</p>
                                    <p className="text-gray-600">{freelancerData?.education[0].collageName}</p>
                                </div>
                                <div>
                                    {/* <p className="font-medium">Bangalore University</p>
                                    <p className="text-gray-600">Bachelor of Computer Applications</p> */}
                                    <p className="text-gray-600">{freelancerData?.education[0].year}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-2 p-5 space-y-8">
                        <div className='border-b-2 pb-6'>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Web Developer</h2>
                                <span className="text-2xl font-bold">1000/hr</span>
                            </div>
                            <p className="text-gray-700">
                            {freelancerData?.description}
                            </p>
                        </div>

                        <div className='border-b-2 pb-14'>

                            <h3 className="text-xl font-bold mb-4">Certificates</h3>
                            {freelancerData?.certification.map((cert: any)=>(
                            <div className="flex space-x-4 mb-4">
                                <span className="font-medium text-green-600">{cert.name}</span>
                            </div>
                            ))}
                                <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-lg p-10">
                            <span className="font-medium text-green-600"></span>

                                    <img src={freelancerData?.certificateImage} alt="Portfolio" className="w-full rounded-lg mb-2" />
                                    <p className="text-green-600"></p>
                                </div>
                            </div>
                            
                        </div>

                        <div className='border-b-2 pb-6'>
                            <h3 className="text-xl font-bold mb-4">Work History</h3>
                            <p className="text-gray-600">No items</p>
                        </div>

                        <div className='flex'>
                            <h3 className="text-xl font-bold mb-4">Skills</h3>
                            {freelancerData?.skills.map((skill: any)=>(
                                <div className="flex flex-wrap pt-10 ">
                                <span className="px-4 py-2 bg-gray-200 rounded-full">{skill}</span>
                                
                            </div>
                            ))}
                            
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}

                <div className='p-8'>
                    <div className="p-6 mb-5 shadow-lg bg-white  rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Testimonials</h3>
                        <p className="text-gray-600 mb-6">Endorsements from past clients</p>

                        {/* <div className="border-t pt-6">
                            <div className="flex items-start space-x-4">
                                <img src="/api/placeholder/48/48" alt="Client" className="w-12 h-12 rounded-full" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-medium">Manon S</h4>
                                        <span className="text-gray-600">| Owner company Ecstatic Temple</span>
                                    </div>
                                    <p className="text-gray-600">Website Design & Development • Jun 2023</p>
                                    <p className="mt-4">
                                        "We hired Abinsaj for creating our website. He did this very quick, with a lot of attention and communication went very
                                        smoothly. He is highly recommended!"
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        No clients till now
                    </div>
                </div>

            </div>
        </>
    )
}

export default FreelancerProfile
