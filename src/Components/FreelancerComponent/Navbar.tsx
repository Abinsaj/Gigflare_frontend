import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import ProfileDropdown from '../Common/ProfileDropdown'
import { User } from '../../Types/userInterface'
import { getUserInfo } from '../../Services/userServices/userAxiosCalls'
import { useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useSocket } from '../../context/SocketContext'
import { getFreelancerNotification } from '../../Services/freelancerService/freelancerAxiosCalls';
import useNotification from '../../zustand/useNotification';
import useListenNotification from '../../hooks/useListenNotification';
import {timeAgo} from '../../config/timeAgo';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConverstation';
import useGetNotification from '../../hooks/useGetNotification';

const Navbar = () => {

    const navigate = useNavigate()
    const [isAsideOpen, setIsAsideOpen] = useState(false)
    const [userData, setUserData] = useState<User | null>(null)
    const data: any = useSelector((state: RootState) => state.user.userInfo)
    const {notifications} = useGetNotification()
    const { messages } = useConversation()
    console.log(notifications,'this is the notification we got')
    useListenNotification()
    useListenMessages()

    useEffect(() => {
        const fetch = async () => {
            let response = await getUserInfo(data?._id)
            console.log(response, ' response in the header is error')
            setUserData(response.data)
        }
        if (data !== null) {

            fetch()
        }
    }, [data])


    const goToPage = (type: 'offer' | 'proposal' | 'message' | 'contract')=>{
        if(type === 'offer'){
            navigate('/freelancer/offers')
        }else if(type == 'message'){
            navigate('/freelancer/freelancermessage')
        }else if(type == 'contract'){
            navigate('/freelancer/contractlist')
        }
    }

    return (
        <>
            <nav className="bg-black h-16 flex items-center justify-between px-4 shadow-md z-50 w-full relative">
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
                        <p onClick={() => navigate('/freelancer/dashboard')} className='text-sm font-semibold hover:text-green-500'>DASHBOARD</p>
                        <p onClick={() => navigate('/freelancer/joblist')} className='text-sm font-semibold hover:text-green-500'>FIND WORK</p>
                    </div>
                ) : (
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

                    {/* Notification Icon */}
                    <Menu as="div" className="relative">
                        <MenuButton className="rounded-full p-1 text-gray-400 hover:text-gray-300 focus:outline-none">
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                            {notifications?.length > 0 && (
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 "></span>
                            )}
                        </MenuButton>
                        <MenuItems
                            className="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-sm bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div className="px-4 py-3 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Notifications ({notifications?.length || 0})
                                </h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications?.length > 0 ? (
                                    notifications.map((notif: any, index: number) => (
                                        <MenuItem
                                            key={index}
                                            as="div"
                                            className="group"
                                        >
                                            <div className="flex items-center px-4 py-3 hover:bg-gray-50">
                                                <div className="flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <BellIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                                                    </div>
                                                </div>
                                                <div onClick={()=>goToPage(notif.type)} className="ml-3 flex-1">
                                                    <p className="text-sm text-gray-900">{notif.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{timeAgo(notif.createdAt)}</p>
                                                </div>
                                            </div>
                                        </MenuItem>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <p className="text-sm text-gray-500">No new notifications</p>
                                    </div>
                                )}
                            </div>
                        </MenuItems>
                    </Menu>

                    <button
                        type="button"
                        className="relative rounded-full bg-black p-1 text-gray-400"
                    >
                        <span className="sr-only">View messages</span>
                        <Mail onClick={() => navigate('/freelancer/freelancermessage')} className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile Icon */}
                    {/* <button
                        type="button"
                        className="rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <span className="sr-only">View profile</span>
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                    <ProfileDropdown userData={userData} />
                </div>
            </nav>
        </>
    )
}

export default Navbar
