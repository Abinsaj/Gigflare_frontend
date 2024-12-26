import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import JobPostPage1 from './JobPost1'
import JobPostPage2 from './JobPost2'
import JobPostPage3 from './JobPost3'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import axiosInstance from '../../config/userInstance'
import { toast } from 'sonner'
import { createJob } from '../../Services/userServices/userAxiosCalls'
import { getUserSkills } from '../../Services/userServices/userAxiosCalls'


   export interface Jobpost{
        jobTitle: string;
        jobDescription: string;
        category: string;
        skills: string[];  
        duration: string;
        projectType: string;
        budget?: number;
    }

interface JobPostFormProps {
    onClose: () => void
    onJobAdded: any
}

interface Category{
    _id: string
    name: string,
    description: string,
    isBlocked: boolean
}

export default function JobPostForm({ onClose, onJobAdded }: JobPostFormProps) {
  const [page, setPage] = useState(1)
  const [ allSkill, setAllSkills] = useState<any[]>([])
  const [filteredSkill, setFilteredSkills] = useState<any[]>([])
  const [formData, setFormData] = useState<Jobpost>({
    jobTitle: '',
    jobDescription: '',
    category: '',
    skills: [],
    duration: '',
    projectType: '',
    budget: 0

  })
  const [data, setData] = useState<Category[] | null>([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/admin/getcategories')
            if (response.data.success) {
                setData(response.data.data) 
            }
            const data = await getUserSkills()
            setAllSkills(data.data)
        } catch (error: any) {
            console.log(error)
        }
    }
    fetchData()
}, [])


useEffect(()=>{
  if(formData.category){
    const matchedSkill = allSkill.filter((skill: any)=>skill.category._id == formData.category)
    setFilteredSkills(matchedSkill)
  }
},[formData.category, allSkill])

console.log(filteredSkill,'this is the filtered data')

  const userData = useSelector((state:RootState)=>state.user.userInfo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSkillChange = (skills: string[]) => {
    setFormData(prevData => ({
      ...prevData,
      skills
    }))
  }


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const id = userData?._id
    const response = await createJob(formData, id)
    if (response.success) {
        toast.success(response.message)
        onJobAdded(response.data)
        onClose()
    }
 
  }

  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 ">
          <h2 className="text-2xl font-bold">Post a Job</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {page === 1 && (
              <JobPostPage1
                formData={formData}
                handleChange={handleChange}
                category={data || []}
                
              />
            )}
            {page === 2 && (
              <JobPostPage2
                formData={formData}
                handleChange={handleChange}
                handleSkillChange={handleSkillChange}
                filteredSkill={filteredSkill}
              />
            )}
            {page === 3 && (
              <JobPostPage3
                formData={formData}
                handleChange={handleChange}
              />
            )}
            <div className="mt-6 flex justify-between">
              {page > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
              {page < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="ml-auto flex items-center px-4 py-2 bg-[#1AA803] text-white rounded-md hover:bg-[#1AA803]"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
              {page === 3 && (
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-[#1AA803] text-white rounded-md hover:bg-[#1AA803]"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}