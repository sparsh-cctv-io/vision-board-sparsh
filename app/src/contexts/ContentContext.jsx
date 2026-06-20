import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import defaultContent from '../data/defaultContent';

const ContentContext = createContext(null);

const deepClone = (value) => JSON.parse(JSON.stringify(value));

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const apiBase = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || '';
    const buildUrl = (path) => `${apiBase.replace(/\/$/, '')}${path}`;

    const fetchContent = async () => {
      try {
        const url = buildUrl('/api/content');
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Unable to load content from backend');
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.warn('Failed to load backend content, using defaults:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = (path, value) => {
    setContent((prev) => {
      const next = deepClone(prev);
      let node = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        node = node[path[i]];
      }
      node[path[path.length - 1]] = value;
      return next;
    });
  };

  const saveContent = async (nextContent) => {
    try {
      const apiBase = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || '';
      const buildUrl = (path) => `${apiBase.replace(/\/$/, '')}${path}`;
      const response = await fetch(buildUrl('/api/content'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nextContent)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Unable to save content';
        throw new Error(errorMessage);
      }

      setContent(nextContent);
      setSaveError(null);
      return { success: true };
    } catch (error) {
      console.error('Save content error:', error);
      const message = error?.message || 'Unable to save content';
      setSaveError(message);
      return { success: false, error: message };
    }
  };

  const resetContent = async () => {
    setContent(defaultContent);
    setSaveError(null);
    await saveContent(defaultContent);
  };

  const value = useMemo(
    () => ({ content, updateContent, resetContent, saveContent, loading, saveError }),
    [content, loading, saveError]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
