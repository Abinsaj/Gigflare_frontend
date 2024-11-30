import React, { useEffect, useState } from 'react';
import { Camera, Trash2, Plus } from 'lucide-react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';

const EditFreelancerProfileTemplate: React.FC = () => {
  const location = useLocation();
  const freelancer = location.state?.freelancerData;

  const [initialState, setInitialState] = useState<any>(null);

  useEffect(() => {
    if (freelancer) {
      setInitialState(freelancer);
    }
  }, [freelancer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value;
    setInitialState((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string, arrayName: string) => {
    const updatedArray = [...initialState[arrayName]];
    updatedArray[index][field] = e.target.value;
    setInitialState((prevState: any) => ({
      ...prevState,
      [arrayName]: updatedArray,
    }));
  };

  const handleAddToArray = (arrayName: string, newItem: any) => {
    setInitialState((prevState: any) => ({
      ...prevState,
      [arrayName]: [...prevState[arrayName], newItem],
    }));
  };

  const handleRemoveFromArray = (arrayName: string, index: number) => {
    const updatedArray = initialState[arrayName].filter((_: any, i: number) => i !== index);
    setInitialState((prevState: any) => ({
      ...prevState,
      [arrayName]: updatedArray,
    }));
  };

  if (!initialState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-10 p-8">
      <form>
        {/* Profile Header */}
        <div className="relative">
          <div
            className="h-60 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            }}
          ></div>
          <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl overflow-hidden">
              <div className="relative flex items-center">
                <div className="relative">
                  <img
                    src={initialState.profile || '/placeholder.svg?height=112&width=112'}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <Button isIconOnly className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="ml-4 space-y-4 flex-grow">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="firstName">
                      Change Your first name
                    </label>
                    <Input
                      id="firstName"
                      value={initialState.firstName}
                      onChange={(e) => handleChange(e, 'firstName')}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="lastName">
                      Change Your last name
                    </label>
                    <Input
                      id="lastName"
                      value={initialState.lastName}
                      onChange={(e) => handleChange(e, 'lastName')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-16 rounded-lg shadow-md bg-white gap-8">
          {/* Left Section: Languages, Education */}
          <div className="space-y-10 p-6 md:border-r-4 border-gray-100">
            <div>
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              {initialState.language && (
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    value={initialState.language}
                    onChange={(e) => handleChange(e, 'language')}
                    placeholder="Enter language"
                  />
                  <Button isIconOnly color="danger" aria-label="Delete language">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Button
                color="primary"
                className="mt-2"
                onClick={() => handleAddToArray('languages', '')}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Language
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              {initialState.education?.map((edu: any, index: number) => (
                <div key={edu._id} className="space-y-4 mb-4">
                  <div>

                  <label className="text-md font-semibold text-gray-700 mb-1 block" htmlFor="firstName">
                      Change Your first name
                    </label>
                  <Input
                    value={edu.title}
                    onChange={(e) => handleArrayChange(e, index, 'title', 'education')}
                    placeholder="Enter degree title"
                  />
                  </div>
                  <div>

                  <label className="text-md font-semibold text-gray-700 mb-1 block" htmlFor="firstName">
                      College/University
                    </label>
                  <Input
                
                    value={edu.collageName}
                    onChange={(e) => handleArrayChange(e, index, 'collageName', 'education')}
                    placeholder="Enter institution name"
                  />
                  </div>
                  <div>

                  <label className="text-md font-semibold text-gray-700 mb-1 block" htmlFor="firstName">
                      Year of Graduation
                    </label>
                  <Input
                    
                    value={edu.year}
                    onChange={(e) => handleArrayChange(e, index, 'year', 'education')}
                    placeholder="Enter graduation year"
                    type="number"
                  />
                  <Button
                    color="danger"
                    onClick={() => handleRemoveFromArray('education', index)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Remove Education
                  </Button>
                  </div>
                </div>
              ))}
              <Button
                color="primary"
                onClick={() => handleAddToArray('education', { title: '', collageName: '', year: '' })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
          </div>

          {/* Right Section: Description, Certifications, Skills */}
          <div className="col-span-1 md:col-span-2 p-6 space-y-8">
            {/* Description */}
            <div className="border-b-2 pb-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <Textarea
                label="Description"
                value={initialState.description}
                onChange={(e) => handleChange(e, 'description')}
                placeholder="Describe your professional experience and skills"
                rows={4}
              />
            </div>

            {/* Certificates */}
            <div className="border-b-2 pb-6">
              <h3 className="text-xl font-bold mb-4">Certificates</h3>
              {initialState.certification?.map((cert: any, index: number) => (
                <div key={cert._id} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={cert.name}
                    onChange={(e) => handleArrayChange(e, index, 'name', 'certification')}
                    placeholder="Enter certificate name"
                  />
                  <Button isIconOnly color="danger" aria-label="Delete certificate">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                onClick={() => handleAddToArray('certification', { name: '', year: '' })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Certification
              </Button>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {initialState.skills?.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={skill}
                      onChange={(e) => handleArrayChange(e, index, 'skill', 'skills')}
                      placeholder="Enter skill"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      aria-label="Delete skill"
                      onClick={() => handleRemoveFromArray('skills', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                color="primary"
                onClick={() => handleAddToArray('skills', '')}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Skill
              </Button>
            </div>
          </div>
        </div>

        {/* Buttons for Save and Cancel */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button color="default">Cancel</Button>
          <Button color="primary">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default EditFreelancerProfileTemplate;
