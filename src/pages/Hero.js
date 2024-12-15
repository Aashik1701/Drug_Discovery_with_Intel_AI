import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css'; // Make sure to import the CSS file

const Hero = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actions = [
    "predict protein stability",
    "analyze protein stability",
    "evaluate drug interactions",
    "simulate molecular dynamics",
  ];

  const [currentAction, setCurrentAction] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animateText = useCallback(() => {
    const currentWord = actions[currentIndex];
    if (!isDeleting && currentChar < currentWord.length) {
      setCurrentAction(prev => prev + currentWord[currentChar]);
      setCurrentChar(prev => prev + 1);
    } else if (isDeleting && currentChar > 0) {
      setCurrentAction(prev => prev.slice(0, -1));
      setCurrentChar(prev => prev - 1);
    } else if (currentChar === currentWord.length) {
      setIsDeleting(true);
    } else if (isDeleting && currentChar === 0) {
      setIsDeleting(false);
      setCurrentIndex(prev => (prev + 1) % actions.length);
    }
  }, [actions, currentIndex, currentChar, isDeleting]);

  useEffect(() => {
    const typingInterval = setInterval(animateText, isDeleting ? 50 : 150);
    return () => clearInterval(typingInterval);
  }, [animateText, isDeleting]);

  return (
    <div className="hero">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src="https://res.cloudinary.com/dvude7m7p/video/upload/v1728069187/DrugForge/xgvwhrhiangak73qurm5.mp4" type="video/mp4" />
      </video>
      <h1 className="hero-title sora">
        Zero Code, Bioinformatics
      </h1>
      <p className="hero-subtitle">
        With DrugForge you can <span className="typewriter">{currentAction}</span>
      </p>
      <div className="hero-buttons">
        <button className="hero-cta">Try Free</button>
        <button className="hero-cta secondary">View Services</button>
      </div>
    </div>
  );
};

export default Hero;