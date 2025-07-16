import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const navigate = useNavigate();

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/auth/login', form, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    console.log('✅ Login success:', res.data);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    navigate('/'); //redirect to home 
  } catch (err) {
    console.error('❌ Login failed:', err);
    alert(err.response?.data?.message || 'Login error');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
