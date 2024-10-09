import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  return (
    <>
      <div className='w-full h-full'>
      <Disclosure as="nav" className="bg-[#1C1C1C]">
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
                  src={require('../../Assets/logo.jpg')}
                  className="h-10 w-auto "
                />
              </div>

            </div>
            <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Search bar */}
              <div className="relative hidden items-center w-80 h-10 sm:flex">
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
                className="relative rounded-full bg-[#1C1C1C] p-1 text-gray-400"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Message Icon */}


              {/* Profile dropdown */}
              <Menu as="div" className="relative">
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
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

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
          </div>
        </DisclosurePanel>
      </Disclosure>
      </div>
    </>
  )
}

export default Dashboard
