import React, { useContext, useEffect, useState } from 'react'
import { Home, Folder, FileText, BarChart2, UserCircle } from 'lucide-react'
import BlockChecker from '../../Services/userServices/blockChecker'
import { useLocation } from 'react-router-dom'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'

export default function Dashboard() {

  BlockChecker()
  const location = useLocation()
  const [freelancerData, setFreelancerData] = useState<any>()

  const {freelancer} = useFreelancer()
  console.log(freelancer,' this is the freelancer data in dashboard')
  useEffect(()=>{
    
    setFreelancerData(freelancer)
  },[freelancer])

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="p-5">
          <div className="relative mb-20">
            <div
              className="h-60 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
            ></div>
            <div className="absolute bottom-[-70px] left-0 right-0 flex flex-col justify-center items-center">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, <span className="text-gray-50"> {freelancerData?.firstName}</span>
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 w-4/5 gap-6 mb-6">
                <div className="bg-white rounded-md p-6 shadow-sm text-black">
                  <h2 className="text-2xl font-bold mb-4">Earnings</h2>
                  <p className="text-4xl font-bold">€8,350</p>
                  <p className="text-sm mt-2">+10% since last month</p>
                </div>
                <div className="bg-white rounded-md p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Rank</h3>
                    <p className="text-gray-500">In top 30%</p>
                  </div>
                  <div className="text-4xl font-bold text-gray-800">98</div>
                </div>
                <div className="bg-white rounded-md p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Projects</h3>
                    <p className="text-gray-500">8 this month</p>
                  </div>
                  <div className="text-4xl font-bold text-gray-800">32</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional content */}
          <div className="mt-24 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {[
                { name: 'Logo design for Bakery', daysRemaining: 1, image: '/placeholder.svg?height=40&width=40' },
                { name: 'Personal branding project', daysRemaining: 5, image: '/placeholder.svg?height=40&width=40' },
              ].map((project, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-md">
                  <img src={project.image} alt={project.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.daysRemaining} days remaining</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Recent Invoices</h2>
            <div className="space-y-4">
              {[
                { name: 'Alexander Williams', company: 'JQ Holdings', amount: 1200.87, status: 'Paid', image: '/placeholder.svg?height=40&width=40' },
                { name: 'John Philips', company: 'Inchor Techs', amount: 12989.88, status: 'Late', image: '/placeholder.svg?height=40&width=40' },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <img src={invoice.image} alt={invoice.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="font-medium">{invoice.name}</h3>
                      <p className="text-sm text-gray-500">{invoice.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€ {invoice.amount.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}