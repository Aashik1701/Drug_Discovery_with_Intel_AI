import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-container">
      <video autoPlay loop muted playsInline className="blog-video">
        <source src="https://res.cloudinary.com/dvude7m7p/video/upload/v1727964474/DrugForge/xlcjr3hxvcayt2hktvbk.mp4" type="video/mp4" />
      </video>
      <h1 className="blog-title">DrugForge Research Blog</h1>
      <div className="blog-grid">
        <div className="blog-section">
          <h2 className="blog-section-title">Recent Posts</h2>
          <div className="blog-posts">
            <div className="blog-post">
              <h3 className="blog-post-title">The Future of Molecular Docking: AI-Driven Approaches</h3>
              <p className="blog-post-date">February 10, 2023</p>
              <p className="blog-post-text">Explore how artificial intelligence is revolutionizing molecular docking techniques, leading to more accurate predictions and faster drug discovery processes.</p>
              <button className="blog-post-button">Read More</button>
            </div>
            <div className="blog-post">
              <h3 className="blog-post-title">Advances in Protein-Ligand Interactions: A 2023 Overview</h3>
              <p className="blog-post-date">January 20, 2023</p>
              <p className="blog-post-text">Discover the latest breakthroughs in understanding protein-ligand interactions, including new computational methods and experimental techniques that are reshaping the field.</p>
              <button className="blog-post-button">Read More</button>
            </div>
            <div className="blog-post">
              <h3 className="blog-post-title">Quantum Computing in Computational Chemistry: A New Era</h3>
              <p className="blog-post-date">December 15, 2022</p>
              <p className="blog-post-text">Delve into the potential of quantum computing in solving complex computational chemistry problems, from molecular simulations to drug design.</p>
              <button className="blog-post-button">Read More</button>
            </div>
          </div>
        </div>
        <div className="blog-section">
          <h2 className="blog-section-title">Popular Posts</h2>
          <div className="blog-posts">
            <div className="blog-post">
              <h3 className="blog-post-title">The Role of Molecular Docking in Modern Drug Discovery</h3>
              <p className="blog-post-date">November 10, 2022</p>
              <p className="blog-post-text">An in-depth look at how molecular docking is accelerating the drug discovery process, reducing costs, and improving the success rate of new therapeutics.</p>
              <button className="blog-post-button">Read More</button>
            </div>
            <div className="blog-post">
              <h3 className="blog-post-title">Machine Learning in Computational Chemistry: Applications and Challenges</h3>
              <p className="blog-post-date">October 20, 2022</p>
              <p className="blog-post-text">Explore the current applications of machine learning in computational chemistry and the challenges researchers face in implementing these powerful tools.</p>
              <button className="blog-post-button">Read More</button>
            </div>
            <div className="blog-post">
              <h3 className="blog-post-title">Green Chemistry: Sustainable Approaches in Computational Drug Design</h3>
              <p className="blog-post-date">September 15, 2022</p>
              <p className="blog-post-text">Learn how computational methods are contributing to more sustainable and environmentally friendly approaches in drug design and chemical synthesis.</p>
              <button className="blog-post-button">Read More</button>
            </div>
          </div>
        </div>
        <div className="blog-section">
          <h2 className="blog-section-title">Categories</h2>
          <div className="blog-categories">
            <button className="blog-category-button">Molecular Docking</button>
            <button className="blog-category-button">Computational Chemistry</button>
            <button className="blog-category-button">Protein-Ligand Interactions</button>
            <button className="blog-category-button">Drug Discovery</button>
            <button className="blog-category-button">Machine Learning</button>
            <button className="blog-category-button">Quantum Computing</button>
          </div>
        </div>
        <div className="blog-section">
          <h2 className="blog-section-title">Tags</h2>
          <div className="blog-tags">
            <button className="blog-tag-button">AI</button>
            <button className="blog-tag-button">Machine Learning</button>
            <button className="blog-tag-button">Quantum Computing</button>
            <button className="blog-tag-button">Green Chemistry</button>
            <button className="blog-tag-button">Molecular Simulation</button>
            <button className="blog-tag-button">Drug Design</button>
            <button className="blog-tag-button">Sustainability</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;