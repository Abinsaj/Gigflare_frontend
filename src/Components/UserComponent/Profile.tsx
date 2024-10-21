import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserCircleIcon, MapPinIcon, ClockIcon } from 'lucide-react'
import { RootState } from '../../Redux/store'
import UserDetails from './UserDetails'
import PostJob from './PostJob'


const ProfileContent = () => (
  <div className='bg-white w-full p-6 rounded-md shadow-md'>
    <h2 className="text-2xl font-semibold mb-4">Profile Content</h2>
    <p>This is where the profile content would go.</p>
  </div>
)


const AddJobContent = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Add a New Job</h2>
    <p>Here you can add a new job listing.</p>
  </div>
)

const Logout = ()=>(
  <>
  </>
)

export default function Profile() {
  const menuItems = [
    { name: 'Profile', Component: ProfileContent },
    { name: 'Personal Info', Component: UserDetails },
    { name: 'Add Job', Component: PostJob },
    // { name: 'Wallet', Component: AddJobContent },
    // { name: 'Contract', Component: AddJobContent },
    { name: 'Logout',Component: Logout},
  ]

  const [activeItem, setActiveItem] = useState(menuItems[0].name)

  const data: any = useSelector((state: RootState) => state.user.userInfo)

  return (
    <div className='w-full  pb-10 flex flex-col bg-gray-100'>
      <div className=" relative">
        <div
          className="h-60 bg-cover bg-center m-8 rounded-lg"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
        ></div>
        <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl overflow-hidden">
            <div className="relative flex items-center">
              <UserCircleIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
              <div className="ml-4">
                <h1 className="text-xl font-bold">{data.name}</h1>
                <p className='text-sm text-gray-400'>{data.email}</p>
              </div>
              <div className="ml-auto flex flex-col items-end text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className='w-4 h-4 mr-2' />
                  <span>Location in India</span>
                </div>
                <div className="flex items-center mt-2">
                  <ClockIcon className='w-4 h-4 mr-2' />
                  <span>Joined in {new Date(data.created_At).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row mt-24 px-8'>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <div className="bg-white  rounded-md shadow-md p-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-md cursor-pointer transition-colors font-medium ${
                  activeItem === item.name ? 'bg-[#1AA803] text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-3/4 md:pl-8">
          
            {menuItems.find(item => item.name === activeItem)?.Component()}
       
        </div>
      </div>
    </div>
  )
}