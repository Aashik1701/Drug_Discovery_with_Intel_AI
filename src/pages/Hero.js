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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-50"
        >
          <source src="https://res.cloudinary.com/dvude7m7p/video/upload/v1728069187/DrugForge/xgvwhrhiangak73qurm5.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-black" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* Main Content */}
        <div className="text-center space-y-12">
          {/* Title with Animation */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Zero Code, Bioinformatics
            </span>
          </h1>

          {/* Typewriter Text */}
          <p className="text-3xl md:text-4xl font-bold text-white mb-8">
            With DrugForge you can{' '}
            <span className="text-blue-400">{currentAction}</span>
            <span className="animate-blink">|</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Link 
              to="/try-free"
              className="group relative px-8 py-4 w-64 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Try Free</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full transform transition-transform duration-300 group-hover:translate-y-0" />
            </Link>

            <Link
              to="/services"
              className="group relative px-8 py-4 w-64 overflow-hidden rounded-xl border-2 border-blue-500 text-blue-400 font-bold transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
            >
              <span className="relative z-10">View Services</span>
              <div className="absolute inset-0 h-full w-full bg-blue-500/10 translate-y-full transform transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float-slow absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="animate-float absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Hero;