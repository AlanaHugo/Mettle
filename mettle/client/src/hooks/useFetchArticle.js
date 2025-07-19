// Custom hook to fetch article ID

import { useEffect, useState } from 'react';
import { fetchArticleById } from '../controllers/Articles/fetchArticlesController.js';

export default function useFetchArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchArticleById(id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load article');
        setLoading(false);
      });
  }, [id]);

  return { article, loading, error };
}
