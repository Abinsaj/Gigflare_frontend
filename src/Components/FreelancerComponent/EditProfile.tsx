import React, { useEffect, useState } from 'react';
import { Camera, Trash2, Plus } from 'lucide-react';
import { Button, Input, Textarea } from '@nextui-org/react';
import Select from 'react-select';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateFreelancerProfile } from '../../Services/freelancerService/freelancerAxiosCalls';
import { toast } from 'sonner';
import { compressImage } from '../Common/CompressImage';
import { getSkillsByCategory } from '../../Services/freelancerService/freelancerAxiosCalls';

const EditFreelancerProfile = () => {
  const location = useLocation()
  const { freelancerData } = location.state
  console.log(freelancerData, 'Freelancer data to be edited')
  const [imagePreview, setImagePreview] = useState(freelancerData?.photo || '');
  const navigate = useNavigate()
  const [skills, setSkills] = useState<any[]>([])
  const [newSkills, setNewSkills] = useState<any[]>([])

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
  ];

  let freelancerSkills = null

  if(freelancerData.skills && freelancerData.skills.length > 0){
     freelancerSkills = freelancerData.skills.map((value: any)=>value.name)
  }

  const formik = useFormik({
    initialValues: {
      firstName: freelancerData?.firstName || '',
      lastName: freelancerData?.lastName || '',
      photo: freelancerData?.profile || '',
      phone: freelancerData?.phone || '',
      language: freelancerData?.language || [],
      skills: freelancerSkills || [],
      newSkill: '',
      description: freelancerData?.description || '',
    },
    onSubmit: async (values) => {
      console.log('Updated values:', values);
      const formData = new FormData()
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('phone', values.phone)
      formData.append('language', JSON.stringify(values.language))
      formData.append('skills', JSON.stringify(values.skills))
      formData.append('description', values.description)

      if (values.photo instanceof File) {
        formData.append('photo', values.photo)
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value, 'yeah hooooooo');
      }
      const response = await updateFreelancerProfile(freelancerData._id, formData)
      if (response.success == true) {
        toast.success(response.message)
        setTimeout(() => {

          navigate('/freelancer/freelancerprofile')
        }, 1000);
      } else {
        toast.error(response.message)
      }
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const compressedBlob = await compressImage(file);
        const compressedFile = new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now() });
        formik.setFieldValue('photo', compressedFile);

        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSkillsByCategory(freelancerData.experience.categoryId)
      console.log(data, 'The response')
      setSkills(data.data)
    }
    fetchData()
  }, [freelancerData])

  console.log(skills, 'the Skill list')

  return (
    <div className="space-y-10 p-8">
      <form onSubmit={formik.handleSubmit}>
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
                    src={imagePreview || formik.values.photo || 'default-image-url'}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="ml-4 space-y-4 flex-grow">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="firstName">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="lastName">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="phone">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-16 rounded-lg shadow-md bg-white gap-8">
          {/* Left Section: Languages and Skills */}
          <div className="space-y-10 p-6 md:border-r-4 border-gray-100">
            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              <Select
                id="language"
                isMulti
                options={languageOptions}
                value={languageOptions.filter(option =>
                  formik.values.language.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  const selectedLanguages = selectedOptions.map(option => option.value);
                  formik.setFieldValue('language', selectedLanguages);
                }}
                placeholder="Select languages"
              />
            </div>
          </div>

          {/* Right Section: Description */}
          <div className="col-span-1 md:col-span-2 p-6 space-y-8">
            <div className="border-b-2 pb-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <Textarea
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Describe your professional experience and skills"
                rows={4}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Skills</h3>

              {/* Show Freelancer's Current Skills */}
              <div className="space-y-2">
                <Input
                  id="skillsInput"
                  readOnly
                  value={formik.values.skills.join(', ')} // Show as comma-separated list
                  placeholder="User's current skills will appear here"
                />
              </div>

              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">Add More Skills:</h4>
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill: any, index: number) => (
                    <button
                      key={index}
                      type='button'
                      className="bg-gray-200 text-gray-800 rounded-md px-3 py-1 hover:bg-gray-300 focus:outline-none"
                      onClick={() => {
          
                        if (!formik.values.skills.includes(skill.name)) {
                          formik.setFieldValue('skills', [...formik.values.skills, skill.name]);
                        } else {
                          toast.error(`${skill.name} is already added!`);
                        }
                      }}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>


            {/* Experience */}
            {/* <div className="border-b-2 pb-6">
              <h3 className="text-xl font-bold mb-4">Experience</h3>
              {formik.values.experience.map((exp, index) => (
                <div key={index} className="space-y-1">
                  <div><strong>Expertise:</strong> {exp.expertise}</div>
                  <div><strong>From:</strong> {exp.fromYear} <strong>To:</strong> {exp.toYear}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Buttons for Save and Cancel */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button className="bg-gray-300 text-black rounded-md">Cancel</Button>
          <Button className="bg-[#1AA803] text-white rounded-md" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditFreelancerProfile;
