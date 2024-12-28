import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAllTransactions } from '../../Services/adminServices/adminAxiosCall'
import LoadingSpinner from '../Common/LoadinSpinner'
import { posted } from '../../config/timeAgo'

const TransactionPayment = () => {

    const navigate = useNavigate()
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchTransactions = async()=>{
            try {
                const response = await getAllTransactions()
                console.log(response,'this is the response')
                setTransactions(response.data) 
            } catch (error) {
                setTransactions([])
            }finally{
                setLoading(false)
            }
            
        }
        fetchTransactions()
    },[])

    if(loading){
        return(
            <LoadingSpinner/>
        )
    }

    if(!transactions || transactions.length === 0){
        <div className="p-6">
            <p>No Transactions.....</p>
        </div>
    }

  return (
    <>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Users</h1>
      <p className="text-sm text-gray-600 mb-4">Dashboard &gt; Transactions</p>
      <div className="flex justify-end items-center mb-4">
        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
        <span className="text-sm text-gray-600">{posted(new Date())}</span>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction-id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
             
              <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">currency</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction)=>(
                <tr onClick={()=>navigate('/admin/transactiondetail',{state: transaction})} >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.created}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.freelancer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.paymentMethod.type.toUpperCase()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>

                    {transaction.status}
                    </button>
                </td>
                
                <td className="px-6 py-4 text-end whitespace-nowrap text-sm font-medium">
                {transaction.currency.toUpperCase()}
                </td>
    
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled>
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <span className="text-sm text-gray-700">Page 1 of 3</span>
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003F62] hover:bg-[#002E62]">
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
             
            </h2>
            <p className="mb-4">
              Are you sure you want to {modalAction} this user?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
              >
                Cancel
              </button>
              <button
                // onClick={handleConfirmAction}
                className={`px-4 py-2 ${
                  modalAction === "block"
                    ? "bg-gradient-to-r from-rose-400 to-red-500 text-white"
                    : "bg-gradient-to-r from-lime-400 to-lime-500 text-white"
                } rounded`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
    </>
  )
}

export default TransactionPayment
