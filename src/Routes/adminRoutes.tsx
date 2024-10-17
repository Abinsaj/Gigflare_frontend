import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import LoginPage from '../Pages/AdminPages/LoginPage'
import Layout from '../Components/Common/AdminCommon/AdminLayout'
import Freelancers from '../Components/AdminComponent/FreelancerApplicationList'
import Users from '../Components/AdminComponent/UsersList'


function AdminRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element = {<LoginPage/>}/>
        <Route path='/' element={<Layout/>}>
        <Route path='freelancers' element={<Freelancers/>}/>
        <Route path='users' element={<Users/>}/>
        </Route>
    </Routes>
    </>
  )
}

export default AdminRoutes
