import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import defaultContent from '../data/defaultContent';
import { database, ref, set, onValue, isFirebaseConfigured } from '../firebase';

const ContentContext = createContext(null);

const deepClone = (value) => JSON.parse(JSON.stringify(value));

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (isFirebaseConfigured && database) {
      const contentRef = ref(database, 'siteContent');
      const unsubscribe = onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setContent(data);
        }
        setLoading(false);
      }, (error) => {
        console.warn('Firebase read error, using defaults:', error);
        setLoading(false);
      });
      return () => unsubscribe();
    }

    const apiBase = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || '';
    const buildUrl = (path) => `${apiBase.replace(/\/$/, '')}${path}`;

    const fetchContent = async () => {
      try {
        const url = buildUrl('/api/content');
        const response = await fetch(url);
        if (!response.ok) throw new Error('Unable to load content from backend');
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.warn('Using default content:', error.message);
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
      if (isFirebaseConfigured && database) {
        const contentRef = ref(database, 'siteContent');
        await set(contentRef, nextContent);
        setSaveError(null);
        return { success: true };
      }

      const apiBase = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || '';
      const buildUrl = (path) => `${apiBase.replace(/\/$/, '')}${path}`;
      const response = await fetch(buildUrl('/api/content'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextContent)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Unable to save content');
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
    () => ({ content, updateContent, resetContent, saveContent, loading, saveError, isFirebaseConfigured }),
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
