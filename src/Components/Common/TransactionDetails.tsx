import React, { useEffect, useState } from 'react';
import { 
  CreditCard, 
  FileText, 
  User, 
  ShieldCheck, 
  Download, 
  Calendar,
  ArrowBigLeft
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSingleContract } from '../../Services/commonAxiosCall';
import * as html2canvas from 'html-to-image'; 
import { jsPDF } from 'jspdf'; 

const TransactionDetailsPage = () => {

    const location = useLocation()
    const transaction = location.state
    const [contract, setContracts] = useState<any>()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetchContract = async()=>{
            const id: string = transaction!.contractId
            const response = await getSingleContract(id)
            setContracts(response.data)
        }
        if(transaction){
            fetchContract()
        }
    },[transaction])

    const downloadInvoice = async () => {
        const invoiceElement = document.getElementById('invoice-content');
        if (!invoiceElement) return;

        try {
            const canvas = await html2canvas.toCanvas(invoiceElement);
            const image = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(image, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('TransactionInvoice.pdf'); 
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-7xl">
        <div id='invoice-content' className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <ArrowBigLeft onClick={()=>navigate(-1)} className="mr-3" size={24} />
              <h2 className="text-xl font-semibold">Transaction & Contract Details</h2>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-green-500 rounded" onClick={downloadInvoice}>
                <Download className="h-5 w-5" />
              </button>
          \
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Transaction Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2 text-blue-600" size={20} />
                  Transaction Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Transaction Amount</span>
                    <span className="font-bold text-green-600">
                      {transaction.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Date</span>
                    <span>{transaction.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className={`px-2 py-1 rounded ${transaction.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID</span>
                    <span className="text-sm text-gray-500">
                      {transaction.transactionId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ShieldCheck className="mr-2 text-green-600" size={20} />
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="capitalize">{transaction.paymentMethod.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Session ID</span>
                    <span className="text-sm text-gray-500 truncate max-w-[200px]">
                      {transaction.sessionId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Receipt</span>
                    <a 
                      href={transaction.receiptUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      View Receipt
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <hr className="my-6 border-gray-200" />

            {/* Contract Details */}
            <div className="grid md:grid-cols-1 gap-6">
            <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 text-orange-600" size={20} />
                  Project Detail
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Title</span>
                    <span>{contract?.jobId.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Description</span>
                    <span>{contract?.jobId.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span>
                      {transaction.amount == contract?.initialPayment ? <span> Initial Amount</span> : <span>Full Amount</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Amount</span>
                    <span>{contract?.initialPayment}</span>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Separator */}
            <hr className="my-6 border-gray-200" />

            {/* Parties Involved */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="mr-2 text-blue-600" size={20} />
                  Client Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Name</span>
                    <span>{contract?.clientId.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client ID</span>
                    <span className="text-sm text-gray-500">
                      {contract?.clientId._id}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="mr-2 text-green-600" size={20} />
                  Freelancer Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Name</span>
                    <span>{contract?.freelancerId.firstName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Freelancer ID</span>
                    <span className="text-sm text-gray-500">
                      {contract?.freelancerId._id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 p-4 text-center text-gray-500">
            {/* Contract Hash: {contract.contractHash} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;