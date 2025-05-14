import React from 'react';
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Transform Your Bioinformatics Experience</h1>
        <p>Predict Protein Structures, Analyze Drug Interactions, and Test Solubility</p>
        <button className="cta-button">Get Started Now</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features Powered by Intel OneAPI</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>AlphaFold2 Integration</h3>
            <p>Predict protein structures accurately.</p>
          </div>
          <div className="feature-item">
            <h3>Molecular Docking</h3>
            <p>Analyze molecular interactions effectively.</p>
          </div>
          <div className="feature-item">
            <h3>Solubility Testing</h3>
            <p>Input SMILES strings for solubility predictions.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Sign up for a free account.</li>
          <li>Input your protein sequences or SMILES strings.</li>
          <li>Receive predictions and analyze results.</li>
        </ol>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>User Testimonials</h2>
        {/* Carousel or list of testimonials */}
        <p>"DrugForge has transformed my research!" - User A</p>
        <p>"The solubility predictions are incredibly accurate!" - User B</p>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action">
        <h2>Ready to Get Started?</h2>
        <button className="cta-button">Sign Up Now</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <nav>
          <a href="/services">Services</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact Us</a>
          <a href="/pricing">Pricing</a>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;