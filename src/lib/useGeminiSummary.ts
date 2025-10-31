'use client';
import { useState, useEffect } from 'react';

export const useGeminiSummary = (productDescription: string) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productDescription) {
      setSummary(null);
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/gemini/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productDescription }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (err) {
        setError('Failed to fetch summary');
        console.error('Error fetching Gemini summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [productDescription]);

  return { summary, loading, error };
};
