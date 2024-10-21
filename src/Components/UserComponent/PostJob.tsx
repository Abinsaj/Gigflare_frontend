import React from 'react'

const PostJob = () => {
    return (
        <>
            <div className='w-full bg-white p-6 rounded-md shadow-md'>
                <h2 className='text-2xl font-semibold pb-4'>Post a Job</h2>
                <form action="">
                    <div className='space-y-5'>
                        <div>
                            <label htmlFor="" className='text-xs font-medium px-1'>
                                JOB TITLE
                            </label>
                            <input
                                type='text'
                                placeholder='Describe your job here'
                                className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <label htmlFor="" className='text-xs font-medium px-1'>
                                JOB DESCRIPTION
                            </label>
                            <textarea
                                placeholder='Describe'
                                className='w-full h-32 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <div className='flex space-x-6'>
                                <div className='flex flex-col w-1/2'>
                                    <label htmlFor="" className='text-xs font-medium px-1'>
                                        CATEGORY
                                    </label>
                                    <input
                                        type="category"
                                        placeholder='Please Select Category'
                                        className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                    />
                                </div>

                                <div className='flex flex-col w-1/2'>
                                    <label htmlFor="" className='text-xs font-medium px-1'>
                                        BUDGET
                                    </label>
                                    <input
                                        type="budget"
                                        placeholder='Add Your Budget'
                                        className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="" className='text-xs font-medium px-1'>
                                LANGUAGE
                            </label>
                            <input
                                type='language'
                                placeholder='Add Language'
                                className='w-full h-10 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <label htmlFor="" className='text-xs font-medium px-1'>
                                SKILLS(Optional)
                            </label>
                            <input
                                type='skills'
                                placeholder='Add skills'
                                className='w-full h-10 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                        </div>
                        <div className='w-full flex justify-end px-5'>
                            <button 
                            className='px-4 py-2 bg-[#1AA803] text-white shadow-sm  rounded-md'
                            >
                                Post Job
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PostJob
