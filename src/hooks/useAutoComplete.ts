import { useState, useCallback } from 'react';
import { SearchResult, UseAutocompleteParams } from '../types';

export function useAutocomplete({ apiUrl }: UseAutocompleteParams) {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currIndex, setCurrIndex] = useState<number>(-1);
  //https://openlibrary.org/search.json?q=lord&_spellcheck_count=0&limit=10&fields=key,cover_i,title,subtitle,author_name,name&mode=everything
  const fetchResults = useCallback(
    async (input: string) => {
      try {
        const response = await fetch(
            `${apiUrl}?q=${encodeURIComponent(
                input
            )}&_spellcheck_count=0&limit=10&fields=title&mode=everything`
        );

        if (!response.ok) {
            throw new Error('Oops, something wrong on our end!');
        }

        const data = await response.json();
        const results = data.docs?.map((item: any, idx: number) => ({
          id: idx,
          title: item.title,
        })) || [];

        setResults(results);
        setError(null);
      } catch (err) {
        setError('Error fetching suggestions. Please try again.');
        setResults([]);
      }
    },
    [apiUrl]
  );

  const resetResults = useCallback(() => {
    setResults([]);
    setCurrIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    results,
    error,
    currIndex,
    setCurrIndex,
    fetchResults,
    resetResults,
  };
};
