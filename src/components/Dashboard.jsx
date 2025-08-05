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
        return 'bg-blue-100 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200';
      case 'validation':
        return 'bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200';
      case 'research':
        return 'bg-green-100 dark:bg-green-900/80 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-100">Drug Discovery Dashboard</h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">Welcome to the Drug Discovery Application. Here's an overview of our current progress and upcoming tasks.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Statistics */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Project Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 text-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <span className="block text-3xl font-bold text-blue-600 dark:text-blue-400">{projectStats.activeProjects}</span>
              <span className="text-sm text-blue-700 dark:text-blue-300">Active Projects</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <span className="block text-3xl font-bold text-green-600 dark:text-green-400">{projectStats.completedProjects}</span>
              <span className="text-sm text-green-700 dark:text-green-300">Completed</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
              <span className="block text-3xl font-bold text-yellow-600 dark:text-yellow-400">{projectStats.pendingReview}</span>
              <span className="text-sm text-yellow-700 dark:text-yellow-300">Pending Review</span>
            </div>
          </div>
        </section>

        {/* Recent Discoveries */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Discoveries</h2>
          <ul className="space-y-3">
            {recentDiscoveries.map(discovery => (
              <li key={discovery.id} className="flex flex-col p-3 rounded-md bg-gray-50 dark:bg-gray-700 sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <strong className="font-medium text-gray-800 dark:text-gray-200">{discovery.name}</strong>
                  <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">{discovery.date}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(discovery.status)}`}>
                  {discovery.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming Tasks */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Upcoming Tasks</h2>
          <ul className="space-y-3">
            {upcomingTasks.map(task => (
              <li key={task.id} className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30 rounded-r-md">
                <p className="text-gray-800 dark:text-gray-200">{task.task}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Due: {task.deadline}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Advanced Analytics Tools */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Advanced Analytics & ML Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="/ml-analytics"
              className="p-4 border rounded-lg hover:border-blue-500 transition-colors bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">ML</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">ML Analytics</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced machine learning insights, pattern recognition, and predictive analytics
              </p>
            </a>

            <a 
              href="/qsar-modeling"
              className="p-4 border rounded-lg hover:border-indigo-500 transition-colors bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">QS</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">QSAR Modeling</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build quantitative structure-activity relationship models with ML
              </p>
            </a>

            <a 
              href="/molecular-visualization"
              className="p-4 border rounded-lg hover:border-green-500 transition-colors bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">3D</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Molecular Visualization</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interactive SMILES input and RDKit-powered molecular rendering
              </p>
            </a>

            <a 
              href="/batch-prediction"
              className="p-4 border rounded-lg hover:border-purple-500 transition-colors bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-700"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Batch Processing</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                High-throughput batch prediction for multiple compounds simultaneously
              </p>
            </a>

            <a 
              href="/workflow-builder"
              className="p-4 border rounded-lg hover:border-orange-500 transition-colors bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-700"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">🔧</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Workflow Builder</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual pipeline creation for chaining multiple prediction steps
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
