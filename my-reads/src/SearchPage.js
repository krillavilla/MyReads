import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Book from './Book';
import './App.css';

const SearchPage = ({ books, onUpdateBookShelf }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    setQuery(query);

    if (query) {
      try {
        const results = await search(query);
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
      }
    } else {
      setSearchResults([]);
    }
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

export default SearchPage;