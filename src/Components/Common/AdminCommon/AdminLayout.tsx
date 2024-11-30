import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'

const Layout = () => {
  const admin = useSelector((state:RootState)=>state.admin)


  useEffect(()=>{
    console.log('Cookies after login:', document.cookie)
  },[])
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-8 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout