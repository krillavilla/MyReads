import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';
import BookDetail from './BookDetail';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const updatedBook = { ...book, shelf };
      setBooks(prevBooks => {
        const filteredBooks = prevBooks.filter(b => b.id !== book.id);
        // Only add to books if not 'none'
        return shelf === 'none' ? filteredBooks : [...filteredBooks, updatedBook];
      });
    }).catch(error => {
      console.error('Error updating book shelf:', error);
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/" element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <BookShelf
                    title="Currently Reading"
                    books={books.filter(book => book.shelf === 'currentlyReading')}
                    onUpdateBookShelf={updateBookShelf}
                  />
                  <BookShelf
                    title="Want to Read"
                    books={books.filter(book => book.shelf === 'wantToRead')}
                    onUpdateBookShelf={updateBookShelf}
                  />
                  <BookShelf
                    title="Read"
                    books={books.filter(book => book.shelf === 'read')}
                    onUpdateBookShelf={updateBookShelf}
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            } />
            <Route path="/search" element={<SearchPage books={books} onUpdateBookShelf={updateBookShelf} />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
};

export default App;