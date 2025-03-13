import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(!token);
  
  // Safe JSON Parsing for user data
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
    localStorage.removeItem("user"); // Remove corrupted data
  }

  const [username, setUsername] = useState(user?.username || "");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsLogin(!token);
    if (user) {
      setUsername(user.username);
    }
  }, [token, user]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setIsLogin(true);
      setUsername("");
    } else {
      setIsOpen(true);
    }
  };

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle Theme Function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply Theme
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <motion.header 
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="logo"
          whileHover={{ scale: 1.1 }}
        >🍽️ Food Blog</motion.h2>

        <motion.ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>
          </li>
          <li><NavLink to="/about">About</NavLink></li> 
        </motion.ul>

        {/* Dark Mode Toggle Icon */}
        <motion.button 
          className="theme-toggle" 
          onClick={toggleTheme}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </motion.button>

        <motion.ul 
          className="login-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <li onClick={checkLogin}>
            <p className="login">
              {isLogin ? "Login" : `Logout (${user?.email || "Unknown"})`}
            </p>
          </li>
          {!isLogin && username && (
            <li>
              <p className="welcome">Welcome, {username}!</p>
            </li>
          )}
        </motion.ul>
      </motion.header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
}
