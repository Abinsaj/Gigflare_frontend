import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserCircleIcon, MapPinIcon, ClockIcon,Camera } from 'lucide-react'
import { RootState } from '../../Redux/store'
import UserDetails from './UserDetails'
import JobPost from './JobPost'
import BlockChecker from '../../Services/userServices/blockChecker'
import UserChangePass from './UserChangePass'
import Jobs from './Jobs'


const ProfileContent = () => {

  const user = useSelector((state: RootState)=>state.user.userInfo)

return (
  <div className='bg-white w-full p-6 rounded-md shadow-md'>
    <h2 className="text-2xl font-semibold mb-4">Profile Content</h2>
    <p>
Welcome to your profile, {user?.name}! We’re excited to have you on board as part of our community. This is where your vision meets talent, and your projects come to life.

Whether you’re looking for creative designers, expert developers, skilled writers, or any other professional, this is your space to connect with top freelancers who are ready to bring your ideas to reality. Your profile is the gateway to discovering the right talent, managing your projects, and turning your ambitions into achievements.

Take a moment to explore, post your job listings, and review proposals from skilled professionals. Remember, every successful project starts with the right collaboration, and we’re here to make the journey smooth and rewarding. Let’s build something extraordinary together!</p>
  </div>
)
}

const Logout = ()=>(
  <>
  </>
)

export default function Profile() {



  BlockChecker()


  const menuItems = [
    { name: 'Profile', Component: ProfileContent },
    { name: 'Personal Info', Component: UserDetails },
    {name: "Change Password",Component: UserChangePass},
    { name: 'Logout',Component: Logout},
  ]

  const [activeItem, setActiveItem] = useState(menuItems[0].name)

  const handleMenuItem = (name: string)=>{
    setActiveItem(name)
  }

  const data: any = useSelector((state: RootState) => state.user.userInfo)
  console.log(data, 'we are getting _id in the frontend ')

  const activeComponent = menuItems.find(item => item.name === activeItem)?.Component;

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleClick = () => {
        document.getElementById('fileInput')?.click()
    }

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
            <div className='relative'>
            <UserCircleIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
            {selectedImage && (
                <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected preview"
                    className="h-24 w-24 rounded-full object-cover absolute top-0 left-0"
                />
            )}
            <button
                type="button"
                onClick={handleClick}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow"
            >
                <Camera className="w-4 h-4" />
            </button>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the actual file input
            />
        </div>
              
              <div className="ml-4">
                <h1 className="text-xl font-bold">{data.name}</h1>
                <p className='text-sm text-gray-400'>{data.email}</p>
              </div>
              <div className="ml-auto flex flex-col items-end text-sm text-gray-600">
                {/* <div className="flex items-center">
                  <MapPinIcon className='w-4 h-4 mr-2' />
                  <span>Location in India</span>
                </div> */}
                {/* <div className="flex items-center mt-2">
                  <ClockIcon className='w-4 h-4 mr-2' />
                  <span>Joined in {new Date(data.created_At).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row mt-24 px-8'>
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <div className="bg-white  rounded-md shadow-md p-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-md cursor-pointer transition-colors font-medium ${
                  activeItem === item.name ? 'bg-[#1AA803] text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => handleMenuItem(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-4/5 md:pl-8">
          
        {activeComponent ? React.createElement(activeComponent) : <div>No component found</div>}
       
        </div>
      </div>
    </div>
  )
}