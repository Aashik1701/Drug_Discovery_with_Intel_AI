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
    <div className="min-h-screen p-8 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="relative mx-auto max-w-7xl">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="fixed top-0 left-0 object-cover w-full h-full opacity-10 -z-10"
        >
          <source src="/Images/videos/blog-background.mp4" type="video/mp4" />
        </video>

        <motion.h1 
          className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DrugForge Research Blog
          <motion.span 
            className="block w-24 h-1 mx-auto mt-6 bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 gap-12 lg:grid-cols-3"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Main Content */}
          <motion.div className="space-y-8 lg:col-span-2" variants={fadeInUp}>
            <h2 className="mb-8 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Recent Posts</h2>
            <motion.div className="space-y-6">
              {/* Blog Posts */}
              {['The Future of Molecular Docking', 'Advances in Protein-Ligand Interactions', 'Quantum Computing in Chemistry'].map((title, index) => (
                <motion.div
                  key={index}
                  className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden 
                           hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 
                           transform hover:scale-[1.02] p-6"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="mb-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{title}</h3>
                  <p className="mb-3 text-sm text-blue-400">May 15, 2025</p>
                  <p className="mb-4 text-gray-300">Explore how artificial intelligence is revolutionizing molecular docking techniques...</p>
                  <motion.button 
                    className="block px-6 py-2 font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30"
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
              className="p-6 transition-all duration-500 group bg-gray-800/30 backdrop-blur-sm rounded-xl hover:shadow-xl hover:shadow-blue-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="mb-6 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {['Molecular Docking', 'AI', 'Chemistry', 'Research'].map((category, index) => (
                  <motion.button
                    key={index}
                    className="px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 rounded-lg bg-gray-800/50 hover:bg-gray-700 hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="p-6 transition-all duration-500 group bg-gray-800/30 backdrop-blur-sm rounded-xl hover:shadow-xl hover:shadow-blue-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="mb-6 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {['AI', 'ML', 'Quantum', 'Chemistry'].map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 text-xs text-blue-400 border rounded-full bg-blue-600/20 border-blue-500/30"
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