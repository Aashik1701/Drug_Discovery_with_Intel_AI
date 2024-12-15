import React from 'react';
import './Pricing.css';

const PricingCard = ({ title, price, features, buttonText, isPopular }) => (
  <div className={`pricing-card ${isPopular ? 'popular' : ''}`}>
    {isPopular && <span className="popular-tag">Most Popular</span>}
    <h2>{title}</h2>
    <p className="price">{price}</p>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <button className="choose-plan">{buttonText}</button>
  </div>
);

const Pricing = () => {
  const plans = [
    {
      title: "Freemium",
      price: "Free",
      features: [
        "Access to basic tools",
        "Limited predictions per month",
        "Community support",
        "Basic molecular docking capabilities"
      ],
      buttonText: "Get Started"
    },
    {
      title: "Premium",
      price: "$29/month",
      features: [
        "Everything in Freemium",
        "Unlimited predictions",
        "Advanced molecular docking",
        "Access to AlphaFold2 with custom templates",
        "Enhanced support"
      ],
      buttonText: "Choose Plan",
      isPopular: true
    },
    {
      title: "Pro",
      price: "$99/month",
      features: [
        "Everything in Premium",
        "Priority support",
        "Advanced analytics and reporting",
        "Customizable prediction settings powered by Intel OneAPI",
        "Additional recycling options for predictions"
      ],
      buttonText: "Choose Plan"
    }
  ];

  return (
    <div className="pricing">
      <video autoPlay loop muted playsInline>
        <source src="https://res.cloudinary.com/dvude7m7p/video/upload/v1728052594/DrugForge/vimqavy6yywwlkidfkek.mp4" type="video/mp4" />
      </video>
      <div className="pricing-content">
        <h1>Choose Your Perfect Plan</h1>
        <p>Unlock the full potential of molecular docking and drug discovery with our flexible pricing options.</p>

        <div className="pricing-container">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div className="contact-info">
          <h3>Need Help Choosing?</h3>
          <p>Our team is here to assist you in finding the perfect plan for your research needs.</p>
          <button className="contact-button">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;