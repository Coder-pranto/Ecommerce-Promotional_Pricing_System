/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login',
        { email, password, });

      const data = response.data;

      if (response.status === 200) {

        Cookies.set('token', data.data.token, { expires: 7, sameSite: 'None', secure: true });

        const userData = {
          name: data.data.name,
          role: data.data.role,
        };
        const dataString = JSON.stringify(userData);
        localStorage.setItem('user', dataString);
        navigate('admin');
        toast.success("Login Successfully");

      } else {
        toast.error("Login Failed!!!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error("Login Failed!!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <>

      <div className="flex justify-center items-center h-screen bg-[#dfd6d4]">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <fieldset className="mb-6">
            <legend className="text-xl font-semibold mb-4">Admin Login</legend>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue-500"
            >
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default Login;


