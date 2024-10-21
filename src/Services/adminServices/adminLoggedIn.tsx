import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../Redux/store";

const AdminLoggedIn = ()=>{

    const adminData = localStorage.getItem('adminInfo')
    console.log(adminData,'this is the admin data in localstorage')

    return (
        adminData ? <Outlet/> : <Navigate to = '/admin/login'/>
    )
}

export default AdminLoggedIn