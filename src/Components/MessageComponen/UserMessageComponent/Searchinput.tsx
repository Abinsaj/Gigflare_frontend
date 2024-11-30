import React from 'react'
import { Search } from 'lucide-react'

const Searchinput=()=> {
  return (
    <form>
        <div className='relative'>
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
        /> 
        </div>
    </form>
  )
}

export default Searchinput
