import React from 'react';
import './Register.css';

const RegisterPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="allowEmails" name="allowEmails" />
            <label htmlFor="allowEmails">
              I want to receive inspiration and updates via email.
            </label>
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <p className="sign-in-link">
          Already have an account? <a href="a">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;