import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {

  const actions = useMemo(() => [
    "predict protein stability",
    "analyze protein stability",
    "evaluate drug interactions",
    "simulate molecular dynamics",
  ], []);

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full opacity-50"
        >
          <source src="/Images/DNA.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-black" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="space-y-12 text-center">
          {/* Title with Animation */}
          <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Zero Code, Bioinformatics
            </span>
          </h1>

          {/* Typewriter Text */}
          <p className="mb-8 text-3xl font-bold text-white md:text-4xl">
            With DrugForge you can{' '}
            <span className="text-blue-400">{currentAction}</span>
            <span className="animate-blink">|</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-6 mt-12 sm:flex-row">
            <Link 
              to="/try-free"
              className="relative w-64 px-8 py-4 overflow-hidden font-bold text-white transition-all duration-300 shadow-lg group rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Try Free</span>
              <div className="absolute inset-0 w-full h-full transition-transform duration-300 transform translate-y-full bg-white/20 group-hover:translate-y-0" />
            </Link>

            <Link
              to="/services"
              className="relative w-64 px-8 py-4 overflow-hidden font-bold text-blue-400 transition-all duration-300 border-2 border-blue-500 group rounded-xl hover:scale-105 hover:shadow-blue-500/25"
            >
              <span className="relative z-10">View Services</span>
              <div className="absolute inset-0 w-full h-full transition-transform duration-300 transform translate-y-full bg-blue-500/10 group-hover:translate-y-0" />
            </Link>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 rounded-full animate-float-slow top-1/4 left-1/4 bg-blue-500/10 blur-3xl" />
          <div className="absolute w-64 h-64 rounded-full animate-float top-1/3 right-1/4 bg-purple-500/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Hero;