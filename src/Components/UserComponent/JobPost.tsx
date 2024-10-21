import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { useFormik } from 'formik';
import axiosInstance from '../../config/userInstance';
import { toast } from 'sonner';

interface Category {
    _id: string
    name: string,
    description: string,
    isBlocked: boolean
}

const JobPost = () => {

    const [newSkill, setNewSkill] = useState<string>('')
    const [data, setData] = useState<Category[] | null>([])
    
    useEffect(()=>{
        const fetchData = async()=>{
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
    },[])

    const deleteSkill = (skill: string) => {
        const updatedSkills = formik.values.skills.filter((s:string) => s !== skill)
        formik.setFieldValue('skills', updatedSkills)
    }

    const formik = useFormik({
        initialValues: {
            jobTitle: '',
            jobDescription: '',
            category: '',
            budget: '',
            deadline: '',
            language: '',
            skills: []
        },
        onSubmit: async (values) => {
            try {
                console.log('this is the value we got ', values)
                const response = await axiosInstance.post('/createjob',{values})
                if(response.data.success){
                    toast.success(response.data.message)
                }else{
                    toast.error(response.data.message)
                }
            } catch (error: any) {
                if(error.response && error.response.data && error.response.data.message){
                    toast.error(error.resonse.data.message)
                }else{
                    toast.error('An error has ocuured')
                }
            }
        }
    })

     const addSkill = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(newSkill.trim()){
            
            formik.setFieldValue('skills',[...formik.values.skills,newSkill])
            setNewSkill('')
        }
    }
    console.log(formik.values.skills)

    return (
        <div>
            <div className='w-full bg-white p-6 rounded-md shadow-md'>
                <h2 className='text-2xl font-semibold pb-4'>Post a Job</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='space-y-5'>
                        <div>
                            <label htmlFor="jobTitle" className='text-xs font-medium px-1'>
                                JOB TITLE
                            </label>
                            <input
                                id="jobTitle"
                                type='text'
                                name='jobTitle'
                                value={formik.values.jobTitle}
                                onChange={formik.handleChange}
                                placeholder='Describe your job here'
                                className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <label htmlFor="jobDescription" className='text-xs font-medium px-1'>
                                JOB DESCRIPTION
                            </label>
                            <textarea
                                id="jobDescription"
                                name='jobDescription'
                                value={formik.values.jobDescription}
                                onChange={formik.handleChange}
                                placeholder='Describe'
                                className='w-full h-32 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <div className='flex space-x-6'>
                                <div className='flex flex-col w-1/3'>
                                    <label htmlFor="category" className='text-xs font-medium px-1'>
                                        CATEGORY
                                    </label>
                                    <select
                                        id="category"
                                        name='category'
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        className="w-full h-10 border border-gray-300 rounded-lg bg-[#ffffff] p-2 outline-none"
                                    >
                                         <option value="">Select your Category</option>
                                        {data!.map((category)=>(
                                           
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                        
                                        ))}
                                        
                                    </select>
                                </div>

                                <div className='flex flex-col w-1/3'>
                                    <label htmlFor="budget" className='text-xs font-medium px-1'>
                                        BUDGET
                                    </label>
                                    <input
                                        id="budget"
                                        type="text"
                                        name='budget'
                                        value={formik.values.budget}
                                        onChange={formik.handleChange}
                                        placeholder='Add Your Budget'
                                        className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                    />
                                </div>

                                <div className='flex flex-col w-1/3'>
                                    <label htmlFor="deadline" className='text-xs font-medium px-1'>
                                        DEADLINE
                                    </label>
                                    <input
                                        id="deadline"
                                        type="date"
                                        name='deadline'
                                        value={formik.values.deadline}
                                        onChange={formik.handleChange}
                                        className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="language" className='text-xs font-medium px-1'>
                                LANGUAGE
                            </label>
                            <input
                                id="language"
                                type='text'
                                name='language'
                                value={formik.values.language}
                                onChange={formik.handleChange}
                                placeholder='Add Language'
                                className='w-full h-10 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                        </div>

                        <div className="flex items-start pt-6">
                            
                            <div className="relative w-full flex flex-col">
                            <p className='text-xs font-medium px-1 py-1'>SKILLS</p>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="skills"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                    <button
                                        type="button"
                                        className="ml-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-[#1AA803] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1AA803]"
                                        onClick={addSkill}
                                    >
                                        Add
                                    </button>
                                </div>
                                {formik.values.skills.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formik.values.skills.map((skill: string, index: number) => (
                                            <div key={index} className="bg-gray-200 px-2 py-1 rounded-md flex items-center">
                                                <span>{skill}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteSkill(skill)}
                                                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-full flex justify-end px-5'>
                            <button
                                type="submit"
                                className='px-4 py-2 bg-[#1AA803] text-white shadow-sm rounded-md'
                            >
                                Post Job
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPost;