import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import LoginPage from '../Pages/AdminPages/LoginPage'
import Layout from '../Components/Common/AdminCommon/AdminLayout'
import Freelancers from '../Components/AdminComponent/FreelancerApplicationList'
import Users from '../Components/AdminComponent/UsersList'
import AdminLoggedIn from '../Services/adminServices/adminLoggedIn'
import AdminLoggedOut from '../Services/adminServices/adminLoggedOut'
import Dashboard from '../Components/AdminComponent/Dashboard'
import CategoryList from '../Components/AdminComponent/CategoryList'


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
          <Route index element={<Dashboard/>}/>
          <Route path='applications' element={<Freelancers/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='categories' element={<CategoryList/>}/>
        </Route>
      </Route>
        
    </Routes>
    </>
  )
}

export default AdminRoutes
