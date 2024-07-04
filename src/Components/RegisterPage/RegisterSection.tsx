import React, { useState } from 'react'
import api from '../../API/api';
import APIS from '../../API/endPoints';
import { useNavigate } from 'react-router-dom';

const RegisterSection = () => {
    const [username,setUsername]= useState('')
    const [email,setEmail]= useState('')
    const [country,setCountry]= useState('')
    const [roles, setRole] = useState('');
    const [password,setPassword]= useState('')
    const [data,setData]= useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      const form = {
        email: email,
        password: password,
        username: username,
        country: country,
        roles: "user"
      };
      try {
        await api.post(APIS.REGISTER, form).then((response) => {
          if (response.status === 201) { 
            setData(response.data);
            navigate('/LoginPage'); 
          } else {
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                onChange={(e)=>setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                Country
              </label>
              <input
              onChange={(e)=>setCountry(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
              onChange={(e)=>setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <button
              type='reset'
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default RegisterSection