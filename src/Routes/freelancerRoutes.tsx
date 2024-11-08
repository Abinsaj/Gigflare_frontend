import { Routes, Route } from "react-router-dom";
import FreelancerHomePage from "../Pages/FreelancerPages/FreelancerHomePage";
import DashboardPage from "../Pages/FreelancerPages/DashboardPage";
import ProfilePage from "../Pages/FreelancerPages/ProfilePage";
import JobListPage from "../Pages/FreelancerPages/JobListPage";
import EditProfilePage from "../Pages/FreelancerPages/EditProfilePage";
import GetJobDetailsPage from "../Pages/FreelancerPages/getJobDetailsPage";

const FreelancerRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/home" element={<FreelancerHomePage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/freelancerprofile" element={<ProfilePage/>}/>
            <Route path="/joblist" element={<JobListPage/>}/>
            <Route path="/editprofile" element={<EditProfilePage/>}/>
            <Route path='/viewjobdetials' element={<GetJobDetailsPage/>}/>
        </Routes>
        </>
    )
}

export default FreelancerRoutes;