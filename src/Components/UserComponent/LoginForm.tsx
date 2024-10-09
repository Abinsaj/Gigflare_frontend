import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useFormAction, useNavigate } from 'react-router-dom';
import { verifyLogin } from '../../Redux/actions/userActions';
import { AppDispatch } from '../../Redux/store';
import { toast,Toaster } from 'sonner';

const LoginForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: any)=> state.user);

    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },
        onSubmit: async(values)=>{
            try {
                const loginResult = await dispatch(verifyLogin(values)).unwrap();
                if(loginResult){
                    if(loginResult.userInfo?.isBlocked){
                        toast.error('You are restricted from accessing the site.')
                        return
                    }
                    toast.success('Login successful')
                    setTimeout(()=>{
                        navigate("/")
                    },1500)
                }
                
            } catch (error: any) {
                toast.error(error.message || "An error occured")
            }
        }
    })

    return (
        <>
            <div className='w-full h-screen flex items-start'>
                <div className="relative w-1/2 h-full flex-col hidden md:flex">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="text-4xl text-white font-bold my-4 opacity-90">
                            Start your journey here.
                        </h1>
                        <p className="text-xl text-gray-50 font-normal opacity-100">
                            Start for free and start interacting with thousands of freelancers.
                        </p>
                    </div>
                    <img
                        className="w-full h-full object-cover bg-transparent "
                        src={require('../../Assets/Loginimg.jpg')}
                        alt='Background Image'
                    />
                </div>
                <div className="w-full md:w-1/2 sm:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8 ml-auto">
                    <div className="flex h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt="Your Company"
                                src={require('../../Assets/logo.jpg')}
                                className="mx-auto h-10 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Log In
                            </h2>
                           
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-6 " onSubmit={formik.handleSubmit}>

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
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
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
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"/>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#04A118] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04A118]">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Don't have an GIGFLARE account?{' '}
                                <a href="#" className="font-semibold leading-6 text-[#04A118] hover:text-[#04A118]">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default LoginForm
