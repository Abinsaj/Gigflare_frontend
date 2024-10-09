import { Routes, Route } from "react-router-dom";
import FreelancerHome from "../Pages/FreelancerPages/FreelancerHome";
import ApplicationPage from "../Pages/FreelancerPages/ApplicationPage";

const FreelancerRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/home" element={<FreelancerHome/>}/>
            <Route path="/application" element = {<ApplicationPage/>}/>
        </Routes>
        </>
    )
}

export default FreelancerRoutes;