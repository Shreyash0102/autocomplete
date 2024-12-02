import React, { KeyboardEvent, useEffect } from 'react';
import { AutocompleteProps, SearchResult } from '../../types';
import { useAutocomplete } from '../../hooks/useAutoComplete';
import { useDebounce } from '../../hooks/useDebounce';
import { BOOKS_API_URL } from '../../constants';
import './autocomplete.css'

export default function Autocomplete ({
  placeholder = 'Search...',
  lang = 'en',
  dir = 'ltr',
}: AutocompleteProps) {
  const {
    query,
    setQuery,
    results,
    error,
    currIndex,
    setCurrIndex,
    fetchResults,
    resetResults,
  } = useAutocomplete({ apiUrl: BOOKS_API_URL });

  const debouncedQuery = useDebounce(query, 300);
  const autocompleteText =
    debouncedQuery.trim().length > 0 && results.length > 0 && results[0].title.toLowerCase().startsWith(debouncedQuery.toLowerCase())
      ? results[0].title?.toLowerCase()
      : "";
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      fetchResults(debouncedQuery.trim());
    } else {
      resetResults();
    }
  }, [debouncedQuery, fetchResults, resetResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value?.toLowerCase());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => { 
    if (e.key === 'ArrowDown') {
      setCurrIndex((prevIndex: number) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setCurrIndex((prevIndex: number) =>
        prevIndex > 0 ? prevIndex - 1 : results.length - 1
      );
    } else if (e.key === 'Enter' && currIndex >= 0) {
      setQuery(results[currIndex].title?.toLowerCase());
      resetResults();
    } else if (e.key === 'Escape') {
      resetResults();
    } else if (e.keyCode === 39) {
      if(results.length > 0) {
        setQuery(results?.[0]?.title?.toLowerCase());
        resetResults();
      }
    }
  };

  return (
    <div
      className="autocomplete-container"
      aria-label="Typeahead search"
      lang={lang}
      dir={dir}
    >
      <div className='autocomplete-search'>
        <input
          data-testid="visible-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="autocomplete-input"
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-expanded={results.length > 0}
        />
        <input
          data-testid="hidden-input"
          id="hidden-input"
          className="autocomplete-input"
          value={autocompleteText}
          type='text'
          readOnly
          aria-hidden="true"
          lang={lang}
          dir={dir}
        />
      </div>
      {error && <p className='autocomplete-error'>{error}</p>}
      {results.length > 0 && (
        <ul className='autocomplete-list'>
          {results.map((item: SearchResult, index: number) => (
            <li
              key={item.id}
              className={`autocomplete-item ${
                index === currIndex ? "selected" : ""
              }`}
              aria-selected={currIndex === index}
              onMouseDown={() => setQuery(item.title)}
              onMouseEnter={() => setCurrIndex(index)}
              onMouseLeave={() => setCurrIndex(-1)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};