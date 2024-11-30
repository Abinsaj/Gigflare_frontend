import React, { useEffect, useState } from 'react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import ProfileDropdown from '../Common/ProfileDropdown'
import { User } from '../../Types/userInterface'
import { getUserInfo } from '../../Services/userServices/userAxiosCalls'
import { useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'

const Navbar = () => {

    const navigate = useNavigate()
    const [isAsideOpen, setIsAsideOpen] = useState(false)

    const [ userData, setUserData] = useState<User | null>(null)
    const data: any = useSelector((state:RootState)=>state.user.userInfo)

    useEffect(()=>{
        const fetch = async()=>{
            let response = await getUserInfo(data?._id)
            console.log(response,' response in the header is error')
            setUserData(response.data)
        }
        if(data !== null){

            fetch()
        }
    },[data]) 

    console.log(userData,'this is the userData')

    return (
        <>
            <nav className="bg-[#1C1C1C] h-16 flex items-center justify-between px-4 shadow-md z-50 w-full relative">
                <div className="flex flex-shrink-0 items-center">
                    <img
                        alt="Your Company"
                        src={require('../../Assets/logo.jpg')}
                        className="h-10 w-auto "
                        onClick={()=>navigate('/freelancer/home')}
                    />
                </div>
                {userData?.isFreelancer == true ? (
                    <div className='flex justify-center space-x-5 pl-14 text-gray-300'>
                    <p onClick={()=>navigate('/freelancer/dashboard')} className='text-sm font-semibold hover:text-green-500'>DASHBOARD</p>
                    <p onClick={()=>navigate('/freelancer/joblist')} className='text-sm font-semibold hover:text-green-500'>FIND WORK</p>
                </div>
                ):(
                    <div className='flex justify-center space-x-5 pl-14 text-gray-300'>
                    {/* <p className='text-sm font-semibold hover:text-green-500'>DASHBOARD</p>
                    <p className='text-sm font-semibold hover:text-green-500'>FIND WORK</p> */}
                </div>
                )}
                
                {/* Menu Button (Visible on Small Screens) */}
                <button
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setIsAsideOpen(!isAsideOpen)}
                >
                    {isAsideOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>

                {/* Right side of Navbar */}
                <div className="flex items-center space-x-4 ml-auto">
                    {/* Search Input */}
                    <div className="hidden lg:flex items-center bg-gray-100 rounded-md px-3 py-1">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-gray-700 focus:outline-none"
                        />
                    </div>

                    {/* Notification Icon */}
                    <button
                        type="button"
                        className="rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button
                    type="button"
                    className="relative rounded-full bg-black p-1 text-gray-400"
                  >
                    <span className="sr-only">View messages</span>
                    <Mail onClick={()=>navigate('/freelancer/freelancermessage')} className="h-6 w-6" aria-hidden="true" />
                  </button>

                    {/* Profile Icon */}
                    {/* <button
                        type="button"
                        className="rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <span className="sr-only">View profile</span>
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                    <ProfileDropdown userData = {userData}/>
                </div>
            </nav>
        </>
    )
}

export default Navbar
