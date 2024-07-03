import React, { useState } from 'react'
import api from '../API/api';
import APIS from '../API/endPoints';
interface InterMiami {
    id: number;
    title: string;
    content: string;
    CreationDate: string;
    owner: {
      username: string; 
    };
  }
const InterFaces = () => {


    const [users, setUsers] = useState<InterMiami[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleInterface = async () => {
        const sub = localStorage.getItem('sub');

        const token = localStorage.getItem('token');

        if (!token) {
          setError('No token found');
          return;
        }
    
        try {
            console.log(sub);
            const url = `${APIS.GET_ALL_INTERFACES}/${sub}`;
            const response1 = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
              if (response1.status === 200) {
            setUsers(response1.data);
            console.log(response1.data);
          } else {
            setError('Failed to fetch users');
          }
        } catch (error) {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        }
    };
      const handleShowInterfaces = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            setError('No token found');
            return;
        }
    
        try {
            const response = await api.get(APIS.GET_ALL_INTERFACES, {
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
        <div className='flex gap-9'>
            <button onClick={handleInterface}className="bg-transparent hover:bg-blue-500 text-custom-gray font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

            >
            Show
            </button>
            <button onClick={handleShowInterfaces} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Show All
            </button>
        </div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Title</th>
              <th className="py-2 px-4 border-b border-gray-200">CreationDate</th>
              <th className="py-2 px-4 border-b border-gray-200">Content</th>
              <th className="py-2 px-4 border-b border-gray-200">Owner</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.CreationDate}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.content}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.owner.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InterFaces
