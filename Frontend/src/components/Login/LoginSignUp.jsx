import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Default role for signup
  });
  // const history = useHistory();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("result:",result);
        localStorage.setItem("username",formData.username)
        localStorage.setItem('role',formData.role)
        if (result.message == 'User registered successfully'){
          localStorage.setItem('logged',true);
          navigate('/')
        }
        else if(result.message == 'successfull'){
          localStorage.setItem('logged',true);
          navigate('/')
        }
        else if(result.status === 404){
          alert('Invalid credentials')
        }
        else{
          alert('operation failed')
        }
      } else {
        console.error('Form submission error:', result.message);
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-center rounded-l-lg transition-colors duration-300 ${
              isLogin ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-center rounded-r-lg transition-colors duration-300 ${
              !isLogin ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
            }`}
          >
            Signup
          </button>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="LoginSignUp"
        >
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <label htmlFor="username" className="block text-yellow-300">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-yellow-300 focus:outline-none focus:ring focus:border-yellow-300 shadow-md"
            />
          </motion.div>
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <label htmlFor="password" className="block text-yellow-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-yellow-300 focus:outline-none focus:ring focus:border-yellow-300 shadow-md"
            />
          </motion.div>
          {!isLogin && (
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <label htmlFor="role" className="block text-yellow-300">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-yellow-300 focus:outline-none focus:ring focus:border-yellow-300 shadow-md"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </motion.div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400 transition-colors shadow-lg"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginSignUp;
