import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../Redux/store";

const AdminLoggedOut = ()=>{

    const adminData = localStorage.getItem('adminInfo')
    const admin = useSelector((state:RootState)=>state.admin)

    console.log(adminData,'this is the admin data')

    return (
        adminData ? <Navigate to = '/admin/dashboard'/> : <Outlet/>
    )
}

export default AdminLoggedOut