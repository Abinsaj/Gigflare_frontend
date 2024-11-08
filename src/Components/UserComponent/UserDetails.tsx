import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import axiosInstance from '../../config/userInstance'
import { toast } from 'sonner'
import BlockChecker from '../../Services/userServices/blockChecker'

interface address{
    address: string
    country:  string
    state: string
    city: string
    pincode: string
}

const UserDetails = () => {

    BlockChecker()

    const data = useSelector((state:RootState)=>state.user.userInfo)

    const [address, setAddress] = useState('')
    const [country,setCountry] = useState('')
    const [state,setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')

    const [fromData,setFormData] = useState<address | null>(null)

    const handleAddress = async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            const value = {
                address,
                country,
                state,
                city,
                pincode
            }
            setFormData(value)
            
            const response = await axiosInstance.post(`/addAddress/${data?.userId}`,fromData)
            if(response.data.success){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        } catch (error: any) {
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error('An unexpected error occured')
            }
        }
    }

    return (
        <>
            <div className='space-y-5'>
                <div className='bg-white w-full p-6 rounded-md shadow-md'>
                    <h2 className='text-2xl font-semibold '>Personal Information</h2>
                    <form action="" className='pt-5 py-6'>
                        <div className='space-y-3'>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder={data?.name}
                                    className='w-full h-10 border border-gray-300 px-3 rounded-md mb-4  '
                                />
                            </div>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder={data?.email}
                                    className='w-full h-10 border border-gray-300 px-3 shadow-sm  rounded-md mb-4  '
                                />
                            </div>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    PHONE
                                </label>
                                <input
                                    type="phone"
                                    name='phone'
                                    placeholder={data?.phone}
                                    className='w-full h-10 border border-gray-300 px-3 shadow-sm rounded-md mb-4  '
                                />
                            </div>
                        </div>

                        <div className='flex justify-end pt-5'>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-[#1AA803] text-white shadow-sm  rounded-md'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div className='bg-white w-full p-6 rounded-md shadow-md'>
                    <h2 className='text-2xl font-semibold '>Add Address</h2>
                    <form action="" onSubmit={handleAddress} className='pt-5 py-6'>
                        <div className='space-y-6'>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    ADDRESS
                                </label>
                                <textarea
                                    placeholder='Address'
                                    value={fromData?.address}
                                    onChange={(e)=>setAddress(e.target.value)}
                                    className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md mb-4  '
                                />
                            </div>
                            <div className='space-y-1 flex flex-col'>
                                <div className='flex space-x-6'>
                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            COUNTRY
                                        </label>
                                        <input
                                            type="Country"
                                            value={fromData?.country}
                                            onChange={(e)=>setCountry(e.target.value)}
                                            placeholder='country'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                    </div>

                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            STATE
                                        </label>
                                        <input
                                            type="State"
                                            value={fromData?.state}
                                            onChange={(e)=>setState(e.target.value)}
                                            placeholder='state'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-1 flex flex-col'>
                                <div className='flex space-x-3'>
                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            CITY
                                        </label>
                                        <input
                                            type="City"
                                            value={fromData?.city}
                                            onChange={(e)=>setCity(e.target.value)}
                                            placeholder='city'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                    </div>

                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            PINCODE
                                        </label>
                                        <input
                                            type="pincode"
                                            value={fromData?.pincode}
                                            onChange={(e)=>setPincode(e.target.value)}
                                            placeholder='Pincode'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end pt-5'>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-[#1AA803] text-white shadow-sm  rounded-md'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserDetails
