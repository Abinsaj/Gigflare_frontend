import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import ProfileDropdown from "../Common/ProfileDropdown";
import { User } from "../../Types/userInterface";
import { getUserInfo } from "../../Services/userServices/userAxiosCalls";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import useGetNotification from "../../hooks/useGetNotification";
import useListenNotification from "../../hooks/useListenNotification";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConverstation";
import { timeAgo } from "../../config/timeAgo";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const data: any = useSelector((state: RootState) => state.user.userInfo);
  const { notifications } = useGetNotification();
  const { messages } = useConversation();

  useListenNotification();
  useListenMessages();

  useEffect(() => {
    const fetchUserInfo = async () => {
      let response = await getUserInfo(data?._id);
      setUserData(response.data);
    };
    if (data !== null) {
      fetchUserInfo();
    }
  }, [data]);

  const goToPage = (type: "offer" | "proposal" | "message" | "contract") => {
    if (type === "offer") {
      navigate("/freelancer/offers");
    } else if (type === "message") {
      navigate("/freelancer/freelancermessage");
    } else if (type === "contract") {
      navigate("/freelancer/contractlist");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black h-16 flex items-center justify-between px-4 shadow-md z-50 w-full relative">
        {/* Left: Logo & Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-500 hover:text-gray-300 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <img
            alt="Your Company"
            src={require("../../Assets/logo.jpg")}
            className="h-10 w-auto cursor-pointer"
            onClick={() => navigate(data?.isFreelancer ? "/freelancer/home" : "/")}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-start space-x-5 text-gray-300">
          {userData?.isFreelancer ? (
            <>
              <p
                onClick={() => navigate("/freelancer/dashboard")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
                DASHBOARD
              </p>
              <p
                onClick={() => navigate("/freelancer/joblist")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
                FIND WORK
              </p>
            </>
          ) : (
            <>
              <p
                onClick={() => navigate("/")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
        
              </p>
              <p
                onClick={() => navigate("/freelancerslist")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
   
              </p>
            </>
          )}
        </div>

        {/* Right Side Icons (Both Desktop & Mobile) */}
        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          {userData?.isFreelancer && (
            <Menu as="div" className="relative">
              <MenuButton className="rounded-full p-1 text-gray-400 hover:text-gray-300 focus:outline-none">
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {notifications?.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </MenuButton>

              {/* Notification Dropdown */}
              <MenuItems className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 lg:w-[28rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Notifications ({notifications?.length || 0})
                  </h3>
                </div>

                {/* Scrollable Notification List */}
                <div className="max-h-60 sm:max-h-80 md:max-h-96 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications.map((notif: any, index: number) => (
                      <MenuItem key={index} as="div" className="group">
                        <button
                          onClick={() => goToPage(notif.type)}
                          className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition duration-200 ease-in-out cursor-pointer focus:outline-none"
                        >
                          {/* Notification Icon */}
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <BellIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                            </div>
                          </div>

                          {/* Notification Content */}
                          <div className="ml-3 flex-1">
                            <p className="text-sm text-gray-900 font-medium truncate">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{timeAgo(notif.createdAt)}</p>
                          </div>
                        </button>
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
          )}

          {/* Messages */}
          {userData?.isFreelancer && (
            <button
              type="button"
              className="relative rounded-full bg-black p-1 text-gray-400"
              onClick={() => navigate("/freelancer/freelancermessage")}
            >
              <Mail className="h-6 w-6" aria-hidden="true" />
            </button>
          )}

          {/* Profile Dropdown */}
          <ProfileDropdown userData={userData} />
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black text-white p-4 space-y-4 absolute w-full z-50">
          {/* Dashboard & Find Work */}
          {userData?.isFreelancer ? (
            <>
              <p
                onClick={() => navigate("/freelancer/dashboard")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
                DASHBOARD
              </p>
              <p
                onClick={() => navigate("/freelancer/joblist")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
                FIND WORK
              </p>
            </>
          ) : (
            <>
              <p
                onClick={() => navigate("/")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >

              </p>
              <p
                onClick={() => navigate("/freelancerslist")}
                className="text-sm font-semibold hover:text-green-500 cursor-pointer"
              >
                
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
