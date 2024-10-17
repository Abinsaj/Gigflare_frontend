import React, { useState, useRef } from 'react'
import { UserCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useFormik } from 'formik'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'


const url = 'http://localhost:7070/freelancer';

interface FreelanceData {
    firstName: string;
    lastName: string;
    photo?: File;
    description: string;
    language: string[];
    experience: Array<{
        expertise: string;
        fromYear: number;
        toYear: number;
    }>;
    skills: string[];
    education ?: Array<{
        collageName: string;
        title: string;
        year: number;
    }>;
    certification?: Array<{
        name: string;
        year: number;
        file?: File;
    }>;
    portfolio?: string;
    email: string;
    phone?: string;
}

export default function Application() {
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [educations, setEducations] = useState<FreelanceData['education']>([])
    const [newEducation, setNewEducation] = useState<{ collageName: string; title: string; year: number }>({
        collageName: '',
        title: '',
        year: new Date().getFullYear()
    })
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false)

    const [certifications, setCertifications] = useState<FreelanceData['certification']>([])
    const [newCertification, setNewCertification] = useState<{ name: string; year: string; file: File | null }>({ name: '', year: '', file: null })
    const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false)

    const [skills, setSkills] = useState<string[]>([])
    const [newSkill, setNewSkill] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            formik.setFieldValue('photo', file)

            const previewImage = URL.createObjectURL(file)
            setImagePreview(previewImage)
        }
    }

    const handleCertificateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setNewCertification({ ...newCertification, file })
        }
    }

    const addEducation = () => {
        if (newEducation.collageName && newEducation.title) {
            const updatedEducations = [...formik.values.education!, newEducation]
            setEducations(updatedEducations)
            formik.setFieldValue("education", updatedEducations)
            setNewEducation({ collageName: '', title: '', year: new Date().getFullYear() })
            setIsEducationModalOpen(false)
        } else {
            toast.error('Please fill all education fields')
        }
    }

    const addCertification = () => {
        if (newCertification.name && newCertification.year && newCertification.file) {
            const newCert = {
                name: newCertification.name,
                year: parseInt(newCertification.year),
                file: newCertification.file
            };
            const updatedCertifications = [...formik.values.certification!, newCert]
            setCertifications(updatedCertifications)
            formik.setFieldValue('certification', updatedCertifications)
            setNewCertification({ name: '', year: '', file: null })
            setIsCertificationModalOpen(false)
        } else {
            toast.error('Please fill all certification fields')
        }
    }

    const addSkill = () => {
        if (newSkill.trim()) {
            const updatedSkills = [...formik.values.skills, newSkill.trim()]
            setSkills(updatedSkills)
            formik.setFieldValue("skills", updatedSkills);
            setNewSkill('')
        }
    }

    const deleteEducation = (index: number) => {
        const updatedEducations = formik.values.education!.filter((_, i) => i !== index)
        setEducations(updatedEducations)
        formik.setFieldValue("education", updatedEducations)
    }

    const deleteCertificate = (index: number) => {
        const updatedCertifications = formik.values.certification!.filter((_, i) => i !== index)
        setCertifications(updatedCertifications)
        formik.setFieldValue("certification", updatedCertifications)
    }

    const deleteSkill = (skillToDelete: string) => {
        const updatedSkills = formik.values.skills.filter(skill => skill !== skillToDelete)
        setSkills(updatedSkills)
        formik.setFieldValue('skills', updatedSkills)
    }

    const formik = useFormik<FreelanceData>({
        initialValues: {
            firstName: '',
            lastName: '',
            photo: undefined,
            description: '',
            language: [],
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
        validationSchema: Yup.object({
            firstName: Yup.string()
            .transform((value)=>value.trim())
            .matches(/^[A-Z][a-zA-Z]*$/, "First letter should be capital letter")
            .required("First name is required"),
            lastName: Yup.string()
            .transform((value)=>value.trim())
            .matches(/^[A-Z][a-zA-Z]*$/, "Last letter should start with capital letter")
            .required("Last name is required"),
            description: Yup.string()
            .transform((value)=>value.trim())
            .min(50, "Minimum 70 words required")
            .required("Description is required"),
            language: Yup.array()
            .of(Yup.string().required('Language is required'))
            .min(1,"At least one language must be selected"),
            // experience: Yup.array().of(
            //     Yup.object().shape({
            //         expertise:Yup.string().requie
            //     })
            // )
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData()

                formData.append('firstName', values.firstName)
                formData.append('lastName', values.lastName)
                formData.append('description', values.description)
                formData.append('email', values.email)
                formData.append('phone', values.phone || '')
                formData.append('portfolio', values.portfolio || '')

                formData.append('language', JSON.stringify(values.language))
                formData.append('skills', JSON.stringify(values.skills))

                formData.append('experience', JSON.stringify(values.experience))
                formData.append('education', JSON.stringify(values.education))


                if (values.photo instanceof File) {
                    formData.append('photo', values.photo)
                }

                values.certification!.forEach((cert, index) => {
                    formData.append(`certification[${index}][name]`, cert.name)
                    formData.append(`certification[${index}][year]`, cert.year.toString())
                    if (cert.file instanceof File) {
                        formData.append(`certification[${index}][file]`, cert.file)
                    }
                })

                const response = await axios.post('http://localhost:7070/freelancer/application', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                console.log('Server response:', response.data)
                toast.success(response.data.message)
                navigate('/freelancer/home')
            } catch (error: any) {
                console.error('Error submitting freelancer application:', error);
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred during the submission');
                }
            }
        }
    })

    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
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
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Uploaded preview"
                                            className="h-36 w-36 rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserCircleIcon className="h-36 w-36 text-gray-300" aria-hidden="true" />
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                                    >
                                        Add
                                    </button>
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
                                        placeholder="Describe yourself..."
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                </div>
                            </div>

                            {/* Select Language */}
                            <div className="flex items-start">
                                <label htmlFor="language" className="block py-3 text-sm font-medium leading-6 text-gray-900 w-1/4">
                                    Select Language
                                </label>
                                <div className="w-3/4">
                                    <select
                                        id="language"
                                        name="language"
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
                                <label htmlFor="experience" className="block text-sm font-medium py-3 leading-6 text-gray-900 w-1/4">
                                    Experience
                                </label>
                                <div className="flex space-x-2 w-3/4">
                                    <input
                                        type="text"
                                        placeholder="Expertise In"
                                        value={formik.values.experience[0].expertise}
                                        onChange={(e) => formik.setFieldValue('experience[0].expertise', e.target.value)}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="From (Year)"
                                        value={formik.values.experience[0].fromYear}
                                        onChange={(e) => formik.setFieldValue('experience[0].fromYear', e.target.value)}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="To (Year)"
                                        value={formik.values.experience[0].toYear}
                                        onChange={(e) => formik.setFieldValue('experience[0].toYear', e.target.value)}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1  focus:ring-gray-600 focus:border-gray-600 ring-0"
                                    />
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex items-start mt-10">
                                <label htmlFor="skills" className="block text-sm font-medium leading-6 py-3 text-gray-900 w-1/4">
                                    Skills
                                </label>
                                <div className="relative w-3/4 flex flex-col">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="skills"
                                            placeholder={formik.values.skills.join(', ')}
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

                            {/* Education */}
                            <div className="flex items-start mt-10">
                                <label htmlFor="education" className="block text-sm py-3 font-medium leading-6 text-gray-900 w-1/4">
                                    Education
                                </label>
                                <div className="w-3/4">
                                    <table className="min-w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className='text-gray-400 text-balance border bg-gray-500/10 border-gray-300 px-4'>
                                                <th className="font-normal py-2">College/University Name</th>
                                                <th className="font-normal px-4 py-2">Title</th>
                                                <th className="font-normal px-4 py-2">Year</th>
                                                <th className="font-normal px-4 py-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formik.values.education?.map((edu, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 px-4 py-2">{edu.collageName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{edu.title}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{edu.year}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteEducation(index)}
                                                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
                                                <th className="font-normal px-4 py-2">File</th>
                                                <th className="font-normal px-4 py-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {certifications!.map((cert: any, index: number) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 px-4 py-2">{cert.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{cert.year}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {cert.file ? cert.file.name : 'No file'}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteCertificate(index)}
                                                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
                                        id="portfolio"
                                        name="portfolio"
                                        placeholder="Provide a link to your own professional website"
                                        value={formik.values.portfolio}
                                        onChange={formik.handleChange}
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
                            {/* Email */}
                            <div className="flex items-center w-2/4">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='Your Registered Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                                />
                                <label htmlFor="email" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                                    Verified
                                </label>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start w-2/4">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder='Phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
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

            {/* Education Modal */}
            {isEducationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-3/5 p-5 rounded shadow-lg z-60">
                        <h2 className="text-lg font-bold mb-4">Add New Education</h2>
                        <input
                            type="text"
                            placeholder="College/University Name"
                            value={newEducation.collageName}
                            onChange={(e) => setNewEducation({ ...newEducation, collageName: e.target.value })}
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            value={newEducation.title}
                            onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                        />
                        <select
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                            onChange={(e) => setNewEducation({ ...newEducation, year: parseInt(e.target.value) })}
                            value={newEducation.year}
                        >
                            <option value="">Select year</option>
                            {[...Array(30)].map((_, i) => (
                                <option key={i} value={new Date().getFullYear() - i}>
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

            {isCertificationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-3/5 p-5 rounded shadow-lg z-60">
                        <h2 className="text-lg font-bold mb-4">Add New Certification</h2>
                        <input
                            type="text"
                            placeholder="Certificate or Award"
                            value={newCertification.name}
                            onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                        />
                        <select
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                            onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                            value={newCertification.year}
                        >
                            <option value="">Select year</option>
                            {[...Array(30)].map((_, i) => (
                                <option key={i} value={`${new Date().getFullYear() - i}`}>
                                    {new Date().getFullYear() - i}
                                </option>
                            ))}
                        </select>
                        <input
                            type="file"
                            onChange={handleCertificateFileChange}
                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 ring-0"
                        />
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
        </div>
    )
}