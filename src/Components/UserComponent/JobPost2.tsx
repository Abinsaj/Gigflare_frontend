import React from "react";

interface JobPostPage2Props {
  formData: {
    skills: string[]; 
    duration: string; 
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSkillChange: (skills: string[]) => void;
  filteredSkill: {
    _id: string;
    name: string;
  }[]; 
}

export default function JobPostPage2({
  formData,
  handleChange,
  handleSkillChange,
  filteredSkill,
}: JobPostPage2Props) {
  const addSkill = (skillName: string) => {
    if (!formData.skills.includes(skillName)) {
      handleSkillChange([...formData.skills, skillName]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleSkillChange(formData.skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-semibold text-lg pb-3">Select the skills required for your work</h2>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Selected Skills
        </label>
        <div className="flex items-center flex-wrap border rounded-md px-3 py-2 shadow-sm bg-gray-100 text-gray-700 gap-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gray-700"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </span>
          ))}
          {formData.skills.length === 0 && (
            <span className="text-sm text-gray-400">No skills selected</span>
          )}
        </div>
        
        {/* Filtered Skills List */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Available Skills</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSkill.map((skill) => (
              <span
                key={skill._id}
                onClick={() => addSkill(skill.name)} 
                className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  formData.skills.includes(skill.name)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-100 text-gray-700 hover:bg-blue-200"
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Section */}
      <div>
        <h2 className="font-semibold text-lg pb-3">Your expected time period for the work to be done</h2>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Project Duration
        </label>
        <select
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 h-10 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1AA803]"
        >
          <option value="">Select duration</option>
          <option value="less-than-1-month">Less than 1 month</option>
          <option value="1-3-months">1-3 months</option>
          <option value="3-6-months">3-6 months</option>
          <option value="more-than-6-months">More than 6 months</option>
        </select>
      </div>
    </div>
  );
}
