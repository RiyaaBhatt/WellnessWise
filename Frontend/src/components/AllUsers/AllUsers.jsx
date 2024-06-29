import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/all-user-data/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <table className="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Weight</th>
            <th className="border border-gray-300 px-4 py-2">Height</th>
            <th className="border border-gray-300 px-4 py-2">Dietary Preference</th>
            <th className="border border-gray-300 px-4 py-2">Allergies</th>
            <th className="border border-gray-300 px-4 py-2">Health Goals</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.username || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.role || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.age || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.gender || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.weight || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.height || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.dietaryPref || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.allergies || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.healthGoals || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.createdAt || " not available"}</td>
            <td className="border border-gray-300 px-4 py-2">{user.updatedAt || " not available"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
