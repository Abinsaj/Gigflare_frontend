import React from 'react'
import { ArrowLeft, Clock, CheckCircle, Heart, DollarSign, MapPin } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import timeAgo from '../../config/timeAgo';

export default function ViewJobDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const {data} = location.state || {};


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
                <p className="text-sm">
                    Specialized profiles can help you better highlight your expertise when submitting proposals to jobs like these. <a href="#" className="text-green-600 hover:underline">Create a specialized profile.</a>
                </p>
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
                    <p className="text-lg font-semibold">Intermediate</p>
                    <p className="text-sm text-gray-500">Experience Level</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="font-semibold mb-2">Project Type:</p>
                <p>One-time project</p>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <p className="font-semibold mb-2">Full Stack Development Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {data?.skillsRequired.map((skill: any,index: any)=>(
                            <span key={index}className="px-3 py-1 bg-gray-200 rounded-full text-sm">{skill}</span>
                        ))}
                    </div>
                </div>
                {/* <div>
                    <p className="font-semibold mb-2">Full Stack Development Languages</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">JavaScript</span>
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">CSS</span>
                    </div>
                </div>
                <div>
                    <p className="font-semibold mb-2">Databases</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">MongoDB</span>
                    </div>
                </div>
                <div>
                    <p className="font-semibold mb-2">Other</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">React</span>
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Full Stack Development</span>
                    </div>
                </div> */}
            </div>

            <div className="flex mb-6">
                <div className="w-1/2">
                    <h2 className="text-lg font-semibold mb-4">Preferred qualifications</h2>
                </div>
                <div className="w-1/2">
                    <h2 className="text-lg font-semibold mb-4">Activity on this job</h2>
                    <div className="space-y-2 text-sm">
                        <p>Proposals: <span className="bg-gray-200 px-2 py-1 rounded-full">20 to 50</span></p>
                        <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Last viewed by client: 1 hour ago</p>
                        <p>Interviewing: 1</p>
                        <p>Invites sent: 1</p>
                        <p>Unanswered invites: 0</p>
                    </div>
                </div>
            </div>

            {/* <div className="mb-6">
                <p className="text-sm text-gray-500">Upgrade your membership to see the bid range <span className="text-green-600">?</span></p>
            </div> */}

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">About the client</h2>
                <div className="space-y-2">
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Payment method verified</p>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-sm">5</span>
                    </div>
                    <p className="text-sm text-gray-500">5.00 of 1,429 reviews</p>
                    <p className="flex items-center text-sm text-gray-500"><MapPin className="w-4 h-4 mr-2" /> United Kingdom</p>
                    <p className="text-sm text-gray-500">Dogmersfield 7:34 PM</p>
                    <p className="text-sm text-gray-500">1,029 jobs posted</p>
                    <p className="text-sm text-gray-500">94% hire rate, 69 open jobs</p>
                    <p className="text-sm text-gray-500">$32K total spent</p>
                    <p className="text-sm text-gray-500">1,551 hires, 37 active</p>
                    <p className="text-sm text-gray-500">$7.35 /hr avg hourly rate paid</p>
                    <p className="text-sm text-gray-500">767 hours</p>
                    <p className="text-sm text-gray-500">Tech & IT</p>
                    <p className="text-sm text-gray-500">Individual client</p>
                    <p className="text-sm text-gray-500">Member since Jun 04, 2023</p>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors">
                    Apply for the job
                </button>
                <button className="flex-1 border border-green-500 text-green-500 py-3 rounded-md hover:bg-green-50 transition-colors flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Save job
                </button>
            </div>
        </div>
    )
}