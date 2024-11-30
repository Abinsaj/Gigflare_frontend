import { Routes, Route } from "react-router-dom";
import FreelancerHomePage from "../Pages/FreelancerPages/FreelancerHomePage";
import ProfilePage from "../Pages/FreelancerPages/ProfilePage";
import JobListPage from "../Pages/FreelancerPages/JobListPage";
import EditProfilePage from "../Pages/FreelancerPages/EditProfilePage";
import GetJobDetailsPage from "../Pages/FreelancerPages/getJobDetailsPage";
import FreelancerLayout from "../Components/Common/FreelancerCommon/FreelancerLayout";
import Dashboard from "../Components/FreelancerComponent/FreelancerDashboard";
import DashboardPage from "../Pages/FreelancerPages/DashboardPage";
import FreelancerProvider from "../context/FreelancerContext/FreelancerData";
import ProposalsList from "../Components/FreelancerComponent/ListProposals";
import MessageLayout from "../Components/MessageComponen/UserMessageComponent/MessageLayout";
import JobOffers from "../Components/FreelancerComponent/JobOffers";
import ContractList from "../Components/FreelancerComponent/FreelancerContractList";
import ContractPage from "../Components/FreelancerComponent/Contract";

const FreelancerRoutes = () => {
    return (
        <>
            <FreelancerProvider>
        <Routes>

                <Route path="/home" element={<FreelancerHomePage />} />
                <Route path="/freelancerprofile" element={<ProfilePage />} />
                <Route path="/joblist" element={<JobListPage />} />
                <Route path="/editprofile" element={<EditProfilePage />} />
                <Route path='/viewjobdetials' element={<GetJobDetailsPage />} />
                <Route path="/freelancermessage" element={<MessageLayout/>}/>
                <Route path="/contract" element={<ContractPage/>}/>
                
                <Route element={<FreelancerLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="proposal" element={<ProposalsList />} /> 
                    <Route path="offers" element={<JobOffers />} /> 
                    <Route path="contractlist" element={<ContractList/>} />
                    {/* <Route path="projects" element={} */}
                    {/* <Route path="payment" element={<EditProfilePage />} /> */}
                </Route>


        </Routes>
            </FreelancerProvider>
            
        </>
    )
}

export default FreelancerRoutes;