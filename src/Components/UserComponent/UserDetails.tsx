import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { toast } from 'sonner'
import BlockChecker from '../../Services/userServices/blockChecker'
import { addAddress, updateUserProfile } from '../../Services/userServices/userAxiosCalls'

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
    console.log(data,'this is the data we got here for user')
    const [address, setAddress] = useState('')
    const [country,setCountry] = useState('')
    const [state,setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const [personalInfo, setPersonalInfo] = useState({
        name: data?.name || '',
        phone: data?.phone || '',
    })

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setPersonalInfo((prev=>({...prev,[name]: value})))
    }

    const personalInfoSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const response = await updateUserProfile(personalInfo, data?._id)
            console.log(response,'this is the response')
            if(response.success){
                toast.success('profile info updated')
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    const handleAddress = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        // Validation
        const newErrors: { [key: string]: string } = {}

        if (!address) newErrors.address = 'Address is required'
        if (!country) newErrors.country = 'Country is required'
        if (!state) newErrors.state = 'State is required'
        if (!city) newErrors.city = 'City is required'
        if (!pincode) {
            newErrors.pincode = 'Pincode is required'
        } else if (!/^\d{5,6}$/.test(pincode)) {
            newErrors.pincode = 'Pincode must be a 5 or 6-digit number'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        try {
            const formData = { address, country, state, city, pincode }
            const response = await addAddress(data?.userId,formData)
            if(response.success){
                toast.success(response.message)
            }else{
                toast.error(response.message)
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
                    <form  onSubmit={personalInfoSubmit} className='pt-5 py-6'>
                        <div className='space-y-3'>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder={data?.name}
                                    value={personalInfo.name}
                                    onChange={handlePersonalInfoChange}
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
                                    value={personalInfo.phone}
                                    onChange={handlePersonalInfoChange}
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
                    <form onSubmit={handleAddress} className='pt-5 py-6'>
                        <div className='space-y-6'>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    ADDRESS
                                </label>
                                <textarea
                                    placeholder='Address'
                                    value={address}
                                    onChange={(e)=>setAddress(e.target.value)}
                                    className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md mb-4  '
                                />
                                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                            </div>
                            <div className='space-y-1 flex flex-col'>
                                <div className='flex space-x-6'>
                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            COUNTRY
                                        </label>
                                        <input
                                            type="Country"
                                            value={country}
                                            onChange={(e)=>setCountry(e.target.value)}
                                            placeholder='country'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                        {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                                    </div>

                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            STATE
                                        </label>
                                        <input
                                            type="State"
                                            value={state}
                                            onChange={(e)=>setState(e.target.value)}
                                            placeholder='state'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
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
                                            value={city}
                                            onChange={(e)=>setCity(e.target.value)}
                                            placeholder='city'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                                    </div>

                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            PINCODE
                                        </label>
                                        <input
                                            type="pincode"
                                            value={pincode}
                                            onChange={(e)=>setPincode(e.target.value)}
                                            placeholder='Pincode'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                        {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
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
