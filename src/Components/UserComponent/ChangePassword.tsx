import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const url = 'http://localhost:7070';

const ChangePassword = ()=> {

    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleChange = async(e: React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            if(password !== confirmPassword){
                toast.error('Both password must be same')
            }
            const response = await axios.post(`${url}/changepassword`,{password})
            if(response.data.success){
                toast.success(response.data.message)
                navigate('/login')
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occured while changing the password')
        }
    }

  return (
    <>
    <div className='w-full h-screen flex items-start'>
                <div className="relative w-1/2 h-full flex-col hidden md:flex">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="text-4xl text-white font-bold my-4 opacity-90">
                            Start your journey here.
                        </h1>
                        <p className="text-xl text-gray-50 font-normal opacity-100">
                            Start for free and start interacting with thousands of freelancers.
                        </p>
                    </div>
                    <img
                        className="w-full h-full object-cover bg-transparent "
                        src={require('../../Assets/SignUpimg.jpg')}
                        alt='Background Image'
                    />
                </div>
                <div className="w-full md:w-1/2 sm:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8 ml-auto">
                    <div className="flex h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt="Your Company"
                                src={require('../../Assets/logo.jpg')}
                                className="mx-auto h-10 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Change password
                            </h2>
                           
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form method='POST' className="space-y-6 " onSubmit={handleChange} >

                                <div>
                                    <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value = {password}
                                            onChange={(e)=> setPassword(e.target.value)}
                                            required
                                            placeholder='Password'
     
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                                         Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="C-password"
                                            name="C-password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e)=> setConfirmPassword(e.target.value)}
                                            required
                                            placeholder='Confirm Password'
                                            autoComplete="current-password"
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"/>
                                    </div>
                                </div>
                                
                                <div>
                                
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#04A118] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04A118]">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
    </>
  )
}

export default ChangePassword
