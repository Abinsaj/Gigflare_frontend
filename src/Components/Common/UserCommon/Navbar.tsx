import { MenuIcon, X, Mail, ChevronDown, User, LogOut, Briefcase, FileText, TrendingUp, Users } from "lucide-react"
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../Redux/store"
import { Link, useNavigate } from "react-router-dom"
import { clearUser } from "../../../Redux/slices/userSlice"
import { userLoggedOut } from "../../../Services/userServices/userAxiosCalls"
import useNotification from "../../../zustand/useNotification"
import useListenNotification from "../../../hooks/useListenNotification"
import { timeAgo } from "../../../config/timeAgo"
import useConversation from "../../../zustand/useConverstation"
import useListenMessages from "../../../hooks/useListenMessages"
import useGetNotification from "../../../hooks/useGetNotification"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { messages } = useConversation()

  let message = 0
  useGetNotification()
  const { notifications, setNotifications } = useNotification()
  useListenMessages()
  useListenNotification()

  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const result = messages.forEach((val: any) => {
    if (val.sender !== userInfo?._id) {
      message++
    }
  })

  const handleLogout = async () => {
    const id = userInfo?._id
    const response = await userLoggedOut()
    if (response.success) {
      localStorage.removeItem("userInfo")
      localStorage.removeItem("accessToken")
      dispatch(clearUser())
      window.location.href = "/"
    }
  }

  const goToPage = async (notification: any) => {
    if (notification.type == "proposal") {
      navigate("/joblist")
    }
    if (notification.type == "contract") {
      navigate("/contracts")
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
                    src={require("../../../Assets/logo.jpg") || "/placeholder.svg"}
                    className="h-8 w-auto cursor-pointer sm:h-10"
                    onClick={() => navigate("/")}
                  />
                </div>

                {userInfo && (
                  <div className="hidden sm:flex justify-center items-center space-x-5 pl-14 text-gray-300">
                    <p
                      onClick={() => navigate("/")}
                      className="text-sm font-semibold hover:text-[#1AA803] cursor-pointer"
                    >
                      HOME
                    </p>
                    <p
                      onClick={() => navigate("/freelancerslist")}
                      className="text-sm font-semibold hover:text-[#1AA803] cursor-pointer"
                    >
                      FIND TALENT
                    </p>
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="text-sm font-semibold text-gray-300 hover:text-[#1AA803] cursor-pointer flex items-center">
                        JOBS
                        <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Menu.Button>
                      <Menu.Items 
  className="absolute left-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
>
                        <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                                } group flex items-center w-full px-2 py-2 pl-4 text-sm`}
                              onClick={() => navigate('/joblist')}
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
                              className={`${active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                                } group flex  items-center w-full px-2 py-2 pl-4 text-sm`}
                              onClick={() => navigate('/contracts')}
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
                              className={`${active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                                } group flex items-center w-full px-2 py-2 pl-4 text-sm`}
                                onClick={()=>navigate('/transactions')}
                            >
                              <TrendingUp className="inline-block w-4 h-4 mr-2" />
                              Transactions
                            </button>
                          )}
                        </Menu.Item>
                        <div className=" border-gray-200 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-[#1AA803] text-white' : 'text-gray-900'
                                } group flex items-center w-full px-2 py-2 pl-4 text-sm`}
                                onClick={()=>navigate('/worklist')}
                            >
                              <Users className="inline-block w-4 h-4 mr-2" />
                              All Works
                            </button>
                          )}
                        </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                )}
              </div>

              {userInfo ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:flex items-center space-x-2">
                    <Menu as="div" className="relative">
                      <MenuButton className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {notifications?.length > 0 && (
                          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        )}
                      </MenuButton>
                      <MenuItems className="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-sm bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <h3 className="text-sm font-semibold text-gray-900">
                            Notifications ({notifications?.length || 0})
                          </h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications?.length > 0 ? (
                            notifications.map((notif: any, index: number) => (
                              <MenuItem key={index} as="div" className="group">
                                <div className="flex items-center px-4 py-3 hover:bg-gray-50">
                                  <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                      <BellIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                                    </div>
                                  </div>
                                  <div onClick={() => goToPage(notif)} className="ml-3 flex-1">
                                    <p className="text-sm text-gray-900">{notif.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{timeAgo(notif.createdAt)}</p>
                                  </div>
                                </div>
                              </MenuItem>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center">
                              <p className="text-sm text-gray-500">No new notifications</p>
                            </div>
                          )}
                        </div>
                      </MenuItems>
                    </Menu>

                    <button
                      type="button"
                      className="relative rounded-full bg-black p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View messages</span>
                      <Mail onClick={() => navigate("/message")} className="h-6 w-6" aria-hidden="true" />
                      {message > 0 && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                      )}
                    </button>
                  </div>

                  <Menu as="div" className="relative ml-3">
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
                            className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
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
                            className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-lime-600 font-bold`}
                          >
                            {userInfo.isFreelancer ? "Freelance home" : "Be a Freelancer"}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
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
                <div className="hidden sm:flex items-center space-x-4">
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
              {userInfo ? (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    HOME
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/freelancerslist"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    FIND TALENT
                  </Disclosure.Button>
                  <Menu as="div" className="relative inline-block text-left w-full">
                    <Menu.Button className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      <div className="flex justify-between items-center">
                        <span>JOBS</span>
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </Menu.Button>
                    <Menu.Items className="mt-2 w-full origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/joblist"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                            >
                              All Job Post
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/contracts"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                            >
                              Contracts
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/transactions"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                            >
                              Transactions
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/worklist"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                            >
                              All Works
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                  <Disclosure.Button
                    as="a"
                    href="/notifications"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Notifications {notifications?.length > 0 && `(${notifications.length})`}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/message"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Messages {message > 0 && `(${message})`}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                  >
                    Sign out
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    LOG IN
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/signup"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    SIGN UP
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar

