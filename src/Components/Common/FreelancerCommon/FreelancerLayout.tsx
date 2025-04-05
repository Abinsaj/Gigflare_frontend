import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Home, FileText, TrendingUp, ArrowLeft, FileCheck ,Briefcase, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useFreelancer } from '../../../context/FreelancerContext/FreelancerData'

const FreelancerLayout = () => {

    const { freelancer } = useFreelancer()
    const navigate = useNavigate()
    console.log(freelancer,'this is the freelancer we get in layout')

    const navItem = [
        { path: 'dashboard', icon: Home, label: 'Dashboard' },
        { path: 'proposal', icon: FileText, label: 'Proposal' },
        { path: 'offers', icon: Briefcase, label: 'Offers' },
        { path: 'contractlist', icon: FileCheck, label: 'Contract' },
        { path: 'worklist', icon: Briefcase, label: 'Works' },
        { path: 'transactions', icon: TrendingUp, label: 'Transactions' },
    ]

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-80 h-screen flex-shrink-0 overflow-y-auto bg-gray-200">
                    <div className="sticky top-0 p-5 h-full flex flex-col">
                    <ArrowLeft onClick={()=>navigate('/freelancer/home')}/>
                        <div className="mb-8">
                            <div className="pl-16 ml-2 mb-6">
                                {freelancer?.profile?(
                                    <img
                                        src={freelancer?.profile}
                                        alt="Uploaded preview"
                                        className="h-36 w-36 rounded-full object-cover"
                                    />
                                ):(
                                    <User className='h-36 w-36'/>
                                )}
                            </div>
                            <h2 className="text-gray-700 text-center text-xl font-semibold mb-4">{freelancer?.firstName} {freelancer?.lastName}</h2>
                            <p className="text-gray-500 text-center">{freelancer?.email}</p>
                        </div>

                        {/* Navigation */}
                        <div className="bg-white shadow-md w-full rounded-md p-6 flex-grow flex flex-col">
                            <nav className="space-y-1 w-full">
                                {navItem.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-5 text-base font-medium rounded-md ${isActive
                                                ? 'bg-gray-900 text-white'
                                                : 'text-black hover:bg-gray-800 hover:text-white'
                                            }`
                                        }
                                    //   end={item.path === "/freelancer/dashboard"}
                                    >
                                        <item.icon className="mr-4 h-5 w-5" aria-hidden="true" />
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Your main content goes here */}
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default FreelancerLayout
