import React, { useEffect, useState } from 'react'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import LoadingSpinner from '../Common/LoadinSpinner'
import { useNavigate } from 'react-router-dom'
import { getWorkHistory } from '../../Services/freelancerService/freelancerAxiosCalls'
import ViewWork from './Works'


export default function WorkHistory() {

    const { freelancer } = useFreelancer()
    const id = freelancer?._id
    const [workHistory, setWorkContract] = useState<any[]>([])
    const navigate = useNavigate()


    const [isLoading, setIsLoading] = useState(true);
    const [selectedWork, setSelectedWork] = useState<any | null>(null)

    const fetchData = async () => {
        if (!id) return;
        try {
            const response = await getWorkHistory(id);
            if(response.data){

                setWorkContract(response.data);
            }
        } catch (error) {
            console.error("Error fetching contracts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">All Works</h1>
                {/* <p className="text-gray-500 mt-1">Manage your active and past contracts</p> */}
            </div>
            <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <div className="flex gap-4 sm:gap-8">
                    {/* <button className="pb-2 sm:pb-4 border-b-2 border-green-600 text-green-600 font-medium text-sm sm:text-base">
                        Works
                    </button> */}
                    {/* <button className="pb-2 sm:pb-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base">
                            Inactive
                        </button> */}
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">
                {workHistory.length === 0 ? (
                    <p className="text-gray-500 text-center">No work history available.</p>
                ) : (
                    <div className="space-y-6">
                        {workHistory.map((work, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg shadow-md p-6"
                                onClick={() => setSelectedWork(work)}
                            >
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {work.jobId.title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    <strong>Client:</strong> {work.clientId.name}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Contract Period:</strong>{" "}
                                    {new Date(work.startDate).toLocaleDateString()}-{new Date(work.endDate).toLocaleDateString()} -{''}
                                    {work.status !== 'completed'
                                        ? 'ongoing'
                                        : "completed"}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Status:</strong> {work.status}
                                </p>
                                {/* {work.rating !== null && (
                                    <p className="text-yellow-500">
                                        <strong>Rating:</strong> {work.rating} / 5
                                    </p>
                                )}
                                {work.review && (
                                    <p className="text-gray-500 mt-2">
                                        <strong>Review:</strong> "{work.review}"
                                    </p>
                                )} */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedWork && (
                <ViewWork
                    work={selectedWork}
                    closeModal={() => setSelectedWork(null)} // Close modal handler
                />
            )}
        </div>
    )
}

