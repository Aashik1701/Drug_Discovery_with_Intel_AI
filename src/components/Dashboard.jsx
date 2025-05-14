import React from 'react';
import './Dashboard.css';

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

  return (
    <div className="dashboard">
      <h1>Drug Discovery Dashboard</h1>
      <p className="welcome-message">Welcome to the Drug Discovery Application. Here's an overview of our current progress and upcoming tasks.</p>

      <div className="dashboard-grid">
        <section className="project-stats">
          <h2>Project Statistics</h2>
          <div className="stat-container">
            <div className="stat-item">
              <span className="stat-value">{projectStats.activeProjects}</span>
              <span className="stat-label">Active Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{projectStats.completedProjects}</span>
              <span className="stat-label">Completed Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{projectStats.pendingReview}</span>
              <span className="stat-label">Pending Review</span>
            </div>
          </div>
        </section>

        <section className="recent-discoveries">
          <h2>Recent Discoveries</h2>
          <ul>
            {recentDiscoveries.map(discovery => (
              <li key={discovery.id}>
                <strong>{discovery.name}</strong>
                <span className="discovery-date">{discovery.date}</span>
                <span className={`discovery-status status-${discovery.status.toLowerCase().replace(' ', '-')}`}>
                  {discovery.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="upcoming-tasks">
          <h2>Upcoming Tasks</h2>
          <ul>
            {upcomingTasks.map(task => (
              <li key={task.id}>
                <span className="task-description">{task.task}</span>
                <span className="task-deadline">Due: {task.deadline}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;