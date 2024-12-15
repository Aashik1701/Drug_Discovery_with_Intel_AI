import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 md:p-10 font-sans relative">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="fixed top-0 left-0 w-full h-full object-cover opacity-10 -z-10"
        >
          <source src="https://res.cloudinary.com/dvude7m7p/video/upload/v1727964474/DrugForge/xlcjr3hxvcayt2hktvbk.mp4" type="video/mp4" />
        </video>

        <motion.h1 
          className="text-5xl font-bold text-gray-800 text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DrugForge Research Blog
          <motion.span 
            className="block w-24 h-1 bg-blue-600 mt-6 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Main Content */}
          <motion.div className="lg:col-span-2 space-y-8" variants={fadeInUp}>
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Recent Posts</h2>
            <motion.div className="space-y-6">
              {/* Blog Posts */}
              {['The Future of Molecular Docking', 'Advances in Protein-Ligand Interactions', 'Quantum Computing in Chemistry'].map((title, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                  <p className="text-sm text-blue-600 mb-3">February 10, 2023</p>
                  <p className="text-gray-600 mb-4">Explore how artificial intelligence is revolutionizing molecular docking techniques...</p>
                  <motion.button 
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More →
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {['Molecular Docking', 'AI', 'Chemistry', 'Research'].map((category, index) => (
                  <motion.button
                    key={index}
                    className="bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {['AI', 'ML', 'Quantum', 'Chemistry'].map((tag, index) => (
                  <motion.span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;