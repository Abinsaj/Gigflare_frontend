import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getWorkHistory } from '../../Services/userServices/userAxiosCalls'; // Add this API call
import WorkHistoryModal from '../Common/UserCommon/WorkHistoryModal';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';
import FreelancerModal from '../Common/UserCommon/FreelancerModal';
import LoadingSpinner from '../Common/LoadinSpinner';

const WorkHistory = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
    const [historyData, setHistoryData] = useState<any>(null);
    const [freelancerData, setFreelancerData] = useState<any>(null)
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [filter, setFilter] = useState<'all' | 'completed' | 'In-progress'>('all')
    const user = useSelector((state: RootState)=> state.user.userInfo)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchWorkHistory = async () => {
            try {
                const response = await getWorkHistory(user?._id); 
                console.log(response,'this is response')
                setData(response.data);
                setFilteredData(response.data)
                
            } catch (error) {
                console.error("Error fetching work history:", error);
            }finally{
                setLoading(false)
            }
        };

        fetchWorkHistory();
    }, []);

    const handleFilterChange = (status: 'all' | 'completed' | 'In-progress')=>{
        setFilter(status)
        if(status == 'all'){
            setFilteredData(data)
        }else if(status == 'completed'){
            setFilteredData(data.filter(item=>item.status == 'completed'))
        }else if(status == 'In-progress'){
            setFilteredData(data.filter(item=>['active', 'initial_payment', 'submitted'].includes(item.status)))
        }
    }

    const openModal = (data: any) => {
        setIsModalOpen(true);
        setHistoryData(data);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHistoryData(null);
    };

    console.log(data,'this is the work history to show up')

    const openFreelancerModal=(id: string) =>{
        setProfileModalOpen(true)
        setFreelancerData(id)
    }

    const closeFreelancerModal = ()=>{
        setProfileModalOpen(false)
        setFreelancerData(null)
    }

    if(loading){
        return(
            <LoadingSpinner/>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 min-h-screen py-8">
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                <button
                        onClick={() => handleFilterChange('all')}
                        className={`pb-2 sm:pb-4 ${filter === 'all' ? 'border-b-2 border-green-600 text-green-600 font-medium' : 'text-gray-500 font-medium'} text-sm sm:text-base`}
                    >
                        All Work
                    </button>
                    <button
                        onClick={() => handleFilterChange('completed')}
                        className={`pb-2 sm:pb-4 ${filter === 'completed' ? 'border-b-2 border-green-600 text-green-600 font-medium' : 'text-gray-500 font-medium'} text-sm sm:text-base`}
                    >
                        Completed Work
                    </button>
                    <button
                        onClick={() => handleFilterChange('In-progress')}
                        className={`pb-2 sm:pb-4 ${filter === 'In-progress' ? 'border-b-2 border-green-600 text-green-600 font-medium' : 'text-gray-500 font-medium'} text-sm sm:text-base`}
                    >
                        In Progress
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="pb-4 flex text-gray-500 ml-auto">
                        <ArrowLeft /> Go Back
                    </button>
                </div>
            </div>


            {filteredData && filteredData.length > 0 ? (
                <div className="space-y-4">
                {filteredData.map((history: any) => (
                    <div key={history._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start gap-6">
                                {/* <img
                                    src={history.freelancer.photo}
                                    alt=""
                                    className="w-24 h-24 rounded-lg object-cover"
                                /> */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {/* {history.freelancerId.firstName} {history.freelancerId.lastName} */}
                                        {history.jobId.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Freelancer {history.freelancerId.firstName} {history.freelancerId.lastName}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Completion Date: {new Date(history.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Status: {history.status}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Amount: {history.totalBudget}
                                    </p>
                                    {/* <div className="flex items-center gap-1 mt-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < history.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-1">
                                            ({history.rating} stars)
                                        </span>
                                    </div> */}
                                </div>
                                <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => openFreelancerModal(history.freelancer)}
                                    className="w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Freelancer
                                </button>
                                <button
                                    onClick={() => openModal(history)}
                                    className="w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    View Details
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            ):(
                <p>No worklist</p>
            )}

            
            {filteredData && filteredData.length > 0 && (
                <div className="flex items-end justify-between mt-8">
                <div className="text-sm text-gray-500">
                    {/* Add dynamic pagination details */}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-600 text-white">
                        1
                    </div>
                    <button
                        className="p-2 rounded-full text-gray-400 disabled:opacity-50"
                        disabled
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
            )}

            {isModalOpen && historyData && (
                <WorkHistoryModal work={historyData} onClose={closeModal} />
            )}

            {profileModalOpen && freelancerData && (
                <FreelancerModal freelancer = {freelancerData} onClose={closeFreelancerModal}/>
            )}
        </div>
    );
};

export default WorkHistory;
