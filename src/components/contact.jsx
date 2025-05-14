// Contact.js
import React from 'react';
import './contact.css';
const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-subtitle">We'd love to hear from you!</p>
      <div className="contact-form">
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name:</label>
            <input type="text" id="name" className="form-input" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-input" placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Message:</label>
            <textarea id="message" className="form-textarea" placeholder="Your Message" />
          </div>
          <button type="submit" className="form-button">Send Message</button>
        </form>
      </div>
      <div className="contact-info">
        <h2 className="contact-info-title">Contact Information</h2>
        <p className="contact-info-text">Phone: 123-456-7890</p>
        <p className="contact-info-text">Email: [info@example.com](mailto:info@example.com)</p>
        <p className="contact-info-text">Address: 123 Main St, Anytown, USA</p>
      </div>
    </div>
  );
};

export default Contact;