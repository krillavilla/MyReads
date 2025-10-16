import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

const Book = ({ book, shelf, onUpdateBookShelf }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOOK',
    item: { book },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChange = (e) => {
    const newShelf = e.target.value;
    onUpdateBookShelf(book, newShelf);
  };

  return (
    <div className="book" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks?.thumbnail 
              ? `url(${book.imageLinks.thumbnail})`
              : 'linear-gradient(135deg, #ddd 0%, #bbb 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center'
          }}
        >
          {!book.imageLinks?.thumbnail && 'No Cover'}
        </div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }).isRequired,
  shelf: PropTypes.string.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default Book;
