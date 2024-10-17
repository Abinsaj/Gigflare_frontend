import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, UserCircle, FileText, Tags, CreditCard } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "DASHBOARD" },
    { path: "freelancers", icon: Users, label: "FREELANCERS" },
    { path: "users", icon: UserCircle, label: "CLIENTS" },
    { path: "/contracts", icon: FileText, label: "CONTRACTS" },
    { path: "/category-skills", icon: Tags, label: "CATEGORY" },
    { path: "/payment", icon: CreditCard, label: "PAYMENT" },
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">GIGFLARE</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-2 text-gray-600 ${
                isActive ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`
            }
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