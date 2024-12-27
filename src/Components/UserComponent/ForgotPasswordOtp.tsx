import React, { useState, useEffect, useRef } from 'react'
import { verifyOtp } from '../../Redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../Redux/store';
import { toast, Toaster } from 'sonner';
import { resendOtp } from '../../Redux/actions/userActions';
import axios from 'axios';
import axiosInstance from '../../config/userInstance';


const url = 'http://localhost:7070';

const ForgotPasswordOtp = () => {

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState<number >(60);
    const [timerActive, setTimerAtive] = useState<boolean>(true);
    const resendRef = useRef<HTMLButtonElement>(null)
    const confirmRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        
            if(timeLeft <= 0){
                if(confirmRef.current && resendRef.current){
                    resendRef.current.style.display = 'block'
                }
                return
            }
            const timer = setInterval(()=>{
                setTimeLeft((prev)=> prev > 0 ? prev - 1 : 0)
            },1000)
            return ()=>clearInterval(timer) 
        
        
    }, [timerActive,timeLeft])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtp = [...otp]
        newOtp[index] = e.target.value

        setOtp(newOtp)

        if (e.target.value.length > 0 && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            if (nextInput) {
                (nextInput as HTMLInputElement).focus()
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            if (prevInput) {
                const newOtp = [...otp]
                newOtp[index - 1] = "";
                setOtp(newOtp);
                (prevInput as HTMLInputElement).focus()
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpValue = otp.join('');
        try {
            console.log('hihihihihihihih')
            // const otpVerification = await dispatch(verifyForgotOtp(otpValue));
            const response = await axiosInstance.post(`/verifyforgototp`,{otpValue})
            console.log('The otpVerification result is:', response);
    
            if(response){
                toast.success('otp verification success')
                navigate('/changepassword')
            }
            else {
       
                toast.error('Unexpected error occurred during OTP verification');
            }
        } catch (error) {

            console.error('Error during OTP verification:', error);
            toast.error('An error occurred. Please try again.');
        }
    };
    

    // const resentOtp = async () => {
    //     toast.loading("Loading...");
    //     try {
    //         const resend = await dispatch(resendOtp())
    //         if (resend) {
    //                 toast.dismiss();
    //                 toast.success('A new OTP has been sent to your Email');
    //                 setTimerAtive(true);
    //                 setTimeLeft(60); 
    //                 if(resendRef.current && confirmRef.current){
    //                     resendRef.current.style.display = 'none'
    //                 }      
    //         }
    //     } catch (error) {
    //         toast.error('Error Resending OTP')
    //     }
    // }

    return (
        <>
            <div
                className="min-h-screen w-full bg-[#f5f5f5] flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:px-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${require('../../Assets/Otpimg.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                }}
            >

                <div className="flex h-[60vh] w-full max-w-md flex-1 flex-col justify-center mt-20 mb-20 px-6 py-4 lg:px-8 border-current bg-white bg-opacity-10 rounded-md shadow-2xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Verify your OTP
                        </h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                                    Enter OTP
                                </label>
                                <div className="mt-2 flex space-x-2 justify-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            name="otp"
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            autoComplete="one-time-code"
                                            className="w-10 h-10 text-center rounded-md border border-gray-300 bg-gray-600 bg-opacity-30 py-1.5 text-gray-900 shadow-sm ring-[#04A118] placeholder:text-gray-400 focus:ring-2 focus:ring-[#04A118] focus:border-[#04A118] focus:outline-none hover:border-[#04A118] sm:text-sm sm:leading-6"

                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-600">Time remaining:{
                                    timeLeft 
                                } </span>
                                <button
                                    type="button"
                                    className="text-sm font-semibold text-black hover:underline hover:text-[#04A118]"
                                    style={{display:'none'}}
                                    // onClick={resentOtp}
                                    ref={resendRef}
                                >
                                    Resend OTP
                                </button>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-gray-600 bg-opacity-30 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#04A118] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04A118]"
                                    ref={confirmRef}
                                    style={{display:'block'}}
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ForgotPasswordOtp

