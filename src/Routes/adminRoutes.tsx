import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import LoginPage from '../Pages/AdminPages/LoginPage'
import Layout from '../Components/Common/AdminCommon/AdminLayout'
import FreelancersApplication from '../Components/AdminComponent/FreelancerApplicationList'
import Users from '../Components/AdminComponent/UsersList'
import AdminLoggedIn from '../Services/adminServices/adminLoggedIn'
import AdminLoggedOut from '../Services/adminServices/adminLoggedOut'
import Dashboard from '../Components/AdminComponent/Dashboard'
import CategoryList from '../Components/AdminComponent/CategoryList'
import Freelancers from '../Components/AdminComponent/FreelancersList'
import FreelancerDetails from '../Components/AdminComponent/FreelancerDetails'
import JobLists from '../Components/AdminComponent/JobList'
import JobDetails from '../Components/AdminComponent/JobDetails'
import ContractList from '../Components/AdminComponent/ContractList'
import SkillList from '../Components/AdminComponent/SkillList'
import TransactionPayment from '../Components/AdminComponent/TransactionPayment'


function AdminRoutes() {
  return (
    <>
    <Routes>

       {/* user befor access */}

      <Route path='' element = {<AdminLoggedOut/>}>
        <Route path='/login' element = {<LoginPage/>}/>
      </Route>

      {/* user after access */}

      <Route path='' element = {<AdminLoggedIn/>}>
        <Route element={<Layout/>}>
          <Route path='/' index element={<Dashboard/>}/>
          <Route path='applications' element={<FreelancersApplication/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='freelancers' element={<Freelancers/>}/>
          <Route path='categories' element={<CategoryList/>}/>
          <Route path='jobs' element={<JobLists/>}/>
          <Route path='contracts' element={<ContractList/>}/>
          <Route path='skills' element={<SkillList/>}/>
          <Route path='transactions' element={<TransactionPayment/>}/>
          <Route path='/jobdetails' element={<JobDetails/>}/>
          <Route path='/freelancerdetails' element={<FreelancerDetails/>}/>
        </Route>
      </Route>
        
    </Routes>
    </>
  )
}

export default AdminRoutes
