import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email, // ใช้ username field เก็บ email แทน
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem ('user',JSON.stringify(response.data.user));
        navigate('/work/JobApp');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e0d5]">
      <div className="bg-white rounded-[2rem] p-0 w-[500px] shadow-xl">
        <h1 className="text-4xl font-bold text-center py-6 text-black">Login</h1>
        
        <div className="w-full h-[1px] bg-gray-300"></div>
        
        <form onSubmit={handleLogin} className="p-12 space-y-8">
          {error && <p className="text-red-500 text-center">{error}</p>} {/* แสดง error */}

          <div className="space-y-3">
            <label className="block text-xl font-semibold text-black">
              Email
            </label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-white text-lg"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xl font-semibold text-black">
              Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-white text-lg"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
            type="submit"
            className="w-40 bg-[#0095ff] hover:bg-[#0077cc] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;