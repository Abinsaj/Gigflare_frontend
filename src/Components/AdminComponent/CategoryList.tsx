import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axiosInstance from '../../config/userInstance'
import { toast } from 'sonner'
import { removeCategory } from '../../Services/adminServices/adminAxiosCall'


interface Category {
    _id: string
    name: string,
    description: string,
    isBlocked: boolean
}

const CategoryList = () => {

    const [showModal, setShowModal] = useState(false)
    const [blockModal, setBlockModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescripion] = useState('')
    const [data, setData] = useState<Category[] | null>([])


    console.log(data,'this is the category data')

    const closeModal = () => {
        setShowModal(false)
    }

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


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setCategoryName('')
            setDescripion('')
            const data = { name: categoryName, description: description }
            const response = await axiosInstance.post('/admin/category', { data })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchData()
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

    const deleteCategory = async(name: string)=>{
        try {
            const response = await removeCategory(name)
            if(response.success === true){
                toast.success(response.message)
                setData(prevData=>prevData?.filter(category => category.name!==name)|| null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const openBlockModal = (category: Category)=>{
        setSelectedCategory(category)
        setBlockModal(true)
    }

    const closeBlockModal = ()=>{
        setBlockModal(false);
        setSelectedCategory(null)
    }

    const handleBlockUnblock = async () => {
        try {
            if(selectedCategory){
                const status = selectedCategory.isBlocked ? "unblock" : "block"
                console.log(status)
                const response = await axiosInstance.put(`/admin/blockcategory/${selectedCategory.name}`,{status: status })
                if(response.data.success){
                    if(response.data.success.message == 'category blocked'){
                        toast.success('Category blocked successfully')
                    }else{
                        toast.success('Category unblocked successfully')
                    }
                    setBlockModal(false)
                    fetchData()
                }else{
                    toast.error(response.data.message)
                }
            }
        } catch (error: any) {
            toast.error(error.response.data.message || "An error has occured")
        }
    }

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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
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
                                        {!category.isBlocked ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-gray-700">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-black">
                                                Blocked
                                            </span>
                                        )}



                                    </td>
                                    <td className='flex items-center justify-end pr-4 pt-3 gap-1'>
                                        <button
                                           className={`${category.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold py-1 px-3 rounded`}
                                            onClick={() => openBlockModal(category)}
                                        >
                                            {category.isBlocked? 'Unblock' : 'Block'}
                                        </button>
                                        <button onClick={()=>deleteCategory(category.name)} className='bg-red-600 text-white py-1 px-3 rounded font-semibold'>
                                            Delete
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

                {blockModal && selectedCategory && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='bg-white p-6 rounded-lg shadow-md w-3/4 max-w-md h-auto'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold py-2 text-black'>
                                    {selectedCategory.isBlocked ? 'Unblock' : 'Block'} Category
                                </h2>
                                <button onClick={closeBlockModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p>Are you sure you want to {selectedCategory.isBlocked ? 'unblock' : 'block'} this category?</p>

                            <div className='flex justify-end pt-4'>
                                <button onClick={handleBlockUnblock} className='px-4 py-2 bg-[#003F62] text-white rounded-md'>
                                    Confirm
                                </button>
                                <button onClick={closeBlockModal} className='ml-3 px-4 py-2 bg-gray-300 text-black rounded-md'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default CategoryList
