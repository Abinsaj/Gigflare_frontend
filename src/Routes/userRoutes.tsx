import { Route, Routes } from 'react-router-dom'
import SignUpPage from '../Pages/UserPages/SignupPage'
import ClientLogin from '../Pages/UserPages/LoginPage'
import Home from '../Pages/UserPages/Home'
import OtpPage from '../Pages/UserPages/OtpPage'
import UserLoggedOut from '../Services/userServices/userLoggedOut'
import UserLoggedIn from '../Services/userServices/userLoggedIn'
import ForgotPasswordPage from '../Pages/UserPages/ForgotPasswordPage'
import ForgotPasswordOtpPage from '../Pages/UserPages/ForgotPasswordOtp'
import ChangePassword from '../Components/UserComponent/ChangePassword'
import ApplicationPage from '../Pages/UserPages/ApplicationPage'
import ProfilePage from '../Pages/UserPages/ProfilePage'
import FreelancerListPage from '../Pages/UserPages/FreelancerListPage'
import JobListPage from '../Pages/UserPages/JobListPage'
import ContractsPage from '../Pages/UserPages/ContractsPage'
import ProposalsPage from '../Pages/UserPages/ProposalsPage'
import JobOfferPage from '../Pages/UserPages/JobOfferPage'
import ApprovedProposalPage from '../Pages/UserPages/ApprovedProposalPage'
import MessageLayout from '../Components/MessageComponen/UserMessageComponent/MessageLayout'
import Contract from '../Components/UserComponent/Contract'
import PaymentSuccess from '../Components/Common/PaymentSuccess'
import PaymentFailed from '../Components/Common/PaymentFailed'
import WorkListPage from '../Pages/UserPages/WorkListPage'
import TransactionHistoryPage from '../Pages/UserPages/TransactionHistoryPage'
import TransactionDetailsPage from '../Components/Common/TransactionDetails'


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

        <Route path='' element = {<UserLoggedIn/>} >
          <Route path="/application" element = {<ApplicationPage/>}/> 
          <Route path='/profile' element = {<ProfilePage/>}/>  
          <Route path='/freelancerslist' element={<FreelancerListPage/>}/>
          <Route path='/joblist' element={<JobListPage/>}/>
          <Route path='/contracts' element={<ContractsPage/>}/>
          <Route path='/contract' element={<Contract/>}/>
          <Route path='/proposals' element={<ProposalsPage/>}/>
          <Route path='/sendoffer' element={<JobOfferPage/>}/>
          <Route path='/approvedproposal' element={<ApprovedProposalPage/>}/>
          <Route path='/message' element={<MessageLayout/>}/>
          <Route path='/message/:id' element={<MessageLayout/>}/>
          <Route path='/success' element={<PaymentSuccess/>}/>
          <Route path='/failed' element={<PaymentFailed/>}/>
          <Route path='/worklist' element={<WorkListPage/>}/>
          <Route path='/transactions' element={<TransactionHistoryPage/>}/>
          <Route path='/transactiondetail' element={<TransactionDetailsPage/>}/>
        </Route>
           

    </Routes>
    </>
  )
}

export default UserRoutes
