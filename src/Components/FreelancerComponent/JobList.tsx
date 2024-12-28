import React, { useCallback, useEffect, useState } from 'react';
import { Search, ChevronDown, CheckCircle, MapPin, X } from 'lucide-react';
import { getJobList, getFilteredJobList } from '../../Services/freelancerService/freelancerAxiosCalls';
import { useNavigate } from 'react-router-dom';
import { useFreelancer } from '../../context/FreelancerContext/FreelancerData';
import LoadingSpinner from '../Common/LoadinSpinner';
import { getcategories } from '../../Services/userServices/userAxiosCalls';
import debounce from 'lodash.debounce';

interface ICategory {
  _id: string;
  name: string;
  description: string;
  isBlocked: boolean;
  createdAt: Date;
}

export default function JobListing() {
  const [filter, setFilter] = useState<any>({
    category: '',
    experience: '',
    duration: '',
    startDate: '',
    endDate: '',
  });
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const { freelancer } = useFreelancer();
  const id = freelancer?.userId;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [categoryResponse, jobData] = await Promise.all([
          getcategories(),
          getJobList(id),
        ]);
        setCategories(categoryResponse);
        setData(jobData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, filters: any) => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await getFilteredJobList(id, filters, searchQuery);
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error during search:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [id]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value, filter);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilter((prev: any) => {
      const updatedFilter = { ...prev, [key]: value };
      debouncedSearch(query, updatedFilter);
      return updatedFilter;
    });
  };

  

  return (
    <div className="flex h-screen bg-white">
      <FilterSidebar
        filter={filter}
        categories={categories}
        handleFilterChange={handleFilterChange}
      />

      <div className="flex-1 flex flex-col">
        <div className="p-5 border-b bg-white">
          <SearchBar query={query} onSearchChange={handleSearchChange} />
        </div>

        <div className="flex-1 p-5 overflow-y-auto scrollbar-hide">
          {loading ? <LoadingSpinner /> : <JobList data={data} navigate={navigate} />}
        </div>
      </div>
    </div>
  );
}

function FilterSidebar({
  filter,
  categories,
  handleFilterChange,
}: {
  filter: any;
  categories: ICategory[];
  handleFilterChange: (key: string, value: string) => void;
}) {

  const clearFilters = () => {
    const defaultFilter = {
      category: '',
      experience: '',
      duration: '',
      startDate: '',
      endDate: '',
    };
    Object.keys(defaultFilter).forEach((key) => handleFilterChange(key, ''));
  }

  return (
    <div className="w-72 p-4 border-r overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-start mb-4">
        <X onClick={clearFilters} className="cursor-pointer mr-2" />
        <h2 className="text-xl font-semibold">Filter By</h2>
      </div>
      <hr className="pb-4" />

      <div className="mb-4">
        <h3 className="font-medium">Category</h3>
        <div className="relative">
          <select
            className="w-full p-2 border rounded-md appearance-none pr-8 text-gray-400"
            value={filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Project Type</h3>
        {[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ].map(({ label, value }) => (
          <label key={value} className="flex items-center mb-2 text-sm text-gray-500">
            <input
              type="radio"
              name="experience"
              value={value}
              checked={filter.experience === value}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="mr-1"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Project Length</h3>
        {[
          { label: 'Less than one month', value: 'less-than-1-month' },
          { label: '1 to 3 months', value: '1-3-months' },
          { label: '3 to 6 months', value: '3-6-months' },
          { label: 'More than 6 months', value: 'more-than-6-months' },
        ].map(({ label, value }) => (
          <label key={value} className="flex items-center mb-2 text-sm text-gray-500">
            <input
              type="radio"
              name="duration"
              value={value}
              checked={filter.duration === value}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mb-4">

        <h3 className="font-medium">Filter by Date</h3>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">From:</label>
          <input
            type="date"
            value={filter.startDate || ''}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="w-full p-2 border rounded-md text-gray-500"
          />
          <label className="text-sm text-gray-500">To:</label>
          <input
            type="date"
            value={filter.endDate || ''}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="w-full p-2 border rounded-md text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}

function SearchBar({
  query,
  onSearchChange,
}: {
  query: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <div className="flex-grow relative">
          <input
            type="text"
            value={query}
            onChange={onSearchChange}
            placeholder="Search for jobs"
            className="w-full p-2 border rounded-l-md pl-10 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
          />
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        <button className="px-4 py-2 bg-[#1AA803] text-white rounded-r-md whitespace-nowrap">
          Search
        </button>
      </div>
    </div>
  );
}

// Job List Component
function JobList({ data, navigate }: { data: any[]; navigate: any }) {

  if (data.length == 0) {
    return (
      <div className='justify-center'>
        <p className='text-center font-medium'>No data have been found</p>
      </div>
    )

  }

  return (
    <>
      {data.map((job, index) => (
        <div
          key={index}
          onClick={() =>
            navigate('/freelancer/viewjobdetials', { state: { data: job } })
          }
          className="border-b border-t py-4"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <div className="flex space-x-2">
              <button className="p-2 border-2 rounded-3xl">{job.status}</button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Fixed-price-{job.projectType}- Est. Budget: {job.budget}
          </p>
          <p className="mb-2">{job.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">

            <CheckCircle size={16} className="text-blue-500 mr-1" />
            <span className="mr-4">Payment verified</span>
            <MapPin size={16} className="mr-1" />
            <span>India</span>
          </div>
          <p className="text-sm text-gray-500">
            Proposals: {job.proposals?.length || 0}
          </p>
        </div>
      ))}
    </>
  );
}
