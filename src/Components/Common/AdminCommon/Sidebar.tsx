import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, UserCircle, FileText, Tags, CreditCard, Clipboard } from 'lucide-react'

const Sidebar = () => {

  const [activeItem, setActiveItem] = useState("DASHBOARD")

  const navItems = [
    { path: "/admin/", icon: LayoutDashboard, label: "DASHBOARD" },
    { path: "/admin/applications", icon: Clipboard, label: "REQUESTS" },
    { path: "/admin/freelancers", icon: Users, label: "FREELANCERS" },
    { path: "/admin/users", icon: UserCircle, label: "CLIENTS" },
    { path: "/admin/categories", icon: Tags, label: "CATEGORY" },
    { path: "/admin/jobs", icon: CreditCard, label: "JOBS" },
    { path: "/admin/contracts", icon: FileText, label: "CONTRACTS" },
    { path: "/admin/payment", icon: CreditCard, label: "PAYMENT" },
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">GIGFLARE</h1>
      </div>
      <nav className="mt-6 w-5/6 ml-5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-2 text-gray-600 ${
                isActive ? 'bg-[#003F62]  rounded-md text-white' : 'hover:bg-#003F62] '
              }`
            }
            end={item.path === "/admin/"}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar