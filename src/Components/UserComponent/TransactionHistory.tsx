import { Calendar, Download } from 'lucide-react'
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { getTransactions } from '../../Services/userServices/userAxiosCalls'
import LoadingSpinner from '../Common/LoadinSpinner'
import { useNavigate } from 'react-router-dom'

export default function TransactionHistory() {
  const user = useSelector((state: RootState) => state.user.userInfo)
  const [transactionDetails, setTransactionDetails] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user?._id) {
          const response = await getTransactions(user._id)
          console.log(response, 'Fetched Transactions')
          setTransactionDetails(response.data || [])
        }
      } catch (error) {
        console.error("Error fetching transactions:", error)
        setTransactionDetails([])
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [user?._id])

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  if (!transactionDetails || transactionDetails.length === 0) {
    return (
      <>
        
        <div className="max-w-7xl mx-auto h-96 p-6 bg-white text-gray-600">
        <div className="mb-6">
          <h1 className="text-2xl  font-semibold text-gray-800 mb-4">Transaction History</h1>
        </div>
          <p className='text-center'>No transaction history available.</p>
        </div>
      </>

    )
  }

  return (
    <div className="max-w-7xl mx-auto h-full p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h1>
      <hr className='pb-2 '/>
      </div>

      {/* <div className="flex flex-wrap items-center justify-end gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by date"
            endContent={<Calendar className="w-4 h-4 text-gray-400" />}
            className="min-w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="bordered"
            className="bg-green-500 text-white rounded-md"
            startContent={<Download className="w-4 h-4" />}
          >
            Download CSV
          </Button>
          <Button
            color="success"
            className="bg-green-500 text-white rounded-md"
            startContent={<Download className="w-4 h-4" />}
          >
            Download Invoices
          </Button>
        </div>
      </div> */}

      <Table aria-label="Transaction history table" className="border shadow-md rounded-md border-gray-200 h-96">
          <TableHeader className='bg-gray-50'>
            <TableColumn className="bg-gray-50 text-gray-500 text-left text-sm">DATE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 text-center text-sm">TRANSACTION-ID</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 text-center text-sm">PAYMENT-TYPE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 text-sm">FREELANCER</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 text-center text-sm">AMOUNT</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 text-sm">STATUS</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 text-sm">CURRENCY</TableColumn>
          </TableHeader>
          <TableBody>
            
            {transactionDetails.map((transaction) => (
              <TableRow onClick={()=>navigate(`/transactiondetail/`,{state: transaction})} className="border-b border-gray-100">
                <TableCell className='text-sm text-gray-500'>{transaction.created}</TableCell>
                <TableCell className='text-center text-sm text-gray-500'>{transaction.transactionId}</TableCell>
                <TableCell className='text-center text-sm text-gray-500'>{transaction.paymentMethod.type.toUpperCase()}</TableCell>
                <TableCell className='text-center text-sm text-gray-500'>{transaction.freelancer || ""}</TableCell>
                <TableCell className="text-center text-sm text-gray-500">
                  <div className={transaction.amount < 0 ? "text-red-500 " : "text-gray-500"}>
                    {transaction.amount}
                  </div>
                </TableCell>
                <TableCell className='text-center text-sm'><div className='bg-green-100 rounded-xl'>
                    {transaction.status}
                    </div></TableCell>
                <TableCell className="text-blue-500 text-center">{transaction.currency.toUpperCase()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}
