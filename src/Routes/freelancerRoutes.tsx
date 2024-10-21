import { Routes, Route } from "react-router-dom";
import FreelancerHome from "../Pages/FreelancerPages/FreelancerHome";


const FreelancerRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/home" element={<FreelancerHome/>}/>
            
        </Routes>
        </>
    )
}

export default FreelancerRoutes;