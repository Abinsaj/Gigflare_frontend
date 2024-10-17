import { Navigate, Route, Routes, Router } from 'react-router-dom'
import SignUpPage from '../Pages/UserPages/SignupPage'
import ClientLogin from '../Pages/UserPages/LoginPage'
import Home from '../Pages/UserPages/Home'
import OtpPage from '../Pages/UserPages/OtpPage'
import UserLoggedOut from '../Services/userLoggedOut'
import ForgotPasswordPage from '../Pages/UserPages/ForgotPasswordPage'
import ForgotPasswordOtpPage from '../Pages/UserPages/ForgotPasswordOtp'
import ChangePassword from '../Components/UserComponent/ChangePassword'
import FreelancerHome from '../Pages/FreelancerPages/FreelancerHome'

const UserRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='' element = {<Home/>}/>
        <Route path='' element = {<UserLoggedOut/>}>
        <Route path='/signup' element = {<SignUpPage/>}/>
        <Route path='/login' element = {<ClientLogin/>}/>
        <Route path='/otp' element = {<OtpPage/>}/>
        <Route path='/forgotpassword' element = {<ForgotPasswordPage/>} />
        <Route path='/forgotpasswordOtp' element = {<ForgotPasswordOtpPage/>}/>
        <Route path='/changepassword' element = {<ChangePassword/>}/>
        </Route>
      

    </Routes>
    </>
  )
}

export default UserRoutes
