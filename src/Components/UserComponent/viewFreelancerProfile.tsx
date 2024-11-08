import React, { useState } from 'react'
import { Mail, Phone, MapPin, Globe, Book, Briefcase, Award } from 'lucide-react';
import BlockChecker from '../../Services/userServices/blockChecker';

const viewFreelancerProfile =()=> {

    BlockChecker()

    const [activeTab, setActiveTab] = useState('overview');

    const mockUserInfo = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        verified: true,
        rating: 4.9,
        totalStudents: 234,
        totalHours: 856,
        badges: ["Top Rated", "Expert", "Quick Responder"],
        socialLinks: {
          github: "github.com/johndoe",
          linkedin: "linkedin.com/in/johndoe",
          twitter: "twitter.com/johndoe"
        }
      };
    
      const mockProfileData = {
        bio: "Passionate educator with 5+ years of experience in online tutoring. Specialized in mathematics and computer science. Committed to making complex concepts accessible to all students through innovative teaching methods.",
        tutorRole: "Senior Mathematics & Computer Science Tutor",
        education: "MSc in Computer Science, Stanford University",
        country: "United States",
        language: ["English", "Spanish"],
        experience: "5+ years of experience teaching mathematics and computer science to university students. Expertise in calculus, linear algebra, and discrete mathematics. Developed custom curriculum for over 200 students with a 95% success rate.",
        specializations: ["Mathematics", "Computer Science", "Data Structures", "Algorithms"],
        achievements: ["Best Tutor Award 2023", "500+ Student Success Stories", "Published Educational Content"]
      };
    
      const TabButton = ({ name, label, active }:any) => (
        <button
          onClick={() => setActiveTab(name)}
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
            active 
              ? 'bg-black text-white shadow-lg transform scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      );

  return (
    <>
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b p-4">
          <div className="flex space-x-4">
            <TabButton name="overview" label="Overview" active={activeTab === 'overview'} />
            <TabButton name="experience" label="Experience" active={activeTab === 'experience'} />
            <TabButton name="achievements" label="Achievements" active={activeTab === 'achievements'} />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About Me</h3>
                <p className="text-gray-600 leading-relaxed">{mockProfileData.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockProfileData.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{mockUserInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{mockUserInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{mockProfileData.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Professional Experience</h3>
                <p className="text-gray-600 leading-relaxed">{mockProfileData.experience}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{mockProfileData.education}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Awards & Recognition</h3>
                <div className="grid gap-4">
                  {mockProfileData.achievements.map((achievement, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default viewFreelancerProfile
