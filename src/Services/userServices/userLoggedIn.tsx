import { Navigate, Outlet } from "react-router-dom"

function UserLoggedIn() {
  const userData = localStorage.getItem('userInfo')
  console.log(userData,'this is the admin data')
  return (
    userData ? <Outlet/> : <Navigate to = '/'/>
  )
}

export default UserLoggedIn
