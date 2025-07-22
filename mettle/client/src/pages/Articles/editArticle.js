
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editArticles.css';
import { PrimaryButton } from '../../components/Buttons.js';


const EditArticle = () => {
  const { id } = useParams(); // Article ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: ''
  });

  const [error, setError] = useState('');

  // Fetch article data when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then(res => {
        const { title, body, tags } = res.data;
        setFormData({
          title,
          body,
          tags: tags.join(', ') // Convert tags array to comma-separated string
        });
      })
      .catch(err => {
        console.error('Failed to load article:', err);
        setError('Failed to fetch article. Please try again.');
      });
  }, [id]);

  // Handle input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the article
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/my-articles/${id}`,
        {
          title: formData.title,
          body: formData.body,
          tags: formData.tags.split(',').map(tag => tag.trim()) // Convert back to array
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      navigate('/my-articles'); // Redirect after successful update
    } catch (err) {
      console.error('Update failed:', err);
      setError('Update failed. Please check your input or login status.');
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="HdrSection">
          <h2>Edit Article</h2>
          <p>Update your existing article below.</p>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="formInputs">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Body
            <textarea
              name="body"
              className="submissionInput"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tags (comma separated)
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </label>
        </div>

        <PrimaryButton type="submit" className="submitBtn">
          Save Changes
        </PrimaryButton>
      </form>
    </div>
  );
};

export default EditArticle;
