import { Disclosure, Menu } from '@headlessui/react'
import { Menu as MenuIcon, X, Bell, Search, Mail, ChevronDown, User, LogOut, Briefcase, FileText, Users } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../../../Redux/slices/userSlice'
import { userLoggedOut } from '../../../Services/userServices/userAxiosCalls'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const handleLogout = async () => {
    const id = userInfo?._id
    const response = await userLoggedOut()
    console.log(response,'this is the response after we logout the user')
    if(response.success){
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      dispatch(clearUser())
      window.location.href = '/'
    }
    
  }

  return (
    <Disclosure as="nav" className="bg-black bg-opacity-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={require('../../../Assets/logo.jpg')}
                    className="h-10 w-auto cursor-pointer"
                    onClick={() => navigate('/')}
                  />
                </div>

                <div className='flex justify-center items-center space-x-5 pl-14 text-gray-300'>
                  <p onClick={() => navigate('/')} className='text-sm font-semibold hover:text-[#1AA803] cursor-pointer'>HOME</p>
                  <p onClick={() => navigate('/freelancerslist')} className='text-sm font-semibold hover:text-[#1AA803] cursor-pointer'>FIND TALENT</p>
                  
                  {/* <Menu as="div" className="relative z-50 inline-block text-left">
                    <Menu.Button className="inline-flex items-center text-sm font-semibold hover:text-[#1AA803]">
                      FIND TALENT
                    </Menu.Button>
                    <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white divide-y divide-gray-100 rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              onClick={() => navigate('/freelancerslist')}
                            >
                              Browse Freelancers
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              Post a Job
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu> */}
                  
                  <Menu as="div" className="relative z-50 inline-block text-center">
                    <Menu.Button className="inline-flex items-center text-sm font-semibold hover:text-[#1AA803]">
                      JOBS
                      <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute left-0 mt-2 w-52 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                              } group flex items-center w-full px-2 py-2 pl-4 text-sm`}
                              onClick={()=>navigate('/joblist')}
                            >
                              <Briefcase className="inline-block w-4 h-4 mr-2" />
                              All Job Post
                            </button>
                          )}
                        </Menu.Item>
                        <div className=" border-gray-200 my-1"></div>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                              } group flex  items-center w-full px-2 py-2 text-sm`}
                              onClick={()=>navigate('/proposals')}
                            >
                              Proposals
                            </button>
                          )}
                        </Menu.Item> */}
                        <div className=" border-gray-200 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                              } group flex  items-center w-full px-2 py-2 pl-4 text-sm`}
                              onClick={()=>navigate('/contracts')}
                            >
                              <FileText className="inline-block w-4 h-4 mr-2" />
                              Contracts
                            </button>
                          )}
                        </Menu.Item>
                        <div className=" border-gray-200 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                              } group flex items-center w-full px-2 py-2 pl-4 text-sm`}
                            >
                              <Users className="inline-block w-4 h-4 mr-2" />
                              All Hire
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>

              {userInfo ? (
                <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <div className="relative hidden items-center w-80 h-8 sm:flex">
                    <Search
                      className="absolute left-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      className="block w-full h-full pl-10 pr-7 rounded-md border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                  </div> */}

                  <button
                    type="button"
                    className="relative rounded-full bg-black p-1 text-gray-400"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="relative rounded-full bg-black p-1 text-gray-400"
                  >
                    <span className="sr-only">View messages</span>
                    <Mail onClick={()=>navigate('/message')} className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full"
                      />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            <User className="inline-block w-4 h-4 mr-2" />
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/freelancer/home"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-lime-600 font-bold`}
                          >
                            {userInfo.isFreelancer ? 'Freelance home' : 'Be a Freelancer'}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            <LogOut className="inline-block w-4 h-4 mr-2" />
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-white text-sm hover:text-green-500">
                    LOG IN
                  </Link>
                  <span className="text-white">|</span>
                  <Link to="/signup" className="text-white text-sm hover:text-green-500">
                    SIGN UP
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="relative flex items-center w-full h-10">
                <Search
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar