import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData'
import { getTransactions } from '../../Services/userServices/userAxiosCalls'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import LoadingSpinner from '../Common/LoadinSpinner'

export default function TransactionsList() {
    const { freelancer } = useFreelancer()
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true) // Loading state

    const user = useSelector((state: RootState) => state.user.userInfo)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (freelancer?._id) {
                    const response = await getTransactions(freelancer._id)
                    console.log(response)
                    setTransactions(response.data || [])
                }
            } catch (error) {
                console.error("Error fetching transactions:", error)
            } finally {
                setLoading(false) // Set loading to false after data is fetched or error occurs
            }
        }
        if (freelancer !== null) {
            fetchData()
        }
    }, [freelancer])

    console.log(transactions, 'this is the transactions')

    if (loading) {
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Transactions</h1>

                {/* Search and Sort */}
                {/* <div className="flex flex-col sm:flex-row justify-end mb-4 sm:mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">Sort by</span>
                        <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-sm">
                            Date
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div> */}

                {/* Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {transactions && transactions.length > 0 ? (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr className="text-xs sm:text-sm text-gray-500">
                                        <th className="text-left py-3 px-4 sm:px-6 font-medium">TRANSACTION_ID</th>
                                        <th className="text-left py-3 px-4 sm:px-6 font-medium">DATE</th>
                                        <th className="text-left py-3 px-4 sm:px-6 font-medium">PAYMENT-TYPE</th>
                                        <th className="text-left py-3 px-4 sm:px-6 font-medium">CLIENT</th>
                                        <th className="text-left py-3 px-4 sm:px-6 font-medium">AMOUNT</th>
                                        <th className="text-center py-3 px-4 sm:px-6 font-medium">STATUS</th>
                                        <th className="text-left py-3 px-4 sm:px-6 font-medium">CURRENCY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.transactionId} className="border-b border-gray-200">
                                            <td className="py-3 px-5 sm:px-6 text-sm">{transaction.transactionId}</td>
                                            <td className="py-3 line-clamp-1 px-4 sm:px-6 text-sm">{transaction.created}</td>
                                            <td className="py-3 px-1 sm:px-6 text-sm text-center">{transaction.paymentMethod?.type.toUpperCase() || 'N/A'}</td>
                                            <td className="py-3 px-4 sm:px-3 text-sm text-center">{transaction.client || 'N/A'}</td>
                                            <td className="py-3 px-4 sm:px-3 text-sm text-center">{transaction.amount || 0}</td>
                                            <td className="py-3 px-4 sm:px-6 text-center">
                                                <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                                                    {transaction.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 sm:px-6 text-center">
                                                {transaction.currency.toUpperCase() || 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No Transaction History
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
