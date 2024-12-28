
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Checkbox, Button } from "@nextui-org/react"
import { MoreVertical, Briefcase, TrendingUp,FileText ,CheckCircle, IndianRupee } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { getWeekDateRange, posted } from "../../config/timeAgo"
import { useEffect, useState } from "react"
import { getDashboardData, getGraphData } from "../../Services/adminServices/adminAxiosCall"
import LoadingSpinner from "../Common/LoadinSpinner"


interface DashboardData {
  totalJobs: number;
  activeContracts: number;
  completedContracts: number;
  totalProfit: number;
  recentContracts: any
}

const Dashboard=()=> {

  const [timeframe, setTimeframe] = useState<"WEEKLY" | "MONTHLY" | "YEARLY">("MONTHLY")
  const [data, setData] = useState<DashboardData | null>(null)
  const [ graphData, setGraphData] = useState<{label: string, value: number}[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true)
      try {
        console.log(timeframe,'this is the time frame')
        const [dashboardResponse, graphResponse] = await Promise.all([
          getDashboardData(),
          getGraphData(timeframe)
        ])

        if(dashboardResponse.success == true){
          setData(dashboardResponse.data)
        }

        if(graphResponse.success == true){
          const formattedGraphData = graphResponse.data.map((item: any) => {
            if (timeframe === "WEEKLY") {
              const label = getWeekDateRange(item.label, new Date().getFullYear());
              return { label, value: item.value };
            } else if (timeframe === "MONTHLY") {
              return { label: item.label, value: item.value };
            } else if (timeframe === "YEARLY") {
              return { label: item.label, value: item.value };
            }
            return item; 
          });
          console.log(formattedGraphData)
          setGraphData(formattedGraphData)
        }
      } catch (error) {
        setData(null)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  },[timeframe])

  if(loading){
    return(
      <LoadingSpinner/>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
 
        </div>
        <div className="text-gray-600">{posted(new Date())}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
          <Card className="bg-white p-3 rounded-md">
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <p className="text-gray-600">Total jobs</p>
                  
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#003F62] p-2 rounded-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{data?.totalJobs}</p>
                    
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white p-3 rounded-md">
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <p className="text-gray-600">Active Contracts</p>
                  
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#003F62] p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{data?.activeContracts}</p>
                    
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white p-3 rounded-md">
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <p className="text-gray-600">Completed Contracts</p>
                  
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#003F62] p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{data?.completedContracts}</p>
                    
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white p-3 rounded-md">
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <p className="text-gray-600">Total Profit</p>
                
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#003F62] p-2 rounded-lg">
                    <IndianRupee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{data?.totalProfit}</p>
                    
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-6 bg-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Jobs Graph</h2>
            <div>
          {[ "MONTHLY", "YEARLY"].map((option: any) => (
            <button
              key={option}
              className={`px-4 py-2 mr-2 rounded-md ${
                option === timeframe ? "bg-[#003F62] text-white " : "bg-gray-200"
              }`}
              onClick={() => setTimeframe(option)}
            >
              {option}
            </button>
          ))}
        </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData} >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#003F62" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* <div className="bg-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Best Freelancers</h2>
            <Button isIconOnly variant="light" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {bestClients.map((client, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar src="/placeholder.svg" className="w-12 h-12" />
                <div className="flex-1">
                  <p className="font-semibold">{client.name}</p>
                  <p className="text-gray-600">{client.amount}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹126.50</p>
                  <p className="text-gray-600 text-sm">{client.sales}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full bg-[#003F62] text-white mt-6">
            REPORT
          </Button>
        </div> */}
      </div>

      <Card className="bg-white p-4 rounded-md">
        <CardBody>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Contracts</h2>
            {/* <Button isIconOnly variant="light" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button> */}
          </div>
          {data?.recentContracts && data.recentContracts.length > 0 && (
            <Table aria-label="Recent contracts table">
            <TableHeader>
              
              <TableColumn>Product</TableColumn>
              <TableColumn>Order ID</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Customer Name</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody>
       
                  {data.recentContracts.map((contract: any)=>(
                <TableRow >
                    <TableCell>{contract.jobId.title}</TableCell>
                  <TableCell>{contract._id}</TableCell>
                  <TableCell>{posted(contract.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar src="/placeholder.svg" className="w-6 h-6" />
                      {contract.clientId.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      contract.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {contract.status}
                    </span>
                  </TableCell>
                  <TableCell>{contract.totalBudget}</TableCell>
                  
                </TableRow>
                  ))}
    
            </TableBody>
          </Table>
          )}
          
        </CardBody>
      </Card>
    </div>
  )
}

export default Dashboard
