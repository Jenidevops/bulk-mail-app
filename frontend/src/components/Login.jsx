import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Try: admin / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-end px-20">
      <div className="w-full max-w-md">
        <div className="bg-white p-8">
        <h2 className="text-2xl font-normal mb-8 text-gray-800">
          Sign in
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin123"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition duration-200"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Default: <span className="text-blue-600 font-medium">admin / admin123</span>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
