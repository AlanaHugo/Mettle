import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`/api/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>{article.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        by {article.author} • {new Date(article.createdAt).toLocaleDateString()}
      </Typography>
      
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {article.body}
      </Typography>
    </Box>
  );
};

export default ArticleDetail;
