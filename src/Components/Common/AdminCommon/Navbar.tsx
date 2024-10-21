import React from 'react'
import { Search, Bell, ChevronDown } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAdmin } from '../../../Redux/slices/adminSlice';

const url = 'http://localhost:7070/admin';

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    try {
      e.preventDefault()
      const response = await axios.post(`${url}/adminlogout`)
      console.log(response)
      if(response.data){
        toast.success(response.data.message)
      dispatch(clearAdmin())

        navigate('/admin/login')
      } 
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 px-2 py-1 bg-transparent focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <button className="p-2">
          <Bell className="w-5 h-5 text-gray-500" />
        </button>
        <div className="ml-4 relative">
          <button className="flex items-center" onClick={handleLogout}>
            <span className="mr-2">ADMIN</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar