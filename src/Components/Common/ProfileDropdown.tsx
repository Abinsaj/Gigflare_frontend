// import { UserCircleIcon } from '@heroicons/react/24/outline'
import {  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { User } from '../../Types/userInterface'
import { getUserInfo } from '../../Services/userServices/userAxiosCalls'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../Redux/slices/userSlice'

const ProfileDropdown = ({userData}: any) => {

    const dispatch = useDispatch()

    const handleLogout = async () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        dispatch(clearUser())
        console.log('its here and userInfo and accessToken has been removed')
        window.location.href = '/'
    }
    
    return (
        <>

            <Menu as="div" className="relative z-50">
                <div>
                    <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-8 w-8 rounded-full"
                        />
                    </MenuButton>
                </div>
                <MenuItems
                    transition
                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <MenuItem>
                        <a href="/freelancer/Freelancerprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Your Profile
                        </a>
                    </MenuItem>
                    <MenuItem>
                    {userData?.isFreelancer ? (
                        <a href="/" className="block px-4 py-2 text-sm text-lime-600 text-bold hover:bg-gray-100">
                            Switch to User
                        </a>
                    ):(
                        <a href="/freelancer/home" className="block px-4 py-2 text-sm text-lime-600 text-bold hover:bg-gray-100">
                            Be a Freelancer
                        </a>
                    )}
                        
                    </MenuItem>
                    <MenuItem>
                        <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign out
                        </a>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </>
    )
}

export default ProfileDropdown
