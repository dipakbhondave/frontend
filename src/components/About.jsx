import React from 'react';
import { motion } from 'framer-motion';
import './About.css'; // Import the CSS file
import aboutImg from '../assets/about.jpg'; // Add your large image
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; // Import social media icons

export default function About() {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="about-content"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h5 className="sub-title">
            HELLO MY NAME IS <span className="name-highlight">Dipak Bhondave</span>
          </h5>
        <motion.h1 whileHover={{ scale: 1.05 }}>About Our Recipe Website</motion.h1>
        <p>
          Welcome to our Food Recipe Blog! Here, you can find delicious and 
          easy-to-make recipes shared by our community. Whether you're a 
          professional chef or just getting started in the kitchen, 
          our platform is the perfect place to explore and share amazing recipes.
        </p>
        <p>
          Our goal is to make cooking enjoyable and accessible to everyone. 
          Join us in discovering new flavors and creating mouth-watering dishes!
        </p>

        {/* Social Media Links */}
        <motion.div 
          className="social-icons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
          >
            <FaInstagram className="icon instagram" />
          </motion.a>
          <motion.a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
          >
            <FaFacebook className="icon facebook" />
          </motion.a>
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
          >
            <FaTwitter className="icon twitter" />
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="about-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={aboutImg} alt="Delicious food" />
      </motion.div>
    </motion.div>
  );
}