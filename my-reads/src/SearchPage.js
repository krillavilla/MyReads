import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from './BooksAPI';
import Book from './Book';
import './App.css';

const SearchPage = ({ books, onUpdateBookShelf }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const performSearch = useCallback(async (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      setIsSearching(true);
      try {
        const results = await search(trimmedQuery);
        if (results && results.error) {
          setSearchResults([]);
        } else if (Array.isArray(results)) {
          // Map search results with current shelf info
          const resultsWithShelf = results.map(book => {
            const existingBook = books.find(b => b.id === book.id);
            return {
              ...book,
              shelf: existingBook ? existingBook.shelf : 'none'
            };
          });
          setSearchResults(resultsWithShelf);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [books]);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        {query.trim() && (
          <div className="search-results-info">
            {isSearching ? (
              <p>Searching...</p>
            ) : searchResults.length > 0 ? (
              <p>{searchResults.length} book{searchResults.length !== 1 ? 's' : ''} found!</p>
            ) : query.trim() ? (
              <p>No books found for "{query.trim()}". Try a different search term.</p>
            ) : null}
          </div>
        )}
        <ol className="books-grid">
          {searchResults.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                shelf={book.shelf || 'none'}
                onUpdateBookShelf={onUpdateBookShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    shelf: PropTypes.string
  })).isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default SearchPage;
