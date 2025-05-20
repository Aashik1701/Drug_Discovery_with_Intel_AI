import React from 'react';

const PricingCard = ({ title, price, features, buttonText, isPopular }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 w-[300px] shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl flex flex-col ${isPopular ? 'relative border-2 border-blue-500 dark:border-blue-400' : ''}`}>
    {isPopular && (
      <span className="absolute -top-3 right-4 bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full">
        Most Popular
      </span>
    )}
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-5">{price}</p>
    <ul className="mb-6 text-left flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="py-2 text-gray-700 dark:text-gray-300 flex items-start">
          <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <button className="bg-blue-600 dark:bg-blue-700 text-white py-3 px-6 rounded-full font-bold uppercase tracking-wider hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-105">
      {buttonText}
    </button>
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
    <div className="relative min-h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover opacity-80 dark:opacity-60" autoPlay loop muted playsInline>
        <source src="/Images/videos/pricing-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30 dark:bg-black/60"></div>
      <div className="relative z-10 text-center text-white px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Unlock the full potential of molecular docking and drug discovery with our flexible pricing options.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mt-16 p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
          <p className="mb-6">Our team is here to assist you in finding the perfect plan for your research needs.</p>
          <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white py-2 px-6 rounded-full transition-all duration-300 hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;