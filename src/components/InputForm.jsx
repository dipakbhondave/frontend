import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? 'user/signUp' : 'user/login'; // 🔹 Fix here
    let userData = isSignUp ? { username, email, password } : { email, password };
  
    await axios
      .post(`https://backendfoodblogapp.onrender.com/${endpoint}`, userData) // 🔹 Now correctly calls /user/signUp or /user/login
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('username', res.data.user.username || '');
        setIsOpen();
      })
      .catch((data) => setError(data.response?.data?.error || "An error occurred"));
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.form
        className="form"
        onSubmit={handleOnSubmit}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isSignUp && (
          <motion.div className="form-control">
            <label>Username</label>
            <motion.input
              type="text"
              className="input"
              onChange={(e) => setUsername(e.target.value)}
              required
              whileFocus={{ scale: 1.05, borderColor: '#ff5733' }}
            />
          </motion.div>
        )}

        <motion.div className="form-control">
          <label>Email</label>
          <motion.input
            type="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.05, borderColor: '#ff5733' }}
          />
        </motion.div>

        <motion.div className="form-control">
          <label>Password</label>
          <motion.input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.05, borderColor: '#ff5733' }}
          />
        </motion.div>

        <motion.button
          type="submit"
          style={{
            backgroundColor: '#504B38',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.1, backgroundColor: '#3c382b' }}
          whileTap={{ scale: 0.95 }}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </motion.button>

        <br />
        {error && (
          <motion.h6
            className="error"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            {error}
          </motion.h6>
        )}

        <br />

        <motion.p
          onClick={() => setIsSignUp((pre) => !pre)}
          whileHover={{ scale: 1.05, color: '#ff5733' }}
          style={{ cursor: 'pointer' }}
        >
          {isSignUp ? 'Already have an account?' : 'Create a new account'}
        </motion.p>
      </motion.form>
    </motion.div>
  );
}
