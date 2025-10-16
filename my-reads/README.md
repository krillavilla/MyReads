# MyReads Project

This is a book tracking application built with React for the Udacity React Nanodegree. Users can search for books and categorize them into three shelves:

- **Currently Reading**
- **Want to Read**  
- **Read**

## Features

- Browse books organized in three categories
- Search for new books to add to your shelves
- Move books between shelves with an easy dropdown interface
- Drag and drop functionality for moving books
- State persistence - your book selections are saved between sessions
- Responsive design that works on desktop and mobile

## Prerequisites

- Node.js (version 16 or later recommended)
- npm (comes with Node.js)

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd my-reads
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## How to Use

### Main Page
- View your books organized in three shelves
- Use the dropdown menu on each book to move it to a different shelf
- Alternatively, drag and drop books between shelves
- Click the "+" button to search for new books

### Search Page
- Type in the search box to find books by title or author
- Books you've already added to shelves will show their current shelf in the dropdown
- Select a shelf for any book to add it to your collection
- Use the back arrow to return to the main page

## Technologies Used

- React 18
- React Router v6
- React DnD (for drag and drop)
- Firebase (for additional features)
- CSS3 for styling

## API Server

This project uses a backend server provided by Udacity. The server supports:
- `GET /books` - Get all books
- `PUT /books/:id` - Update a book's shelf
- `POST /search` - Search for books

## Project Structure

```
src/
  ├── App.js          # Main app component with routing
  ├── App.css         # App styles
  ├── Book.js         # Individual book component
  ├── BookShelf.js    # Bookshelf component
  ├── SearchPage.js   # Search page component
  ├── BookDetail.js   # Book details component
  ├── BooksAPI.js     # API utility functions
  ├── firebase.js     # Firebase configuration
  └── index.js        # App entry point
```

## Contributing

This is a project for the Udacity React Nanodegree. While pull requests are welcome, please note this is primarily an educational project.

## License

This project is licensed under the MIT License.
