import { freelancerSignContract } from '../../Services/freelancerService/freelancerAxiosCalls'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Divider, Button, Avatar, Progress } from "@nextui-org/react"
import { DollarSign, FileText, User, Briefcase, Mail, CheckCircle, Clock } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import { toast } from 'sonner'
import { statusUpdate } from '../../Services/freelancerService/freelancerAxiosCalls'
import { posted } from '../../config/timeAgo'



export default function ContractPage() {

    const location = useLocation();
    const contractData = location.state;

    console.log(contractData,'this is the contract data')
    const {freelancer} = useFreelancer()
    const freelancerId = freelancer?._id
    console.log(contractData,'this is the contract id')
    const [freelancerSign, setFreelancerSign] = useState<boolean>(false)
    const [signature, setSignature] = useState<string>('')
    const [submitted, setSubmitted] = useState<boolean>(false)

    const signContract = async()=>{
        const data = await freelancerSignContract(contractData.contractHash, contractData._id, freelancerId)
       console.log(data,'this is what we got')
        if(data.success){
            toast.success(data.message)
            setFreelancerSign(true)
            setSignature(data.signature)
        }else{
            toast.error(data.message)
        }
    }

    const handleStatusChange = async(status: 'submitted' | 'termination_requested')=>{
      const data = await statusUpdate(contractData._id, status)
      if(data.success){
        toast.success(data.message)
        setSubmitted(true)
      }else{
        toast.error(data.message)
      }
    }


  return (
    <div className="container mx-auto p-4 md:p-4 max-w-8xl">
      <Card className="w-full shadow-2xl bg-gradient-to-br from-green-50 to-purple-50">
        <CardHeader className="flex flex-col items-center bg-gradient-to-r from-[#1AA803] to-[#1AA803] text-white p-10 ">
          <h1 className="text-5xl font-bold mb-4">Contract</h1>
          <p className="text-center text-xl">
            Agreement between {contractData?.clientId?.name} and {contractData.freelancerId.firstName} {contractData.freelancerId.lastName}
          </p>
          <p className="text-sm mt-4 bg-white/20 px-4 py-2 rounded-full">Executed on Date</p>
        </CardHeader>
        <CardBody className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardBody className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-black">
                  <User className="mr-2" /> Client
                </h2>
                <div className="flex items-center mb-4">
                  <Avatar
                    name={contractData?.clientId.name}
                    className="w-16 h-16 text-large text-gray-500 bg-gray-200 mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg">{contractData.clientId.name}</p>
                    <p className="flex items-center text-gray-600">
                      <Mail className="mr-2" size={16} />
                        {contractData?.clientId?.email}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardBody className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-black">
                  <User className="mr-2" /> Web Design Provider
                </h2>
                <div className="flex items-center mb-4">
                  <Avatar
                    name={`${contractData.freelancerId.firstName} ${contractData.freelancerId.lastName}`}
                    className="w-16 h-16 text-large text-gray-500 bg-gray-200  mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg">{contractData.freelancerId.firstName} {contractData.freelancerId.lastName}</p>
                    <p className="flex items-center text-gray-600">
                      <Mail className="mr-2" size={16} />
                      {contractData.freelancerId.email}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="bg-white shadow-lg mb-12">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-3" /> Project Details
              </h2>
              <h3 className="text-2xl font-semibold mb-4 text-[#1AA803]">{contractData.jobId.title}</h3>
              <p className="text-gray-600 mb-6">{contractData.jobId.description}</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Clock className="mr-2" /> Project Timeline
                </h4>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Start: {posted(contractData.startDate)}</span>
                  <span>End: {posted(contractData.endDate)}</span>
                </div>
                <Progress  className="h-2" color="success" />
              </div>
            </CardBody>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-green-600">
                  <DollarSign className="mr-2" /> Payment Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Budget: </span>
                    <span className="text-2xl font-bold text-green-600">₹ {contractData.totalBudget}</span>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Initial Payment:</span>
                    <span className="text-lg">₹ {contractData.initialPayment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Remaining Payment:</span>
                    <span className="text-lg"> ₹{contractData.remainingPayment}</span>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Platform Fee:</span>
                    <span>₹ {contractData.platformFee}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-black">
                  <FileText className="mr-2" /> Terms and Conditions
                </h3>
                <ul className="space-y-4">
                  {contractData.terms.map((term: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))} 
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="bg-white shadow-lg mb-12">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Termination & Governing Law</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  The effectivity date of these terms will start on the date the proposal was signed until the project is complete. 
                  A certificate of completion will be given to both parties together with their signatures.
                </p>
                <p className="text-gray-600">
                  Before the termination of this contract, all finished projects and materials will be surrendered to the client. 
                  This includes mockups, frameworks, artworks, codes, repositories, emails, login credentials, purchased software, 
                  hardware, and services.
                </p>
                <p className="text-gray-600">
                  This contract shall be governed under the laws of the State of California in United States.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="font-bold mb-2 text-lg">Client Signature</p>
              <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">
                Sign here
              </div>
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Freelancer Signature</p>
              <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">
                Sign here
              </div>
            </div>
          </div> */}
        {freelancerSign == false && contractData.signedByFreelancer.signed == false ? (
          <div className="flex justify-center mt-1">
            <Button onClick={signContract} color="primary" size="lg" className="font-semibold px-12 py-6 text-lg bg-[#1AA803] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              Sign Contract
            </Button>
          </div>
        ): contractData.status == 'active'?(
          <>
          <p className='text-[#1AA803] font-semibold'>Project is Active now you can submit once you completed the project</p>
          <Button onClick={()=>handleStatusChange('submitted')} color="primary" size="lg" className="font-semibold px-12 py-6 text-lg bg-[#1AA803] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              submit
            </Button>
          </>
        ):contractData.status == 'submitted' || submitted == true?(
          <p className='text-[#1AA803] font-semibold'>Your have Submitted the project waiting for the client response</p>
        ):contractData.status == 'termination_requested' && contractData.terminationRequestedBy == 'freelancer'?(
          <Button  color="primary" size="lg" className="font-semibold px-12 py-6 text-lg bg-[#1AA803] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              Cancel Termination
            </Button>
        ):contractData.status == 'terminated'?(
          <p className='text-[#1AA803] font-semibold'>The project has been terminated</p>
        ):(
            <p className='text-[#1AA803] font-semibold'>Your Signature have been registered</p>
        )}
        </CardBody>
      </Card>
    </div>
  )
}

