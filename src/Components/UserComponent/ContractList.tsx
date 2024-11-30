import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Button, Badge, Chip } from "@nextui-org/react"
import { CalendarDays, DollarSign, IndianRupee,SlidersHorizontal, Search } from 'lucide-react'
import LoadingSpinner from '../Common/LoadinSpinner'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getContractList } from '../../Services/userServices/userAxiosCalls'


export default function ContractList() {

    const user = useSelector((state: RootState)=>state.user.userInfo)
    const id = user?._id
    console.log(id,'we also got the id')
    const [contract, setContract] = useState<any[]>([])
    const navigate = useNavigate()

  
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        if (!id) return;
        try {
            const response = await getContractList(id);
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
        <div className="max-w-7xl mx-auto px-4 h-screen py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">All Contracts</h1>
                {/* <p className="text-gray-500 mt-1">Manage your active and past contracts</p> */}
            </div>
            <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <div className="flex gap-4 sm:gap-8">
                    <button className="pb-2 sm:pb-4 border-b-2 border-green-600 text-green-600 font-medium text-sm sm:text-base">
                        Contracts
                    </button>
                    {/* <button className="pb-2 sm:pb-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base">
                            Inactive
                        </button> */}
                </div>
            </div>

            <div className="space-y-4   rounded-md md:space-y-6">
                {contract.map((value: any)=>(
                    <Card className="w-full p-5 border border-gray-100 shadow-lg rounded-md">
                    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-2 flex-grow">
                            <h2 className="text-xl font-bold">{value.jobId.title}</h2>
                            <p className="text-gray-500 line-clamp-2">{value.jobId.description}</p>
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
                                    <p className="text-gray-500">Duration</p>
                                    <p>{new Date(value.startDate).toLocaleDateString()} </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                <div className="text-sm ">
                                    <p className="text-gray-500">Duration</p>
                                    <p> {new Date(value.endDate).toLocaleDateString()}</p>
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
                                    onClick={()=>navigate('/contract',{state:{contractData:value,userId:id}})}
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
        </div>
    )
}

