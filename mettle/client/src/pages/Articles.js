import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('/api/articles').then(res => setArticles(res.data));
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {articles.map(article => (
        <Grid item xs={12} sm={6} key={article._id}>
          <Card>
            <CardContent>
              <Typography variant="h6" component={Link} to={`/articles/${article._id}`} style={{ textDecoration: 'none' }}>
                {article.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                by {article.author} • {new Date(article.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" mt={1}>
                {article.body ? `${article.body.substring(0, 250)}...` : 'No preview available'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;
