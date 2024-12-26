import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Select from 'react-select';
import axiosInstance from '../../config/userInstance'
import { toast } from 'sonner'
import { blockUnblockSkills, getSkills, createSkills } from '../../Services/adminServices/adminAxiosCall';

interface Skills {
    _id: string
    name: string,
    description: string,
    category: string
    isBlocked: boolean
}

const SkillList = () => {

    const [showModal, setShowModal] = useState(false)
    const [blockModal, setBlockModal] = useState(false)
    const [skills, setSkills] = useState<any[]>([])
    const [selectedSkills, setSelectedSkills] = useState<Skills | null>(null)
    const [skillName, setSkillName] = useState('')
    const [description, setDescripion] = useState('')
    const [categoryData, setCategoryData] = useState<Skills[] | undefined>([])
    const [category, setCategory] = useState<string>('')
    const [pageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const closeModal = () => {
        setShowModal(false)
    }

    const fetchData = async (page = 1) => {
        try {
            const response = await axiosInstance.get(`/admin/getcategories`)
            if (response.data.success) {
                setCategoryData(response.data.data)
            }
            const skills = await getSkills(page,pageSize)
            if(skills.success){
                setSkills(skills.skillData.data)
                setTotalPages(skills.skillData.totalPages)
            }
        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setSkillName('')
            setDescripion('')
            const data = { name: skillName, description: description, category: category }
            const response = await createSkills( data )
            if (response.success) {
                toast.success(response.message)
                fetchData()
            } else {
                toast.error(response.message)
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

    const formattedOptions = categoryData?.map((category)=>({
        label: category.name,
        value: category._id
    }))

    const handleCategoryChange = (selectedOption: { label: string; value: string } | null) => {
        if (selectedOption) {
          setCategory(selectedOption.value); 
        } else {
          setCategory(''); 
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            fetchData(newPage);
        }
    };
    
    const openBlockModal = (skill: Skills) => {
        setSelectedSkills(skill)
        setBlockModal(true)
    }

    const closeBlockModal = () => {
        setBlockModal(false);
        setSelectedSkills(null)
    }

    const handleBlockUnblock = async () => {
        try {
            const status = selectedSkills!.isBlocked ? "unblock" : "block"
            const response = await blockUnblockSkills(selectedSkills?._id, status)
            if(response.success == true){
                if(response.message == 'skill blocked'){
                    toast.success('skill blocked')
                }else{
                    toast.success('skill unblocked')
                }
                setBlockModal(false)
                fetchData()
            }
        } catch (error: any) {
            toast.error(error.response.data.message || "An error has occured")
        }
    }

    return (
        <>
            <div className="p-">

                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold mb-2">Skills</h1>
                    <button onClick={() => setShowModal(true)} className='text-md text-gray-500 border-2 border-gray-500 rounded-md px-2 py-2'>
                        New skills
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium items-end text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {skills!.map((skill) => (
                                <tr >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.description.substring(0,40)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.category.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {!skill.isBlocked ? (
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
                                            className={`${skill.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold py-1 px-3 rounded`}
                                            onClick={() => openBlockModal(skill)}
                                        >
                                            {skill.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                        {/* <button onClick={() => deleteCategory(category.name)} className='bg-red-600 text-white py-1 px-3 rounded font-semibold'>
                                            Delete
                                        </button> */}
                                    </td>
                                </tr>
                            ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center px-4 py-2 border ${
                                currentPage === 1 ? "bg-gray-300" : "bg-white"
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Previous
                        </button>
                    <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center px-4 py-2 border ${
                                currentPage === totalPages ? "bg-gray-300" : "bg-white"
                            }`}
                        >
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

                                    <div className='justify-between'>
                                        <div>
                                            <label htmlFor="" className='text-sm font-medium px-1'>
                                                Skills
                                            </label>
                                            <input
                                                type='text'
                                                name='name'
                                                placeholder='skill Name'
                                                value={skillName}
                                                onChange={(e) => setSkillName(e.target.value)}
                                                className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md shadow-sm'
                                            />
                                        </div>
                                        <div>
                                        <label
                                            htmlFor=""
                                            className='text-sm font-medium pt-2'>
                                            Category
                                        </label>
                                            <Select
                                                id="language"
                                                options={formattedOptions}
                                                value={formattedOptions?.find((options)=>options.value == category)}
                                                onChange={handleCategoryChange}
                                                placeholder="Select languages"
                                            />
                                        </div>

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

                {blockModal && selectedSkills && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='bg-white p-6 rounded-lg shadow-md w-3/4 max-w-md h-auto'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold py-2 text-black'>
                                    {selectedSkills.isBlocked ? 'Unblock' : 'Block'} Skills
                                </h2>
                                <button onClick={closeBlockModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p>Are you sure you want to {selectedSkills.isBlocked ? 'unblock' : 'block'} this Skills?</p>

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

export default SkillList
