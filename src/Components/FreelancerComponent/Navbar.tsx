import React, { useState } from 'react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(false)
    return (
        <>
            <nav className="bg-[#1C1C1C] h-16 flex items-center justify-between px-4 shadow-md z-50 w-full relative">
                <div className="flex flex-shrink-0 items-center">
                    <img
                        alt="Your Company"
                        src={require('../../Assets/logo.jpg')}
                        className="h-10 w-auto "
                    />
                </div>
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

                    {/* Profile Icon */}
                    <button
                        type="button"
                        className="rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <span className="sr-only">View profile</span>
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
