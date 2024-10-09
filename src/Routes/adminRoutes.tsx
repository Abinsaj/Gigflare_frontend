import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import LoginPage from '../Pages/AdminPages/LoginPage'
import AdminDashboard from '../Pages/AdminPages/AdminDashboard'
import AdminProtector from '../Services/adminProtector'


function AdminRoutes() {
  return (
    <>
    <Routes>
        <Route path='' element = {<LoginPage/>}/>
        <Route path='/dashboard' element = {<AdminProtector><AdminDashboard/></AdminProtector>}/>das
    </Routes>
    </>
  )
}

export default AdminRoutes
