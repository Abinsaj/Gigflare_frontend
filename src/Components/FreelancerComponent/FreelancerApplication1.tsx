import React, { useState } from 'react'
import { UserCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useFormik } from 'formik'
import { freelancerApplication } from '../../Redux/actions/freelancerAction'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';


    interface FreelanceData {
        firstName: string;
        lastName: string;
        photo?: string;
        description: string;
        language: string[];
        experience: {
            expertise: string;
            fromYear: number;
            toYear: number;
        }[]; 
        skills: string[];
        education?: {
            collageName: string;
            title: string;
            year: number;
        }[];
        certification?: {
            name: string;
            year: number;
        }[];
        portfolio?: string;
        email: string;
        phone?: string;
    }
    

export default function Application() {

    const navigate = useNavigate()

    const [educations, setEducations] = useState<any>([])
    const [newEducation, setNewEducation] = useState({})
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false)

    const [certifications, setCertifications] = useState<any>([])
    const [newCertification, setNewCertification] = useState({ name: '', from: '', year: '' })
    const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false)

    const [personalWebsite, setPersonalWebsite] = useState('')

    const [skills, setSkills] = useState<any>([])
    const [newSkill, setNewSkill] = useState('')
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)

    const addEducation = () => {
        setEducations([...educations, newEducation])
        formik.setFieldValue("education", [...formik.values.education, newEducation]);
        setNewEducation({})
        setIsEducationModalOpen(false)
    }

    const addCertification = () => {
        setCertifications([...certifications, newCertification])
        formik.setFieldValue('certification',[...formik.values.certification, newCertification])
        setNewCertification({ name: '', from: '', year: '' })
        setIsCertificationModalOpen(false)
    }

    const addSkill = () => {
        setSkills([...skills, newSkill])
        setNewSkill('')
        setIsSkillModalOpen(false)
    }

    const deleteEducation = (index: number) => {
        setEducations((prevEducations: any[]) => prevEducations.filter((_, i) => i !== index))
    }

    const deletCertificate = (index: number) => {
        setCertifications((prev: any[]) => prev.filter((_, i) => i !== index))
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            photo: '',
            description: '',
            language: [] as string[], 
            experience: [
                {
                    expertise: '',
                    fromYear: 0,
                    toYear: 0
                }
            ], 
            skills: [],
            education: [],
            certification: [], 
            portfolio: '',
            email: '',
            phone: ''
        },   
        onSubmit: async(values) => {
            try {
                const responseResult = await freelancerApplication(values)
                if(responseResult){
                    navigate('/freelancer/home')
                }
            } catch (error: any) {
                toast.error('Freelancer application filed')
            }
        }
    })

    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <form onSubmit={formik.handleSubmit}>
                <div className="space-y-28 pt-16">
                    {/* Personal Info Section */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-gray-900">Personal Info</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 space-y-8">
                            {/* Full Name */}
                            <div className="flex items-start">
                                <label htmlFor="fullName" className="py-3 text-sm font-medium leading-6 text-gray-900 w-1/4">
                                    Full Name
                                </label>
                                <div className="flex gap-4 w-3/4">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        autoComplete="given-name"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        autoComplete="family-name"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                </div>
                            </div>

                            {/* Photo */}
                            <div className="flex items-start">
                                <label htmlFor="photo" className="block text-sm py-3 font-medium leading-6 text-gray-900 w-1/4">
                                    Photo
                                </label>
                                <div className="flex items-center gap-x-3 w-3/4">
                                    <UserCircleIcon className="h-36 w-36 text-gray-300" type='file' aria-hidden="true" />
                                    <input type="file" 
                                    value={formik.values.photo}/>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex items-start">
                                <label htmlFor="description" className="block py-3 text-sm font-medium leading-6 text-gray-900 w-1/4">
                                    Description
                                </label>
                                <div className="w-3/4">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        placeholder="Describe yourself..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                </div>
                            </div>

                            {/* Select Language */}
                            <div className="flex items-start">
                                <label htmlFor="selectLanguage" className="block py-3 text-sm font-medium leading-6 text-gray-900 w-1/4">
                                    Select Language
                                </label>
                                <div className="w-3/4">
                                    <select
                                        id="selectLanguage"
                                        name="selectLanguage"
                                        value={formik.values.language}
                                        onChange={formik.handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    >
                                        <option value="">Select Language</option>
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information Section */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-gray-900">Professional Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This is your time to shine. Let potential buyers know what you do best and how you gained your skills, certifications and experience.
                        </p>

                        <div className="mt-10 space-y-16">
                            {/* Experience */}
                            <div className="flex items-start">
                                <label htmlFor="Expertise" className="block text-sm font-medium py-3 leading-6 text-gray-900 w-1/4">
                                    Experience
                                </label>
                                <div className="flex space-x-2 w-3/4">
                                    <input
                                        type="text"
                                        placeholder="Expertise In"
                                        value={formik.values.experience[0]?.expertise || ''}
                                        onChange={formik.handleChange}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="From (Year)"
                                        value={formik.values.experience[0]?.fromYear || ''}
                                        onChange={formik.handleChange}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="To (Year)"
                                        value={formik.values.experience[0]?.toYear || ''}
                                        onChange={formik.handleChange}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex items-start mt-10">
                                <label htmlFor="skills" className="block text-sm font-medium leading-6 py-3 text-gray-900 w-1/4">
                                    Skills
                                </label>
                                <div className=" relative w-3/4">
                                    <input
                                        type="text"
                                        placeholder="Skills"
                                        value={formik.values.skills}
                                        aria-placeholder={skills}
                                        onChange={formik.handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"

                                    />
                                    {skills && (
                                        <TrashIcon
                                            className="absolute right-2 top-1/4 mb-6 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
                                            onClick={() => setSkills([])} // Clear the input when clicked
                                        />
                                    )}
                                    <button
                                        type="button"
                                        className="mt-2 text-sm text-[#1AA803] hover:underline"
                                        onClick={() => setIsSkillModalOpen(true)}
                                    >
                                        + Add New
                                    </button>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="flex items-start mt-10">
                                <label htmlFor="education" className="block text-sm py-3 font-medium leading-6 text-gray-900 w-1/4">
                                    Education
                                </label>
                                <div className="w-3/4">
                                    <table className="min-w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className='text-gray-400 text-balance border bg-gray-500/10 border-gray-300 px-4'>
                                                <th className="font-normal py-2">College/University/Name</th>
                                                <th className="font-normal px-4 py-2">Title</th>
                                                <th className="font-normal px-4 py-2">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {educations.map((edu: any, index: any) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 px-4 py-2">{edu.university}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{edu.title}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{edu.year}</td>
                                                    <td className=" border-gray-300 ">
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteEducation(index)}
                                                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                                            aria-label={`Delete education entry for ${edu.university}`}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        type="button"
                                        className="mt-2 text-sm text-[#1AA803] hover:underline"
                                        onClick={() => setIsEducationModalOpen(true)}
                                    >
                                        + Add New
                                    </button>
                                </div>
                            </div>

                            {/* Certification */}
                            <div className="flex items-start mt-10">
                                <label htmlFor="certification" className="block text-sm py-3 font-medium leading-6 text-gray-900 w-1/4">
                                    Certification
                                </label>
                                <div className="w-3/4">
                                    <table className="min-w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className='text-gray-400 text-balance border bg-gray-500/10 border-gray-300 px-4'>
                                                <th className="font-normal items-start py-2">Certificate or Award</th>
                                                <th className="font-normal px-4 py-2">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {certifications.map((cert: any, index: any) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 px-4 py-2">{cert.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{cert.year}</td>
                                                    <td className=" border-gray-300 ">
                                                        <button
                                                            type="button"
                                                            onClick={() => deletCertificate(index)}
                                                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                                            aria-label={`Delete education entry for ${cert.name}`}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        type="button"
                                        className="mt-2 text-sm text-[#1AA803] hover:underline"
                                        onClick={() => setIsCertificationModalOpen(true)}
                                    >
                                        + Add New
                                    </button>
                                </div>
                            </div>

                            {/* Portfolio */}
                            <div className="flex items-start mt-10">
                                <label htmlFor="portfolio" className="block py-3 text-sm font-medium leading-6 text-gray-900 w-1/4">
                                    Portfolio
                                </label>
                                <div className="w-3/4">
                                    <input
                                        type="url"
                                        value={personalWebsite}
                                        onChange={(e) => setPersonalWebsite(e.target.value)}
                                        placeholder="Provide a link to your own professional website"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Security Section */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-gray-900">Account Security</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            We'll always let you know about important changes, but you pick what else you want to hear about.
                        </p>

                        <div className="mt-10 space-y-8">
                            {/* Verified */}
                            <div className="flex items-center w-2/4">
                                <input
                                    id="verified"
                                    name="verified"
                                    placeholder='Email'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                />
                                <label htmlFor="verified" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                                    Verified
                                </label>
                            </div>

                            {/* Candidates */}
                            <div className="flex items-center w-2/4">
                                <input
                                    id="candidates"
                                    name="candidates"
                                    placeholder='Phone'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                />
                                <p className="ml-6 text-gray-500 text-sm">We will never share your phone number.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="mt-6 flex items-center pb-10 justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-black hover:bg-[#1AA803] px-3 py-2 text-sm font-semibold text-white shadow-sm rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Save
                    </button>
                </div>
            </form>

            {/* Education Modal  */}
            {isEducationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-3/5 p-5 rounded shadow-lg z-60">
                        <h2 className="text-lg font-bold mb-4">Add Education</h2>

                        <select
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                            onChange={(e) => setNewEducation({ ...newEducation, university: e.target.value })}
                        >
                            <option value="">Select university</option>
                            <option value="harvard">Harvard University</option>
                            <option value="mit">MIT</option>
                            <option value="stanford">Stanford University</option>
                        </select>
                        <select
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                            onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
                        >
                            <option value="">Select title</option>
                            <option value="bachelor">Bachelor's</option>
                            <option value="master">Master's</option>
                            <option value="phd">Ph.D.</option>
                        </select>

                        <select
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                            onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                        >
                            <option value="">Select year</option>
                            {[...Array(30)].map((_, i) => (
                                <option key={i} value={`${new Date().getFullYear() - i}`}>
                                    {new Date().getFullYear() - i}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                onClick={() => setIsEducationModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-[#1AA803] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1AA803]"
                                onClick={addEducation}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Certification Modal */}
            {isCertificationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-3/5 p-5 rounded shadow-lg z-60">
                        <h2 className="text-lg font-bold mb-4">Add New Certification</h2>
                        <input
                            type="text"
                            placeholder="Certificate or Award"
                            value={newCertification.name}
                            onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                        />

                        <select
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                            onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                        >
                            <option value="">Select year</option>
                            {[...Array(30)].map((_, i) => (
                                <option key={i} value={`${new Date().getFullYear() - i}`}>
                                    {new Date().getFullYear() - i}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                onClick={() => setIsCertificationModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-[#1AA803] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1AA803]"
                                onClick={addCertification}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Skill Modal */}
            {isSkillModalOpen && (
                <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-3/5 p-5 rounded shadow-lg z-60">
                        <h2 className="text-lg font-bold mb-4">Add New Skill</h2>
                        <input
                            type="text"
                            placeholder="Skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                onClick={() => setIsSkillModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-[#1AA803] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1AA803]"
                                onClick={addSkill}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}