import React from 'react'

const UserDetails = () => {
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
                                    placeholder='name'
                                    className='w-full h-10 border border-gray-300 px-3 rounded-md mb-4  '
                                />
                            </div>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    placeholder='email'
                                    className='w-full h-10 border border-gray-300 px-3 shadow-sm  rounded-md mb-4  '
                                />
                            </div>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    PHONE
                                </label>
                                <input
                                    type="phone"
                                    placeholder='phone'
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
                    <form action="" className='pt-5 py-6'>
                        <div className='space-y-3'>
                            <div className='space-y-1 flex flex-col items-start'>
                                <label htmlFor="" className='text-xs font-medium px-1'>
                                    ADDRESS
                                </label>
                                <textarea
                                    placeholder='Address'
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
                                            placeholder='state'
                                            className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-1 flex flex-col'>
                                <div className='flex space-x-6'>
                                    <div className='flex flex-col w-1/2'>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            CITY
                                        </label>
                                        <input
                                            type="City"
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
