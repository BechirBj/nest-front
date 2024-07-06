import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3001', 

});
const Private_api = axios.create({
  baseURL: 'http://localhost:3001', 
});

Private_api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => Promise.reject(error)
);
Private_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/LoginPage';
    }
    if( error.response.status==403 ){
      toast.error("Access Denied")
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
)

export   {api , Private_api};