import React from 'react';
import { useParams } from 'react-router-dom';
import { get } from './BooksAPI';
import './App.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    get(id).then(setBook);
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <div className="book-authors">{book.authors?.join(', ')}</div>
      <div className="book-description">{book.description}</div>
      <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks?.thumbnail})` }}></div>
    </div>
  );
};

export default BookDetail;