import React from 'react'
import { Formik, useFormik } from 'formik'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { verifyAdmin } from '../../Redux/actions/adminAction'
import { AppDispatch } from '../../Redux/store'
import { setAdmin } from '../../Redux/slices/adminSlice'

const AdminLoginForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async(values)=>{
            try {
                const submit = await dispatch(verifyAdmin(values));
                console.log(submit, ' the data we got after submit');
                if(submit.payload.message === 'Invalid Email'){
                    toast.error('Invalid Email');
                }else if(submit.payload.message === 'Wrong Password'){
                    toast.error('wrong Password');
                }else{
                    toast.success('Login successful');
                    dispatch(setAdmin(submit.payload.cred))
                    navigate('/admin/')
                }
            } catch (error) {
                toast.error('Invalid Credential for Admin Login')
            }
        }
    })

    return (
        <>
            <Disclosure as="nav" className="bg-[#1C1C1C]">
                <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src={require('../../Assets/logo.jpg')}
                                    className="h-10 w-auto "
                                />
                            </div>

                        </div>


                    </div>
                </div>

                {/* Mobile Search */}

                <DisclosurePanel className="sm:hidden">

                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <div className="relative flex items-center w-full h-10">
                            <MagnifyingGlassIcon
                                className="absolute left-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                className="block w-full h-full pl-10 pr-3 rounded-md border border-gray-300 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                            />
                        </div>

                    </div>
                </DisclosurePanel>
            </Disclosure>

            <div className="w-full  h-full bg-white flex flex-col justify-start px-4 py-6 sm:px-6 lg:px-8 ml-auto">
                    <div className="flex h-full w-full flex-1 flex-col justify-start px-6 py-36 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt="Your Company"
                                src={require('../../Assets/logo.jpg')}
                                className="mx-auto h-15 w-48"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                 ADMIN LOGIN
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="" method="POST" className="space-y-6 "onSubmit={formik.handleSubmit} >

                                <div>
                                    <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder='Email'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoComplete="email"
                                            className="w-full h-10 border rounded-md border-black text-sm bg-white outline-none px-1 py-1" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder='Password'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoComplete="current-password"
                                            className="w-full h-10 border rounded-md border-black text-sm bg-white outline-none px-1 py-3"/>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center h-10 rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#04A118] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04A118]">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            {/* <p className="mt-10 text-center text-sm text-gray-500">
                                Don't have an GIGFLARE account?{' '}
                                <a href="#" className="font-semibold leading-6 text-[#04A118] hover:text-[#04A118]">
                                    Sign Up
                                </a>
                            </p> */}
                        </div>
                    </div>
                </div> 
        </>
    )
}

export default AdminLoginForm
