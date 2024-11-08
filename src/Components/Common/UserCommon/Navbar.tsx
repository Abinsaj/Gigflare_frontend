
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'

import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../../../Redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { User } from '../../../Types/userInterface'
import BlockChecker from '../../../Services/userServices/blockChecker'


const Navbar = () => {

    // const navigation = [
    //     { name: 'Dashboard', href: '#', current: true },
    //     { name: 'Team', href: '#', current: false },
    //     { name: 'Projects', href: '#', current: false },
    //     { name: 'Calendar', href: '#', current: false },
    // ]

    // function classNames(...classes: any) {
    //     return classes.filter(Boolean).join(' ')
    // },
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    console.log(userInfo, 'this is the userInfo we get')





    const handleLogout = async () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        dispatch(clearUser())
        console.log('its here and userInfo and accessToken has been removed')
        window.location.href = '/'
    }

    return (
        <>
            <Disclosure as="nav" className="bg-black bg-opacity-100">
                <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src={require('../../../Assets/logo.jpg')}
                                    className="h-10 w-auto "
                                    onClick={()=>navigate('/')}
                                />
                            </div>

                            <div className='flex justify-center items-center space-x-5 pl-14 text-gray-300 '>
                                <p onClick={()=>navigate('/')} className='text-sm'>HOME</p>
                                <p onClick={()=>navigate('/freelancerslist')} className='text-sm'>FIND TALENT</p>  
                            </div>

                        </div>

                        {userInfo ? (
                            <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Search bar */}
                                <div className="relative hidden items-center w-80 h-8 sm:flex">
                                    <MagnifyingGlassIcon
                                        className="absolute left-3 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="block w-full h-full pl-10 pr-7 rounded-md border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                    />
                                </div>

                                {/* Bell Icon */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-black p-1 text-gray-400 r"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                {/* Message Icon */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-black p-1 text-gray-400 "
                                >
                                    <span className="sr-only">View messages</span>
                                    <EnvelopeIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                {/* Profile dropdown */}
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
                                            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Your Profile
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            {userInfo.isFreelancer ?
                                                (
                                                    <a href="/freelancer/home" className="block px-4 py-2 text-sm text-lime-600 text-bold hover:bg-gray-100">
                                                        Freelance home
                                                    </a>
                                                ) : (
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
                            </div>
                        ) : (
                            <>
                                <Link to={'/login'} className='text-white text-sm hover:text-green-500'>LOG IN</Link>
                                <p className='pl-1 pr-1 text-white'>|</p>
                                <Link to={'/signup'} className='text-white text-sm hover:text-green-500'>SIGN UP</Link>
                            </>
                        )}



                    </div>
                </div>

                {/* Mobile Search */}

                <DisclosurePanel className="sm:hidden">

                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <div className="relative flex items-center w-full h-10">
                            <MagnifyingGlassIcon
                                className="absolute left-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                className="block w-full h-full pl-10 pr-3 rounded-md border border-gray-300 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                            />
                        </div>
                        {/* {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >

                            </DisclosureButton>
                        ))} */}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    )
}

export default Navbar
