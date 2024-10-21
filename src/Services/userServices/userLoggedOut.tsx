
import { Navigate, Outlet } from "react-router-dom";

const UserLoggedOut = ()=>{
    const userData = localStorage.getItem('userInfo')
    console.log(userData, 'the data is')
    return (
        userData ? <Navigate to='/'/> : <Outlet/>
    )
}

export default UserLoggedOut