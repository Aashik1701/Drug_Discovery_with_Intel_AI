import React from 'react';

function Dashboard() {
  console.log("Rendering Dashboard");

  // Mock data for demonstration purposes
  const projectStats = {
    activeProjects: 12,
    completedProjects: 45,
    pendingReview: 7
  };

  const recentDiscoveries = [
    { id: 1, name: "Compound XYZ-123", date: "2024-09-15", status: "In Trials" },
    { id: 2, name: "Protein Target ABC", date: "2024-09-10", status: "Validation" },
    { id: 3, name: "Gene Therapy GTX-789", date: "2024-09-05", status: "Research" }
  ];

  const upcomingTasks = [
    { id: 1, task: "Review Compound XYZ-123 trial results", deadline: "2024-10-01" },
    { id: 2, task: "Submit research proposal for Gene Therapy GTX-789", deadline: "2024-10-05" },
    { id: 3, task: "Team meeting: Q4 project planning", deadline: "2024-10-10" }
  ];

  // Helper function to determine status badge colors
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'in trials':
        return 'bg-blue-100 text-blue-800';
      case 'validation':
        return 'bg-purple-100 text-purple-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Drug Discovery Dashboard</h1>
      <p className="mb-8 text-lg text-gray-600">Welcome to the Drug Discovery Application. Here's an overview of our current progress and upcoming tasks.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Statistics */}
        <section className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Project Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 text-center rounded-lg bg-blue-50">
              <span className="block text-3xl font-bold text-blue-600">{projectStats.activeProjects}</span>
              <span className="text-sm text-blue-700">Active Projects</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-green-50">
              <span className="block text-3xl font-bold text-green-600">{projectStats.completedProjects}</span>
              <span className="text-sm text-green-700">Completed</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-yellow-50">
              <span className="block text-3xl font-bold text-yellow-600">{projectStats.pendingReview}</span>
              <span className="text-sm text-yellow-700">Pending Review</span>
            </div>
          </div>
        </section>

        {/* Recent Discoveries */}
        <section className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent Discoveries</h2>
          <ul className="space-y-3">
            {recentDiscoveries.map(discovery => (
              <li key={discovery.id} className="flex flex-col p-3 rounded-md bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <strong className="font-medium text-gray-800">{discovery.name}</strong>
                  <span className="block mt-1 text-xs text-gray-500">{discovery.date}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(discovery.status)}`}>
                  {discovery.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming Tasks */}
        <section className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
          <ul className="space-y-3">
            {upcomingTasks.map(task => (
              <li key={task.id} className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-md">
                <p className="text-gray-800">{task.task}</p>
                <p className="mt-1 text-sm text-gray-500">Due: {task.deadline}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
