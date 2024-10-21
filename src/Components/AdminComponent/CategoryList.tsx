import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axiosInstance from '../../config/userInstance'
import { toast } from 'sonner'


interface Category{
    name:string,
    description: string
}

const CategoryList = () => {

    const [showModal, setShowModal] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescripion] = useState('')
    const [data, setData] = useState<Category[] | null>([])

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = { name: categoryName, description: description }
            const response = await axiosInstance.post('/admin/category', { data })
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
            setShowModal(false)
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('An unexpected error had occured')
            }
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/admin/getcategories')
                if (response.data.success) {
                    setData(response.data.data)

                }
            } catch (error: any) {
                console.log(error.response.data.message)
            }
        }
        fetchData()
    }, [])


    return (
        <>
            <div className="p-6">

                <div className="flex justify-between items-center mb-16">
                    <h1 className="text-2xl font-bold mb-2">Users</h1>
                    <button onClick={() => setShowModal(true)} className='text-md text-gray-500 border-2 border-gray-500 rounded-md px-2 py-2'>
                        New Category
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium items-end text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data!.map((category) => (
                                <tr >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-black">
                                            Blocked
                                        </span>
                                        {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-black">
                  Active
                </span> */}

                                    </td>
                                    <td className='flex items-center justify-end pr-5 pt-3'>

                                        {/* <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                //   onClick={() => handleBlockUnblock(user, "unblock")}
                >
                  Unblock
                </button> : */}
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        //   onClick={() => handleBlockUnblock(user, "block")}
                                        >
                                            Block
                                        </button>

                                    </td>
                                </tr>
                            ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled>
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">Page 1 of 3</span>
                    <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003F62] hover:bg-[#002E62]">
                        Next
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                </div>

                {showModal && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='bg-white p-6 rounded-lg shadow-md w-3/4 max-w-2xl h-auto'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold py-2 text-black'>Add Category</h2>
                                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form action="" onSubmit={handleSubmit} >
                                <div className='space-y-4 flex flex-col'>

                                    <div>
                                        <label htmlFor="" className='text-xs font-medium px-1'>
                                            Category Name
                                        </label>
                                        <input
                                            type='text'
                                            name='name'
                                            placeholder='Category Name'
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md shadow-sm'
                                        />
                                    </div>

                                    <div className='flex flex-col justify-around'>
                                        <label
                                            htmlFor=""
                                            className='text-sm font-medium'>
                                            Description
                                        </label>

                                        <textarea
                                            placeholder='Description'
                                            name='description'
                                            value={description}
                                            onChange={(e) => setDescripion(e.target.value)}
                                            className='h-32 w-full px-3 py-2 border border-gray-300 rounded-md  '
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-end pt-2' >
                                    <button type='submit' className='px-4 py-2 bg-[#003F62] text-white rounded-md'>
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default CategoryList
