import React from 'react';
import Dashboard from './Dashboard';

const ProfilePage = () => {
  // This would typically come from your authentication system or API
  const user = {
    name: "Mohammed Aashik F",
    email: "mohammedaashik.f@vitstudent.ac.in",
    role: "Senior Researcher",
    joinDate: "January 17, 2005"
  };
  
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Dashboard />
      
      <h1 className="mb-6 text-3xl font-bold text-gray-800">User Profile</h1>
      
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-8 text-center bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-3xl font-bold text-blue-600 bg-white rounded-full">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="mt-1 text-blue-100">{user.role}</p>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center p-3 rounded-md bg-gray-50">
              <span className="mr-2 font-medium text-gray-500">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex items-center p-3 rounded-md bg-gray-50">
              <span className="mr-2 font-medium text-gray-500">Member since:</span>
              <span className="text-gray-800">{user.joinDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
        <section className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b border-gray-200">
            Recent Activity
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 mt-2 mr-2 bg-green-500 rounded-full"></div>
              <span>Completed project: Drug Interaction Study</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full"></div>
              <span>Updated research paper: Novel Antibiotics</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 mt-2 mr-2 bg-purple-500 rounded-full"></div>
              <span>Joined team: Cancer Research Initiative</span>
            </li>
          </ul>
        </section>
        
        <section className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b border-gray-200">
            Upcoming Tasks
          </h3>
          <ul className="space-y-3">
            <li className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-md">
              <p className="text-gray-800">Review clinical trial results</p>
              <p className="mt-1 text-sm text-gray-500">Due: Oct 15, 2024</p>
            </li>
            <li className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-md">
              <p className="text-gray-800">Prepare presentation for Drug Discovery Conference</p>
              <p className="mt-1 text-sm text-gray-500">Due: Oct 22, 2024</p>
            </li>
            <li className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
              <p className="text-gray-800">Meet with collaborators on Gene Therapy project</p>
              <p className="mt-1 text-sm text-gray-500">Due: Oct 30, 2024</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
