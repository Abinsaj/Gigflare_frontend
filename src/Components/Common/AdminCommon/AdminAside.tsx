import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const AdminAside = () => {
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  return (
    <>

      <div className="min-h-screen flex">
        {/* Aside Component */}
        <aside
          className={`${isCollapsed ? "w-16" : "w-64"
            } h-screen bg-gray-800 text-white transition-all duration-300 fixed lg:static lg:block ${isAsideOpen ? "block" : "hidden"
            } lg:block`}
        >
          <nav className="h-full flex flex-col justify-between px-10 p-4 bg-white border border-l text-black">
            <div>
              <div
                className="cursor-pointer text-xl font-bold text-center mb-8"
                onClick={() => navigate("/admin/dashboard")}
              >
                <span className={`${isCollapsed ? "hidden" : ""}`}>GIGFLARE</span>
              </div>
              <ul className="space-y-4">
                <li className="cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                  <a className="block p-2 hover:bg-gray-700 rounded transition-all">
                    {isCollapsed ? "D" : "Dashboard"}
                  </a>
                </li>
                <li className="cursor-pointer" onClick={() => navigate("/admin/users")}>
                  <a className="block p-2 hover:bg-gray-700 rounded transition-all">
                    {isCollapsed ? "U" : "Users"}
                  </a>
                </li>
                <li className="cursor-pointer" onClick={() => navigate("/admin/technicians")}>
                  <a className="block p-2 hover:bg-gray-700 rounded transition-all">
                    {isCollapsed ? "T" : "Technicians"}
                  </a>
                </li>
                <li className="cursor-pointer" onClick={() => navigate("/admin/bookings")}>
                  <a className="block p-2 hover:bg-gray-700 rounded transition-all">
                    {isCollapsed ? "B" : "Bookings"}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content Wrapper */}
        <div
          className={`flex-1 lg:ml-${isCollapsed ? "16" : "0"
            } ml-0 transition-all duration-300 min-h-screen flex flex-col`}
        >
          {/* Navbar Component */}
          <nav className="bg-white h-16 flex items-center justify-between px-4 shadow-md z-50 w-full relative">
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

          {/* Main Content */}
          <main className="p-4 flex-1">
            {/* Add your main content here */}
            <h1 className="text-gray-900">Welcome to the Admin Dashboard</h1>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminAside
