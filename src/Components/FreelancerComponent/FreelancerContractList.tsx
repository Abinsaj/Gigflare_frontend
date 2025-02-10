import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Button, Badge } from "@nextui-org/react"
import { CalendarDays, IndianRupee } from 'lucide-react'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import { getContracts } from '../../Services/freelancerService/freelancerAxiosCalls'
import LoadingSpinner from '../Common/LoadinSpinner'
import { useNavigate } from 'react-router-dom'
import { posted } from '../../config/timeAgo'


const statusVariants = {
    active: "success",
    completed: "primary",
    pending: "warning",
}

export default function ContractList() {

    const {freelancer} = useFreelancer()
    const id = freelancer?._id
    console.log(id,'we also got the id')
    const [contract, setContract] = useState<any[]>([])
    const navigate = useNavigate()

  
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        if (!id) return;
        try {
            const response = await getContracts(id);
            setContract(response);
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
        return <LoadingSpinner/>;
    }
    
    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">All Contracts</h1>
                {/* <p className="text-gray-500 mt-1">Manage your active and past contracts</p> */}
            </div>
            <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <div className="flex gap-4 sm:gap-8">
                    {/* <button className="pb-2 sm:pb-4 border-b-2 border-green-600 text-green-600 font-medium text-sm sm:text-base">
                        Contracts
                    </button> */}
                    {/* <button className="pb-2 sm:pb-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base">
                            Inactive
                        </button> */}
                </div>
            </div>

            {contract && contract.length > 0 ? (
                <div className="space-y-4   rounded-md md:space-y-6">
                {contract.map((value: any)=>(
                    <Card className="w-full p-5 border border-gray-100 shadow-lg rounded-md">
                    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-2 flex-grow">
                            <h2 className="text-lg font-bold">{value.jobId.title}</h2>
                            <p className="text-gray-500 text-sm line-clamp-2">{value.jobId.description}</p>
                        </div>
                        <Badge className='bg-green-300' variant="flat">
                            {value.status}
                        </Badge>
                    </CardHeader>
                    <CardBody>
                        <div className='flex justify-between'>

                        <div className="grid gap-20 pt-5  sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                <div className="text-sm ">
                                    <p className="text-gray-500">Starts From</p>
                                    <p>{posted(value.startDate)} </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                <div className="text-sm ">
                                    <p className="text-gray-500">Deadline</p>
                                    <p> {posted(value.endDate)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4 text-gray-500" />
                                <div className="text-sm">
                                    <p className="text-gray-500">Total Budget</p>
                                    <p className="font-medium">{value.totalBudget}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex items-center pt-6 sm:col-span-2 md:col-span-1 md:justify-end">
                                <Button 
                                    onClick={()=>navigate('/freelancer/contract',{state:value})}
                                    className='border bg-[#1AA803] text-white rounded-md'
                                    color="primary"
                                    variant="bordered"
                                    
                                    >
                                    View Contract
                                </Button>
                        </div>
                        </div>
                    </CardBody>
                </Card>
                ))}
            </div>
            ):(
                <p>No contract have made</p>
            )}
            
        </div>
    )
}

