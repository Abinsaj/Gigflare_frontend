import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../config/userInstance';
import { toast } from 'sonner';
import BlockChecker from '../../Services/userServices/blockChecker';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

interface Category {
    _id: string
    name: string,
    description: string,
    isBlocked: boolean
}

const JobPost = () => {

    BlockChecker()

    const [newSkill, setNewSkill] = useState<string>('')
    const [data, setData] = useState<Category[] | null>([])
    const userData = useSelector((state:RootState)=>state.user.userInfo)
    
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

    const deleteSkill = (skill: string) => {
        const updatedSkills = formik.values.skills.filter((s:string) => s !== skill)
        formik.setFieldValue('skills', updatedSkills)
    }

    const validationSchema = Yup.object({
        jobTitle: Yup.string()
            .required('Job title is required')
            .min(3, 'Job title must be at least 3 characters')
            .max(100, 'Job title must not exceed 100 characters'),
        jobDescription: Yup.string()
            .required('Job description is required')
            .min(50, 'Job description must be at least 50 characters')
            .max(5000, 'Job description must not exceed 5000 characters'),
        category: Yup.string()
            .required('Category is required'),
        budget: Yup.number()
            .required('Budget is required')
            .positive('Budget must be a positive number')
            .integer('Budget must be an integer'),
        deadline: Yup.date()
            .required('Deadline is required')
            .min(new Date(), 'Deadline must be in the future'),
        language: Yup.string()
            .required('Language is required'),
        skills: Yup.array()
            .of(Yup.string())
            .min(1, 'At least one skill is required')
            .max(10, 'Maximum 10 skills are allowed')
    })

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
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const id = userData?.userId
                const response = await axiosInstance.post('/createjob', { values, id })
                if (response.data.success) {
                    toast.success(response.data.message)
                    formik.resetForm()
                    setNewSkill('')
                } else {
                    toast.error(response.data.message)
                }
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error('An error has occurred')
                }
            }
        }
    })

    const addSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (newSkill.trim()) {
            formik.setFieldValue('skills', [...formik.values.skills, newSkill])
            setNewSkill('')
        }
    }

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
                                onBlur={formik.handleBlur}
                                placeholder='Describe your job here'
                                className='w-full h-10 border border-gray-300 px-3 py-2 rounded-md shadow-sm'
                            />
                            {formik.touched.jobTitle && formik.errors.jobTitle && (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.jobTitle}</div>
                            )}
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
                                onBlur={formik.handleBlur}
                                placeholder='Describe'
                                className='w-full h-32 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                            {formik.touched.jobDescription && formik.errors.jobDescription && (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.jobDescription}</div>
                            )}
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
                                        onBlur={formik.handleBlur}
                                        className="w-full h-10 border border-gray-300 rounded-lg bg-[#ffffff] p-2 outline-none"
                                    >
                                        <option value="">Select your Category</option>
                                        {data!.map((category) => (
                                            <option key={category._id} value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                    {formik.touched.category && formik.errors.category && (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.category}</div>
                                    )}
                                </div>

                                <div className='flex flex-col w-1/3'>
                                    <label htmlFor="budget" className='text-xs font-medium px-1'>
                                        BUDGET
                                    </label>
                                    <input
                                        id="budget"
                                        type="number"
                                        name='budget'
                                        value={formik.values.budget}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder='Add Your Budget'
                                        className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                    />
                                    {formik.touched.budget && formik.errors.budget && (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.budget}</div>
                                    )}
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
                                        onBlur={formik.handleBlur}
                                        className='h-10 border border-gray-300 px-3 shadow-sm mt-1 rounded-md mb-4'
                                    />
                                    {formik.touched.deadline && formik.errors.deadline && (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.deadline}</div>
                                    )}
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
                                onBlur={formik.handleBlur}
                                placeholder='Add Language'
                                className='w-full h-10 border border-gray-300 px-3 rounded-md shadow-sm'
                            />
                            {formik.touched.language && formik.errors.language && (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.language}</div>
                            )}
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
                                {formik.touched.skills && formik.errors.skills && (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.skills}</div>
                                )}
                            </div>
                        </div>
                        <div className='w-full flex justify-center pl-10 px-5'>
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