import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e0d5]">
      <div className="bg-white rounded-[2rem] p-0 w-[500px] shadow-xl">
        <h1 className="text-4xl font-bold text-center py-6 text-black">Login</h1>
        
        <div className="w-full h-[1px] bg-gray-300"></div>
        
        <div className="p-12 space-y-8">
          <div className="space-y-3">
            <label className="block text-xl font-semibold text-black">
              Username
            </label>
            <input 
              type="text" 
              className="w-full px-5 py-4 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-white text-lg"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xl font-semibold text-black">
              Password
            </label>
            <input 
              type="password" 
              className="w-full px-5 py-4 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-white text-lg"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button className="w-40 bg-[#0095ff] hover:bg-[#0077cc] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-lg">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;