import React from 'react';
import './Profile.css';
import Dashboard from './Dashboard';

const ProfilePage = () => {
  // This would typically come from your authentication system or API
  const user = {
    name: "Mohammed Aashik F",
    email: "mohammedaashik.f@vitstudent.ac.in",
    role: "Senior Researcher",
    joinDate: "January 17, 2005"
  };
<Dashboard />
  return (
    
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>
          <h2>{user.name}</h2>
          <p className="profile-role">{user.role}</p>
        </div>
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Member since:</span>
            <span className="info-value">{user.joinDate}</span>
          </div>
        </div>
      </div>
      <div className="profile-sections">
        <section className="profile-section">
          <h3>Recent Activity</h3>
          <ul>
            <li>Completed project: Drug Interaction Study</li>
            <li>Updated research paper: Novel Antibiotics</li>
            <li>Joined team: Cancer Research Initiative</li>
          </ul>
        </section>
        <section className="profile-section">
          <h3>Upcoming Tasks</h3>
          <ul>
            <li>Review clinical trial results (Due: Oct 15, 2024)</li>
            <li>Prepare presentation for Drug Discovery Conference</li>
            <li>Meet with collaborators on Gene Therapy project</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;