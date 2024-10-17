import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerClient } from "../../Redux/actions/userActions";
import { useAppDispatch } from "../../Redux/store";
import { FcGoogle } from "react-icons/fc";


const SignupForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .transform((value) => value.trim())
                .matches(
                    /^[A-Z][a-zA-Z]*$/,
                    "First letter should be capital"
                )
                .required('Name is required'),
            email: Yup.string()
                .transform((value) => value.trim())
                .email('Invalid email address')
                .required("Email is required"),
            phone: Yup.string()
                .transform((value)=>value.trim())
                .matches(/^[0-9]{10}$/,"Phone number must be 10 digits")
                .required("Phone number is required"),
            password: Yup.string()
                .transform((value)=> value.trim())
                .min(8,"password must be atleast 8 characters")
                .required("password is required"),
            confirmPassword: Yup.string()
                .transform((value)=> value.trim())
                .oneOf([Yup.ref("password"),""],"Password must match")
                .required("Confirm password is required")
        })
        ,
        onSubmit: async (values) => {
            try {
                const responseResult = await dispatch(registerClient(values))
                console.log(responseResult, 'this is the resonse')
                if (responseResult.data.success) {
                    toast.success('Signup successful, OTP has been sent to your email');
                    navigate('/otp');
                }

            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred during registration');
                }
            }
        }
    })

    return (
        <>
            <div className='w-full h-screen flex items-start'>
                <div className="relative w-1/2 h-full flex-col hidden md:flex">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="text-4xl text-white font-bold my-4 opacity-70">
                            Sign up now to hire professionals.
                        </h1>
                        <p className="text-xl text-white font-normal opacity-70">
                            Start for free and start interacting with thousands of freelancers.
                        </p>
                    </div>
                    <img
                        className="w-full h-full object-cover"
                        src={require('../../Assets/SignUpimg.jpg')}
                        alt='Background Image'
                    />
                </div>
                <div className="w-full md:w-1/2 sm:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8 ml-auto">
                    <div className="flex h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-2">
                            <img
                                alt="Your Company"
                                src={require('../../Assets/logo.jpg')}
                                className="mx-auto h-12 w-auto"
                            />
                            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-base font-medium leading-3 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="name"
                                            required
                                            placeholder="Enter your name"
                                            autoComplete="name"
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.name}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Enter email"
                                            autoComplete="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                        Mobile number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="phone"
                                            name="phone"
                                            type=""
                                            required
                                            placeholder="Enter mobile number"
                                            autoComplete=""
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"
                                        />
                                        {formik.touched.phone && formik.errors.phone ? (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.phone}
                                            </div>
                                        ) : null}
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
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1" 
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-base font-medium leading-6 text-gray-900">
                                        Confirm password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            placeholder="Confirm password"
                                            autoComplete="current-password"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"
                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex h-12 w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white  mt-8 shadow-sm hover:bg-[#04A118] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04A118]"
                                    >
                                        Sign Up
                                    </button>
                                    <div className="flex items-center justify-center py-5">
                                        <div className="flex-1 border-t border-black"></div>
                                        <p className="px-3 text-gray-500">or</p>
                                        <div className="flex-1 border-t border-black"></div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex h-12 w-full justify-center border border-black rounded-md bg-[#f5f5f5] px-3 py-2 text-sm  font-semibold leading-6 text-black   shadow-sm  focus-visible:outline focus-visible:outline-2  focus-visible:outline-black"
                                    >
                                        <div className="flex justify-center gap-1 pb-4 ">


                                            <FcGoogle size={30} className="" />
                                            <h1 className="py-1">Google</h1>
                                        </div>

                                    </button>

                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already have an  account?{' '}
                                <a href="/login" className="font-semibold leading-6 text-[#04A118] hover:text-[#04A118]">
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignupForm
