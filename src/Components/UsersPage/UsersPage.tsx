import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import APIS from '../../API/endPoints';

interface User {
  id: number;
  username: string;
  email: string;
  country: string;
  roles: string;
  interface: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);



    const handleShowUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
  
      try {
        const response = await api.get(APIS.GET_ALL_USERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
          console.log(response.data);
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

  return (
    <div className="container mx-auto p-4">
      <button onClick={handleShowUsers} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Show
        </button>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Username</th>
              <th className="py-2 px-4 border-b border-gray-200">Country</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Role</th>
              <th className="py-2 px-4 border-b border-gray-200">Interface</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.country}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.roles}</td>
                <button>
                  Click
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
