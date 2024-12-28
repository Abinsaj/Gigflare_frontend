import React, { useState } from 'react'
import { ArrowLeft, Clock, CheckCircle, Heart, DollarSign, MapPin } from 'lucide-react'
import { useFetcher, useLocation, useNavigate } from 'react-router-dom'
import { timeAgo, posted } from '../../config/timeAgo';
import SendProposal from './ProposalModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData';

export default function ViewJobDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const userId = useSelector((state: RootState)=>state.user.userInfo?._id)
    const {freelancer} = useFreelancer()

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }


    return (
        <div className="max-w-7xl mx-auto pt-8 pb-8 bg-white">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">{timeAgo(data.createdAt)}</p>
                </div>
                <button onClick={() => navigate('/freelancer/joblist')} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-md mb-6">
                {/* <p className="text-sm">
                    Specialized profiles can help you better highlight your expertise when submitting proposals to jobs like these. <a href="#" className="text-green-600 hover:underline">Create a specialized profile.</a>
                </p> */}
            </div>

            <p className="mb-4 text-gray-600">India</p>

            <p className="mb-6 text-gray-700">
                {data.description}
            </p>

            <div className="flex justify-between mb-6">
                <div>
                    <p className="text-2xl font-bold">RS: {data.budget}</p>
                    <p className="text-sm text-gray-500">Fixed-price</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold">{data.experienceLevel}</p>
                    <p className="text-sm text-gray-500">Experience Level</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="font-semibold mb-2">Project Type:</p>
                <p>{data.projectType}</p>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <p className="font-semibold mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {data.skillsRequired && data.skillsRequired.length > 0 ? (
                            data?.skillsRequired.map((skill: any, index: any) => (
                                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{skill.name}</span>
                            ))
                        ):(
                            <p>No skill added</p>
                        )}
                    </div>
                </div>
                
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">About the client</h2>
                <div className="space-y-2">
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Payment method verified</p>
                    {/* <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-sm">5</span>
                    </div> */}
                    <p className="text-sm text-gray-500">Name: {data.createdBy.name}</p>
                    <p className="text-sm text-gray-500">Email: {data.createdBy.email}</p>
                    {/* <p className="text-sm text-gray-500">1 jobs posted</p> */}
                    {/* <p className="text-sm text-gray-500">₹32K total spent</p> */}
                    {/* <p className="text-sm text-gray-500">Individual client</p> */}
                    <p className="text-sm text-gray-500">Member since: {posted(data.createdAt)}</p>
                </div>
            </div>
            {data.proposals.includes(freelancer?._id) ? (
                
                <div className="flex gap-4">
                    <button className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors">
                    Already sent the proposal
                </button>
                </div>
            ):(
                <div className="flex gap-4">
                <button onClick={openModal} className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors">
                    Sent a Proposal
                </button>
                <button className="flex-1 border border-green-500 text-green-500 py-3 rounded-md hover:bg-green-50 transition-colors flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Save job
                </button>
            </div>
            )}
            

            {modalOpen && (
                <SendProposal onClose={closeModal} data={data} />
            )}
        </div>
    )
}