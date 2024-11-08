

import React, { useState, useRef } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { UserCircle, Trash2, Plus, Upload } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().matches(/^[A-Z][a-zA-Z]*$/, "First letter should be capital").required("First name is required"),
  lastName: Yup.string().matches(/^[A-Z][a-zA-Z]*$/, "First letter should be capital").required("Last name is required"),
  description: Yup.string().min(50, "Minimum 50 characters required").required("Description is required"),
  language: Yup.array().of(Yup.string().required('Language is required')).min(1, "At least one language must be selected"),
  experience: Yup.array().of(
    Yup.object().shape({
      expertise: Yup.string().required('Expertise is required'),
      fromYear: Yup.number().required('From year is required').min(2010, 'Year must be after 2010').max(new Date().getFullYear(), 'Year cannot be in the future'),
      toYear: Yup.number().required('To year is required').min(Yup.ref('fromYear'), 'To year must be greater than or equal to from year').max(new Date().getFullYear(), 'Year cannot be in the future')
    })
  ),
  skills: Yup.array().of(Yup.string().required('Skill is required')).min(1, 'At least one skill is required'),
  education: Yup.array().of(
    Yup.object().shape({
      collageName: Yup.string().required('College/University name is required').min(2, 'College name must be at least 2 characters'),
      title: Yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
      year: Yup.number().required('Year is required').min(1950, 'Year must be after 1950').max(new Date().getFullYear(), 'Year cannot be in the future')
    })
  ),
  certification: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Certification name is required').min(2, 'Certification name must be at least 2 characters'),
      year: Yup.number().required('Year is required').min(1950, 'Year must be after 1950').max(new Date().getFullYear(), 'Year cannot be in the future'),
    })
  ),
  email: Yup.string().required('Email is required').email('Must be a valid email address'),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
})

export default function EditProfile() {

    const location = useLocation()
    const freelancerData = location.state || {}
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [initialValues, setInititalValues] = useState<any>()

  setInititalValues(freelancerData)
 console.log(initialValues,'this is the initial value')
  // setImagePreview(freelancerData.profile)
  const handleSubmit = (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    console.log(values)
    // Here you would typically send the form data to your backend
    setSubmitting(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.currentTarget.files?.[0]
    if (file) {
      if (file.size > 5000000) {
        alert('File too large')
      } else {
        setFieldValue('photo', file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className="max-w-full pl-20 pr-20 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm h-10 font-medium text-gray-700">First Name</label>
                <Field name="firstName" placeholder={freelancerData.firstName} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm h-10 font-medium text-gray-700">Last Name</label>
                <Field name="lastName" type="text" placeholder={freelancerData.lastName} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <div className="mt-1 flex items-center space-x-4">
                {freelancerData ? (
                  <img src={freelancerData.profile} alt="Profile preview" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <UserCircle className="w-24 h-24 text-gray-300" />
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Upload New Photo
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Field name="description" as="textarea" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Languages</label>
              <FieldArray name="language">
                {({ push, remove }) => (
                  <div>
                 
                      <div className="flex items-center space-x-2 mt-2">
                        <Field name= 'language' type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                      
                          <button type="button" className="text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
                      
                      </div>
                 
                    <button type="button" className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Plus className="h-5 w-5 mr-1" /> Add Language
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="language" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <FieldArray name="experience">
                {({ push, remove }) => (
                  <div>
                    
                      <div  className="grid grid-cols-3 gap-4 mt-2">
                        <Field type="text" placeholder="Expertise" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                        <Field  type="number" placeholder="From Year" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                        <Field type="number" placeholder="To Year" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
            
                          <button type="button"  className="text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
              
                      </div>
     
                    <button type="button" className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Plus className="h-5 w-5 mr-1" /> Add Experience
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <div>
                 
                      <div className="flex items-center space-x-2 mt-2">
                        <Field  type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                       
                          <button type="button"  className="text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
                   
                      </div>
                   
                    <button type="button" className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Plus className="h-5 w-5 mr-1" /> Add Skill
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <div>
                   
                      <div  className="grid grid-cols-3 gap-4 mt-2">
                        <Field type="text" placeholder="College/University Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                        <Field type="text" placeholder="Title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                        <Field type="number" placeholder="Year" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
      
                          <button type="button" className="text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
         
                      </div>

                    <button type="button" className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Plus className="h-5 w-5 mr-1" /> Add Education
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="education" component="div" className="text-red-500  text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Certification</label>
              <FieldArray name="certification">
                {({ push, remove }) => (
                  <div>
                 
                      <div  className="grid grid-cols-3 gap-4 mt-2">
                        <Field  type="text" placeholder="Certificate Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                        <Field  type="number" placeholder="Year" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            // onChange={(event) => {
                            //   const file = event.currentTarget.files?.[0]
                            //   if (file) {
                            //     setFieldValue(`certification.${index}.file`, file)
                            //   }
                            // }}
                            className="hidden"
                            // id={`certification-file-${index}`}
                          />
                          <label  className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Upload className="h-5 w-5 mr-2" /> Upload
                          </label>
                         
                            <button type="button"  className="text-red-500">
                              <Trash2 className="h-5 w-5" />
                            </button>
                     
                        </div>
                      </div>
            
                    <button type="button"  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Plus className="h-5 w-5 mr-1" /> Add Certification
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="certification" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio URL</label>
              <Field name="portfolio" type="url" placeholder="https://your-portfolio.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field name="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <Field name="phone" type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 " />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}