import React, { useState } from 'react';
import axios from 'axios';

const SubmitArticle = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    anonymous: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/articles', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Article submitted!');
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit an Article</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="content" placeholder="Your story..." onChange={handleChange} required />
      <label>
        <input
          type="checkbox"
          name="anonymous"
          checked={form.anonymous}
          onChange={handleChange}
        />
        Submit anonymously
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitArticle;
