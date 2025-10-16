import React from 'react';
import { useDrop } from 'react-dnd';
import Book from './Book';

const BookShelf = ({ title, books, onUpdateBookShelf }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BOOK',
    drop: (item) => {
      const shelfMap = {
        'Currently Reading': 'currentlyReading',
        'Want to Read': 'wantToRead',
        'Read': 'read'
      };
      const shelf = shelfMap[title] || title.toLowerCase().replace(/\s+/g, '');
      onUpdateBookShelf(item.book, shelf);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [title, onUpdateBookShelf]);

  return (
    <div className="bookshelf" ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book book={book} shelf={book.shelf} onUpdateBookShelf={onUpdateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;