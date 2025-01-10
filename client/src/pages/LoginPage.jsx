import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/work/JobApp');      
    } else {
      alert('กรุณากรอกข้อมูลให้ครบ');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e0d5]">
      <div className="bg-white rounded-[2rem] p-0 w-[500px] shadow-xl">
        <h1 className="text-4xl font-bold text-center py-6 text-black">Login</h1>
        
        <div className="w-full h-[1px] bg-gray-300"></div>
        
        <form onSubmit={handleLogin} className="p-12 space-y-8">
          <div className="space-y-3">
            <label className="block text-xl font-semibold text-black">
              Username
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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