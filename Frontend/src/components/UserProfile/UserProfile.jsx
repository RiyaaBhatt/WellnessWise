
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const userName=localStorage.getItem("username")

const UserProfile = ({ username }) => {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        weight: '',
        height: '',
        dietaryPref: '',
        allergies: '',
        healthGoals: '',
      });
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/user-data/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user:userName }), // Ensure userName is defined
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
      
            // Handle the response data here
            const data = await response.json();
            console.log('User data:', data);
            setFormData({
                username: userName,
                age: data.age || '',
                gender: data.gender || 'Male',
                weight: data.weight || '',
                height: data.height || '',
                dietaryPref: data.dietaryPref || '',
                allergies: data.allergies || '',
                healthGoals: data.healthGoals || '',
              });
      
            // You can set state or perform other actions with the fetched data here
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error state or display a message to the user
          }
        };
      
        fetchData();
      
        // Return a cleanup function (optional)
        return () => {
          console.log('Component will unmount');
        };
      }, []); // Empty dependency array means this runs only once, like componentDidMount
      
  

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(JSON.stringify(formData))
      const response = await fetch('http://localhost:5000/api/user-update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data)
      setResponseMessage(data.message);
    } catch (error) {
        console.log(error)
      setResponseMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center">{userName}'s Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            />
          </div>
          <div>
            <label htmlFor="dietaryPref" className="block text-sm font-medium">Dietary Preferences</label>
            <input
              type="text"
              id="dietaryPref"
              name="dietaryPref"
              value={formData.dietaryPref}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            />
          </div>
          <div>
            <label htmlFor="allergies" className="block text-sm font-medium">Allergies</label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            />
          </div>
          <div>
            <label htmlFor="healthGoals" className="block text-sm font-medium">Health Goals</label>
            <textarea
              id="healthGoals"
              name="healthGoals"
              value={formData.healthGoals}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-white focus:border-white focus:outline-none transition duration-200 ease-in-out transform focus:scale-105"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:ring-white focus:border-white transition duration-200 ease-in-out"
            >
              Submit
            </motion.button>
          </div>
        </form>
        {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
      </motion.div>
    </div>
  );
};

export default UserProfile;