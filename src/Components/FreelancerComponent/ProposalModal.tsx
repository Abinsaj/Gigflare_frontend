import React, { useEffect, useState } from 'react'
import { ArrowLeft, Clock, IndianRupee, Send, X } from 'lucide-react'
import { createProposal } from '../../Services/freelancerService/freelancerAxiosCalls';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { toast } from 'sonner';
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData';


interface SendProposalProps {
  onClose: () => void;
  statusChange: (val: any) => void;
  data: any;
}

export default function SendProposal({ onClose, statusChange, data }: SendProposalProps) {
  const { freelancer } = useFreelancer();
  const userId = useSelector((state: RootState) => state.user.userInfo?._id);
  const [proposal, setProposal] = useState({
    coverLetter: '',
    timeLine: '',
    totalBudget: '',
  });

  const [errors, setErrors] = useState({
    coverLetter: '',
    timeLine: '',
    totalBudget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProposal((prev) => ({ ...prev, [name]: value }));

    // Clear the error when user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { coverLetter: '', timeLine: '', totalBudget: '' };

    if (!proposal.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
      isValid = false;
    }
    if (!proposal.timeLine) {
      newErrors.timeLine = 'Estimated timeline is required';
      isValid = false;
    }
    if (!proposal.totalBudget || isNaN(Number(proposal.totalBudget)) || Number(proposal.totalBudget) <= 0) {
      newErrors.totalBudget = 'Valid budget is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('coverLetter', proposal.coverLetter);
    formData.append('timeLine', proposal.timeLine);
    formData.append('totalBudget', proposal.totalBudget);

    try {
      const response = await createProposal(proposal, userId, data._id, freelancer?._id);
      if (response.success === true) {
        statusChange(true);
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message || 'Failed to submit proposal');
        onClose();
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast.error('You have already submitted the proposal for this job');
    }
  };

  const amountAfterDeduction = proposal.totalBudget ? (Number(proposal.totalBudget) - Number(proposal.totalBudget) * 0.05).toFixed(2) : '0';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-5/6 max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-4 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Submit a Proposal</h1>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Job: {data.title}</h2>
            <p className="text-gray-600 mb-2">Fixed-price - {data.experienceLevel} - Est. Budget: ₹{data.budget}</p>
            <p className="text-gray-800">{data.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={4}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Introduce yourself and explain why you're the best fit for this job"
                value={proposal.coverLetter}
                onChange={handleChange}
              ></textarea>
              {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>}
            </div>

            <div>
              <label htmlFor="timeLine" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Timeline
              </label>
              <div className="flex items-center">
                <select
                  id="timeLine"
                  name="timeLine"
                  value={proposal.timeLine}
                  onChange={handleChange}
                  className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
                >
                  <option value="">Select duration</option>
                  <option value="less-than-1-month">Less than 1 month</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="more-than-6-months">More than 6 months</option>
                </select>
                <Clock className="w-5 h-5 text-gray-400 ml-2" />
              </div>
              {errors.timeLine && <p className="text-red-500 text-xs mt-1">{errors.timeLine}</p>}
            </div>

            <div>
              <label htmlFor="totalBudget" className="block text-sm font-medium text-gray-700 mb-1">
                Total Amount
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="totalBudget"
                  name="totalBudget"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your total bid for the project"
                  value={proposal.totalBudget}
                  onChange={handleChange}
                />
                <IndianRupee className="w-5 h-5 text-gray-400 ml-2" />
              </div>
              {errors.totalBudget && <p className="text-red-500 text-xs mt-1">{errors.totalBudget}</p>}
              <p className="text-sm text-gray-700 pt-3">You'll get <span className='text-green-500'>₹{amountAfterDeduction}</span> after deduction</p>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-[#1AA803] text-white rounded-lg hover:bg-green-700">
                <Send className="w-5 h-5 mr-2" />
                Submit Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
